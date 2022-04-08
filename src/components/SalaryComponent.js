import useItems from "../hooks/useItems";
import AllowanceDeducationComponent from "./AllowanceDeductionComponent";
import {useParams} from "react-router-dom";
import useSlip from "../hooks/useSlip";


export default function SalaryComponent(){


    const {id}=useParams()
    const {data}=useSlip(id)


    return (
        <div className="mt-10">
            <div className="flex items-center justify-between">
                <span className="block text-3xl font-light text-p-100">
                    Salary Revision
                </span>
            </div>

            <div>

                <div className='mt-4'>
                    {
                        data && (
                            <table className='w-full'>
                                <thead>
                                <tr>
                                    <th width={'70%'} className='text-xs text-left font-medium p-5'>Name</th>
                                    <th width={'30%'} className='text-xs text-right font-medium p-5'>Amount Monthly</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td colSpan={2} className='text-xs font-bold text-teal-900 p-5'>
                                        Earnings
                                    </td>
                                </tr>
                                </tbody>
                                <tbody>
                                {
                                    data.filter(f=>f.type==='earning').map((d,i)=>(
                                        <tr key={i}>
                                            <AllowanceDeducationComponent employee={id} data={d}/>
                                            <td className='text-xs text-light text-right p-5'>${d.amount}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>

                                <tbody>
                                <tr>
                                    <td colSpan={2} className='text-xs font-bold text-teal-900 p-5'>
                                        Deductions
                                    </td>
                                </tr>
                                </tbody>
                                <tbody>
                                {
                                    data.filter(f=>f.type==='deduction').map((d,i)=>(
                                        <tr key={i}>
                                            <AllowanceDeducationComponent employee={id} data={d}/>
                                            <td className='text-xs text-light text-right p-5'>${d.amount}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td colSpan={2} className='text-xs text-teal-900 font-bold p-5'>
                                            Reimbursements
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                {
                                    data.filter(f=>f.type==='reimbursement').map((d,i)=>(
                                        <tr key={i}>
                                            <AllowanceDeducationComponent employee={id} data={d}/>
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
    )
}
