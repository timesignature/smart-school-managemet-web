import useTerms from "../hooks/useTerms";
import moment from "moment";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import {useParams} from "react-router-dom/cjs/react-router-dom";

export default function RegistrationComponent(){

    const {id}=useParams()

    const [open,setOpen]=useState(false)
    const [state,setState]=useState({})
    const {data:terms}=useTerms()
    const [errors,setErrors]=useState({})


    const onChange=(e)=>{
        setState(terms[e.target.value])
    }

    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/fees',values).then(res=>res.data),{
       onSuccess:async(data)=>{
           success('You have successfully registered your student, Congrats!')
           await queryClient.invalidateQueries(['fees','student',id])
       },
        onError:(e)=>{
           warning()
           setErrors(e.response.data.errors || {})
        }
    })


    const _save=()=>{
        mutation.mutate({
            term:state.id,
            student:id
        })
    }


    return (
        <div>
            <div className='flex items-center justify-between'>
                <span className="block text-3xl font-light text-p-100">
                    Registration
                </span>

                <button onClick={()=>setOpen(!open)} className='text-p-100 focus:outline-none'>
                    {
                        open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        )
                    }

                </button>
            </div>
            {
                open && (
                    <div>
                        <div className="mt-10 grid grid-cols-3 gap-10">
                            <div>
                                <label>
                        <span className="block text-xs mb-3">
                            Select Term
                        </span>
                                    <select onChange={onChange} className={`inp ${errors.term ? 'border-red-600' : 'border-zinc-200'}`}>
                                        <option value="">Select</option>
                                        {
                                            terms && terms.map((t,i)=>(
                                                <option key={i} value={i}>{t.description}  -  {moment(t.from).format('MMM Do YYYY')} &bull; {moment(t.to).format('MMM Do YYYY')}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        errors.term && (
                                            <span className="block text-xs text-red-600 mt-3">{errors.term[0]}</span>
                                        )
                                    }
                                </label>

                            </div>


                            <div>
                    <span className="block text-xs mb-3">
                        Start At
                    </span>
                                <input
                                    type="date"
                                    readOnly
                                    value={state.from ?? ''}
                                    className="input"
                                />
                            </div>

                            <div>
                    <span className="block text-xs mb-3">
                        End At
                    </span>
                                <input
                                    type="date"
                                    readOnly
                                    value={state.to ?? ''}
                                    className="input"
                                />
                            </div>


                            <div>
                    <span className="block text-xs mb-3">
                        Fees Amount
                    </span>
                                <input
                                    type="text"
                                    readOnly
                                    value={state.amount ?? ''}
                                    className="input"
                                />
                            </div>

                        </div>
                        <div className="mt-10">
                            <button onClick={_save} className="btn bg-p-100 text-white">
                                {
                                    mutation.isLoading ? 'Saving new entry' : 'Save new entry'
                                }
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
