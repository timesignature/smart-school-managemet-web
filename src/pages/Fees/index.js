import MainLayout from "../../Layout/MainLayout";
import useCurrentTerm from "../../hooks/useCurrentTerm";
import {useEffect, useState} from "react";
import useStudents from "../../hooks/useStudents";
import {useMutation, useQueryClient} from "react-query";
import http from "../../http";
import {success, warning} from "../../components/ToastComponent";
import DepositComponent from "../../components/DepositComponent";
import InvoiceLetterHeadComponent from "../../components/InvoiceLetterHeadComponent";

export default function Fees(){


    const {data:term,isLoading,isError}=useCurrentTerm()
    const {data:students}=useStudents()
    const [errors,setErrors]=useState({})
    const [deposit,setDeposit]=useState(0)
    const [student,setStudent]=useState(null)
    const onChangeStudent=(val)=>{
        setStudent(students[val.target.value])
    }


    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/fees',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            setErrors({})
            success('You have successfully billed a student, congrats!')
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
            warning()
        },
    })

    const submit=()=>{
        mutation.mutate({
            student:student?.id ?? '',
            term:term.id ?? '',
        })
    }

    const _processCalculation=(f,d)=>{
        let t=(+f)-(+d)
        return parseFloat(t.toString()).toFixed(2)
    }



    const Rendered=()=>{
        if(isLoading){
            return (
                <span className="block text-xs text-center">...Loading</span>
            )
        }

        if(isError){
            return (
                <span className="block text-xs text-center">Something Went wrong</span>
            )
        }

        return term ? (
            <div className='p-10 border border-gray-100 mt-10'>

                <InvoiceLetterHeadComponent/>


                <div className="mt-10 grid grid-cols-3 gap-5">
                    <div>
                        {
                            student ===null ? (
                                <div>
                                    <label>
                                        <span className="block text-xs text-teal-700 mb-3">Billed to</span>
                                        <select className={`inp ${errors.student ? 'border-red-600' : 'border-zinc-200'}`} onChange={onChangeStudent}>
                                            <option value="">Select</option>
                                            {
                                                students && students.map((s,i)=>(
                                                    <option key={i} value={i}>{s.name} {s.surname}</option>
                                                ))
                                            }

                                        </select>
                                    </label>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex mb-3 items-center justify-between">
                                        <span className="block text-xs text-teal-700">Billed To</span>
                                        <button className='focus:outline-none text-p-100' onClick={()=>setStudent(null)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className={`flex flex-col space-y-2 border p-3 rounded ${errors.student ? 'border-red-400' : 'border-zinc-200'}`}>
                                        <span className="block text-xs">{student.name} {student.surname}</span>
                                        <span className="block text-xs">{student.parent?.address}</span>
                                        <span className="block text-xs">{student.parent?.city}, {student.parent?.state} </span>
                                        <span className="block text-xs">{student.parent?.country} </span>
                                    </div>
                                </div>
                            )
                        }

                        <div>
                            {
                                errors.student && (
                                    <span className="block text-xs mt-3 text-red-600">
                                            {
                                                errors.student[0]
                                            }
                                        </span>
                                )
                            }
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>
                                <span className="block text-xs mb-3 text-teal-700">Date of Issue</span>
                                <input type={'date'} readOnly value={term?.start ?? ''} className={'input'}/>
                            </label>
                        </div>

                        <div className="mt-5">
                            <label>
                                <span className="block text-xs mb-3 text-teal-700">Due Date</span>
                                <input type={'date'} readOnly value={term?.end ?? ''}  className={'input'}/>
                            </label>
                        </div>
                    </div>

                    <div>
                            <span className="block text-xs text-p-100 mb-3">
                                Amount Due (USD)
                            </span>
                        <span className="block text-5xl tracking-wider font-medium">
                                ${term?.amount ?? 0}
                            </span>
                    </div>
                </div>


                <div className="mt-10 border-t-2 border-p-100">

                    <table className="w-full">
                        <thead>
                        <tr>
                            <th width={'55%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Description</th>
                            <th width={'15%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Rate</th>
                            <th width={'15%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Qty</th>
                            <th width={'15%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Line Qty</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            term && (
                                <tr className={`${errors.term ? 'bg-red-50' : ''}`}>
                                    <td className="border-b border-gray-200 text-xs font-light py-5">Tuition Fee</td>
                                    <td className="border-b border-gray-200 text-xs font-light py-5">${term?.amount ?? 0}</td>
                                    <td className="border-b border-gray-200 text-xs font-light py-5">1</td>
                                    <td className="border-b border-gray-200 text-xs font-light py-5">${term?.amount ?? 0}</td>
                                </tr>
                            )
                        }
                        <tr>
                            {
                                errors.term && (
                                    <td colSpan={3} className={'text-xs text-red-600'}>
                                        {
                                            errors.term[0]
                                        }
                                    </td>
                                )
                            }
                        </tr>
                        </tbody>
                        <tbody className=''>
                        <tr className='mt-20'>
                            <td></td>
                            <td colSpan={2} className='text-xs font-medium py-6'>Sub Total</td>
                            <td className='text-xs font-medium py-6'>${term?.amount ?? 0}</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td colSpan={2} className='text-xs font-medium py-6'>Tax</td>
                            <td className='text-xs font-medium py-6'>$0.00</td>
                        </tr>


                        <tr>
                            <td></td>
                            <td colSpan={2} className='text-xs font-medium py-6 border-t border-gray-300'>Total</td>
                            <td className='text-xs font-medium py-6 border-t border-gray-300'>${term?.amount ?? 0}</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td colSpan={2} className='text-xs font-medium text-teal-600 py-6'>
                                <DepositComponent setDeposit={setDeposit}/>
                            </td>
                            <td className='text-xs font-medium py-6'>${deposit}</td>
                        </tr>

                        <tr>
                            <td></td>
                            <td colSpan={2} className='text-xs text-teal-700 font-medium py-6 border-t border-gray-300'>Amount Due (USD)</td>
                            <td className='text-xs text-teal-700 font-medium py-6 border-t border-gray-300'>${_processCalculation(term?.amount ?? 0,deposit)}</td>
                        </tr>


                        </tbody>
                    </table>

                </div>
            </div>
        ) : (
            <div></div>
        )
    }






    return (
        <MainLayout>
            <div className="p-20">
                <div className="flex items-center justify-between">
                    <div className="spa block text-4xl font-light">Fees Payment</div>
                    <button onClick={submit} className="btn bg-p-100 text-white">
                        {
                            mutation.isLoading ? '...Processing Payment' : 'Process Payment'
                        }
                    </button>
                </div>
                <Rendered/>
            </div>
        </MainLayout>
    )
}
