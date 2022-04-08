import MainLayout from "../../Layout/MainLayout";
import usePayroll from "../../hooks/usePayroll";
import {url} from "../../config";
import {Link} from "react-router-dom";

export default function Payroll(){


    const {data,isLoading,isError}=usePayroll()


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
                    <span className="block text-xs text-center">Something went wrong, please check your internet connection</span>
                </div>
            )
        }

        return data && (
            <div>
                {
                    data.length>0 ? (
                        <table className="w-full">
                            <thead>
                            <tr>
                                <td width={'40%'} className='text-xs border-b border-t border-zinc-100 font-medium text-left py-5 text-teal-600'>Details</td>
                                <td width={'15%'} className='text-xs border-b border-t border-zinc-100 font-medium text-left py-5 text-teal-600'>Earnings</td>
                                <td width={'15%'} className='text-xs border-b border-t border-zinc-100 font-medium text-left py-5 text-teal-600'>Deductions</td>
                                <td width={'15%'} className='text-xs border-b border-t border-zinc-100 font-medium text-left py-5 text-teal-600'>Reimbursements</td>
                                <td width={'15%'} className='text-xs border-b border-t border-zinc-100 font-medium text-left py-5 text-teal-600'>Salary</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((d,i)=>(
                                    <tr key={i}>
                                        <td className='text-xs py-3 border-b border-zinc-100'>
                                            <div className="flex items-center space-x-5">
                                                <div className="w-14 h-14 bg-gray-200 rounded">
                                                    <img
                                                        src={`${url}/${d.avatar}`}
                                                        alt=""
                                                        className='w-full h-full rounded object-cover'
                                                    />
                                                </div>
                                                <div>
                                                    <span className='block text-sm font-medium'>{d.name} {d.surname}</span>
                                                    <span className='block mt-1'>{d.designation?.title}</span>
                                                    <Link to={`/payslip/${d.id}`} className="block mt-2 text-teal-600">Pay Slip</Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='text-xs py-3 border-b border-zinc-100'>{d.earning?.toFixed(2)}</td>
                                        <td className='text-xs py-3 border-b border-zinc-100'>{d.deduction?.toFixed(2)}</td>
                                        <td className='text-xs py-3 border-b border-zinc-100'>{d.reimbursement?.toFixed(2)}</td>
                                        <td className='text-xs py-3 border-b border-zinc-100'>{d.salary?.toFixed(2)}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    ) : (
                        <div>
                            <span className="block text-xs text-center">
                                No Content
                            </span>
                        </div>
                    )
                }
            </div>
        )
    }



    return (
        <MainLayout>

            <div className="p-20">
                <span className="block text-4xl font-light">Payroll</span>


                <div className="mt-20">
                    <Rendered/>
                </div>
            </div>

        </MainLayout>
    )
}
