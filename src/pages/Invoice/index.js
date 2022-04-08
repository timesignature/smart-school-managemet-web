import MainLayout from "../../Layout/MainLayout";
import DepositComponent from "../../components/DepositComponent";
import {useParams} from "react-router-dom";
import useFee from "../../hooks/useFee";
import usePayments from "../../hooks/usePayments";
import useStudent from "../../hooks/useStudent";
import moment from "moment";
import InvoiceLetterHeadComponent from "../../components/InvoiceLetterHeadComponent";

export default function Invoice(){




    const {f_id,s_id}=useParams()

    const {data:fee}=useFee(f_id)
    const {data:student}=useStudent(s_id)
    const {data:payments,isLoading,isError}=usePayments(f_id)

    const _amountDue=(total,deposit)=>{
        let t=(+total)-(+deposit)
        return parseFloat(t.toString()).toFixed(2)
    }


    const Rendered=()=>{
        if(isLoading){
            return (
                <div className='mt-10'>
                    <span className="block text-xs text-center">...Loading</span>
                </div>
            )
        }

        if(isError){
            return (
                <div className='mt-10'>
                    <span className="block text-xs text-center">Something went wrong</span>
                </div>
            )
        }


        return payments && (

            <div>
                {
                    fee && (
                        <div>
                            <div className='p-10 border border-gray-100 mt-10'>
                                <InvoiceLetterHeadComponent/>
                                <div className="mt-10 grid grid-cols-3 gap-5">
                                    <div>
                                        <div>
                                            <div className="flex mb-3 items-center justify-between">
                                                <span className="block text-xs text-teal-700">Billed To</span>
                                            </div>
                                            {
                                                student && (
                                                    <div className={`flex flex-col space-y-2 border border-gray-100 p-3 rounded`}>
                                                        <span className="block text-xs">{student.name} {student.surname}</span>
                                                        <span className="block text-xs">{student.parent?.address}</span>
                                                        <span className="block text-xs">{student.parent?.city}, {student.parent?.state} </span>
                                                        <span className="block text-xs">{student.parent?.country}</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <label>
                                                <span className="block text-xs mb-3 text-teal-700">Date of Issue</span>
                                                <input type={'date'} readOnly value={fee.term?.start}  className={'inp border-gray-100'}/>
                                            </label>
                                        </div>

                                        <div className="mt-5">
                                            <label>
                                                <span className="block text-xs mb-3 text-teal-700">Due Date</span>
                                                <input type={'date'} readOnly value={fee.term?.end}  className={'inp border-gray-100'}/>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="block text-xs text-p-100 mb-3">
                                            Amount Due (USD)
                                        </span>
                                        <span className="block text-5xl tracking-wider font-medium">
                                            ${_amountDue(fee.term?.amount,fee.deposits)}
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


                                        <tr >
                                            <td className="border-b border-gray-200 text-xs font-light py-5">{fee.term?.description}</td>
                                            <td className="border-b border-gray-200 text-xs font-light py-5">${fee.term?.amount}</td>
                                            <td className="border-b border-gray-200 text-xs font-light py-5">1</td>
                                            <td className="border-b border-gray-200 text-xs font-light py-5">${fee.term?.amount}</td>
                                        </tr>

                                        </tbody>
                                        <tbody className=''>
                                        <tr className='mt-20'>
                                            <td></td>
                                            <td colSpan={2} className='text-xs font-medium py-6'>Sub Total</td>
                                            <td className='text-xs font-medium py-6'>${fee.term?.amount}</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td colSpan={2} className='text-xs font-medium py-6'>Tax</td>
                                            <td className='text-xs font-medium py-6'>$0.00</td>
                                        </tr>


                                        <tr>
                                            <td></td>
                                            <td colSpan={2} className='text-xs font-medium py-6 border-t border-gray-300'>Total</td>
                                            <td className='text-xs font-medium py-6 border-t border-gray-300'>${fee.term?.amount}</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td colSpan={2} className='text-xs font-medium text-teal-600 py-6'>
                                                <DepositComponent fee={f_id} student={s_id} isDeposit={false} setDeposit={()=>{}}/>
                                            </td>
                                            <td className='text-xs font-medium py-6'>(${parseFloat(fee.deposits).toFixed(2)})</td>
                                        </tr>

                                        <tr>
                                            <td></td>
                                            <td colSpan={2} className='text-xs text-teal-700 font-medium py-6 border-t border-gray-300'>Amount Due (USD)</td>
                                            <td className='text-xs text-teal-700 font-medium py-6 border-t border-gray-300'>${_amountDue(fee.term?.amount,fee.deposits)}</td>
                                        </tr>


                                        </tbody>
                                    </table>

                                </div>
                            </div>

                            <div className="mt-10">
                                <span className="block text-3xl font-light text-p-100">All Payments</span>
                                <table className='w-full mt-10'>
                                    <thead>
                                        <tr>
                                            <th width={'20%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Date</th>
                                            <th width={'60%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Type</th>
                                            <th width={'20%'} className='text-xs text-teal-800 text-left py-5 font-medium'>Line Qty</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        payments.map((p,i)=>(
                                            <tr key={i}>
                                                <td className='text-xs text-light py-5'>{moment(p.created_at).format('DD/MM/YYYY')}</td>
                                                <td className='text-xs text-light py-5'>{p.description}</td>
                                                <td className='text-xs text-light py-5'>${p.amount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>

        )
    }









    return (
        <MainLayout>
            <div className="p-20">
                <div className="flex items-center justify-between">
                    <div className="spa block text-4xl font-light">Invoice</div>
                </div>
                <Rendered/>
            </div>
        </MainLayout>
    )
}
