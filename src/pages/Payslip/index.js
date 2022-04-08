import MainLayout from "../../Layout/MainLayout";
import {useParams} from "react-router-dom";
import useSlip from "../../hooks/useSlip";
import SlipLetterHeadComponent from "../../components/SlipLetterHeadComponent";
import SlipEmployeeProfile from "../../components/SlipEmployeeProfile";
import useTotal from "../../hooks/useTotal";

export default function Payslip(){

    const {id}=useParams()
    const {data}=useSlip(id)
    const {data:total}=useTotal(id)







    return (
        <MainLayout>
            <div className="p-20">

                <div className="p-10 border border-zinc-100">

                    <SlipLetterHeadComponent/>
                    <div className="py-5 border-b border-p-100">

                    <div className="flex items-center space-x-2">
                        <span className="block text-sm">
                            Payslip for month of
                        </span>
                        <input type="date" className='text-xs focus:outline-none bg-transparent'/>
                    </div>

                        <div className="mt-5 ">
                        <span className="block text-sm font-semibold uppercase text-p-100">
                            Employee Pay Summery
                        </span>
                        </div>

                        <div className="grid grid-cols-2 gap-10 mt-5">
                            <SlipEmployeeProfile/>

                            <div className="flex items-center space-y-3 justify-center flex-col">
                                <span className="block text-center text-xs">Employee Net Pay</span>
                                {
                                    total ? (
                                        <span className="block font-bold text-center text-3xl">${total.toFixed(2)}</span>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <div className='w-[20px] h-5 bg-gray-200 animate-pulse'/>
                                            <div className='w-[32px] h-5 bg-gray-200 animate-pulse'/>
                                        </div>
                                    )
                                }

                                <span className="block text-center text-xs">Pay Day | LOP Day</span>
                            </div>
                        </div>

                    </div>
                    <div className='mt-4'>
                        {
                            data && (
                                <table className='w-full'>
                                    <thead>
                                    <tr>
                                        <th width={'70%'} className='text-xs text-left font-medium p-5'></th>
                                        <th width={'30%'} className='text-xs text-right font-medium p-5'></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colSpan={2} className='border-t border-p-100 text-lg font-bold text-p-100 py-5'>
                                            Earnings
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tbody>
                                    {
                                        data.filter(f=>f.type==='earning').map((d,i)=>(
                                            <tr key={i}>
                                                <td className='text-xs py-5'>{d.title}</td>
                                                <td className='text-xs text-light text-right py-5'>${d.amount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>

                                    <tbody>
                                    <tr>
                                        <td colSpan={2} className='border-t border-p-100 text-lg font-bold text-p-100 py-5'>
                                            Deductions
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tbody>
                                    {
                                        data.filter(f=>f.type==='deduction').map((d,i)=>(
                                            <tr key={i}>
                                                <td className='text-xs py-5'>{d.title}</td>
                                                <td className='text-xs text-light text-right py-5'>${d.amount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                    <tbody>
                                    <tr>
                                        <td colSpan={2} className='border-t border-p-100 text-lg font-bold text-p-100 py-5'>
                                            Reimbursements
                                        </td>
                                    </tr>
                                    </tbody>
                                    <tbody>
                                    {
                                        data.filter(f=>f.type==='reimbursement').map((d,i)=>(
                                            <tr key={i}>
                                                <td className='text-xs py-5'>{d.title}</td>
                                                <td className='text-xs text-light text-right p-5'>${d.amount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
