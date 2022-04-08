import {Link, useParams} from "react-router-dom";
import useStudentFees from "../hooks/useStudentFees";
import moment from "moment";

export default function FeeComponent() {


    const {id}=useParams()
    const {data:fees,isLoading,isError}=useStudentFees(id)


    const _calculateTotal=(a,d)=>{
        let t=(+a)-(+d)
        return parseFloat(t.toString()).toFixed(2)
    }




    const Rendered=()=>{
        if(isLoading){
            return (
                <div>
                    <span className="block text-xs text-center">Loading ...</span>
                </div>
            )
        }

        if(isError){
            return (
                <div>
                    <span className="block text-xs text-center">Something went wrong, check your internet connection</span>
                </div>
            )
        }



        return fees && fees.length > 0 ? (

            <table className="w-full">
                <thead>
                    <tr>
                        <th width={'55%'} className='py-5 text-xs text-left font-medium text-teal-700'>Description</th>
                        <th width={'15%'} className='py-5 text-xs text-left font-medium text-teal-700'>Fees</th>
                        <th width={'15%'} className='py-5 text-xs text-left font-medium text-teal-700'>Paid</th>
                        <th width={'15%'} className='py-5 text-xs text-left font-medium text-teal-700'>Balance</th>
                    </tr>
                </thead>
                <tbody>
                {
                    fees.map((f,i)=>(
                        <tr key={i}>
                            <td className='text-xs py-5 text-teal-600'>
                                <Link to={`/invoice/${f.id}/${id}`}>
                                    {f.description} - {f.term?.description} - {moment(f.term?.start).format('YYYY')}
                                </Link>
                            </td>
                            <td className='text-xs py-5'>{f.term?.amount}</td>
                            <td className='text-xs py-5'>({f.deposit.toFixed(2)})</td>
                            <td className='text-xs py-5'>{_calculateTotal(f.term?.amount,f.deposit)}</td>
                        </tr>
                    ))
                }
                </tbody>

            </table>

        ) : (
            <div>
                <span className="block text-xs text-center">No Content</span>
            </div>
        )
    }

    return (
        <div className='mt-10'>
            <div>
                <span className="block text-3xl font-light text-p-100">
                    Fees
                </span>
            </div>

            <div className="mt-10">
                <Rendered/>
            </div>
        </div>
    )
}
