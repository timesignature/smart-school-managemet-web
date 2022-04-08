import {useParams} from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import moment from "moment";

export default function SlipEmployeeProfile(){
    const {id}=useParams()
    const {data}=useEmployee(id)
    return (
        <div>
            {
                data && (
                    <table className="w-full">
                        <tbody>
                        <tr>
                            <td className='w-1/2 text-xs py-4'>Employee Name</td>
                            <td className='w-1/2 text-xs font-semibold py-4'>: {data.name} {data.surname}</td>
                        </tr>

                        <tr>
                            <td className='w-1/2 text-xs py-4'>Designation</td>
                            <td className='w-1/2 text-xs font-semibold py-4'>: {data.designation?.title}</td>
                        </tr>

                        <tr>
                            <td className='w-1/2 text-xs py-4'>Date of Joining</td>
                            <td className='w-1/2 text-xs font-semibold py-4'>: {moment(data.joining_date).format('DD MMM YYYY')}</td>
                        </tr>

                        <tr>
                            <td className='w-1/2 text-xs py-4'>Pay Period</td>
                            <td className='w-1/2 text-xs font-semibold py-4'>: </td>
                        </tr>

                        <tr>
                            <td className='w-1/2 text-xs py-4'>PF A/C Number</td>
                            <td className='w-1/2 text-xs font-semibold py-4'>: Ac Number</td>
                        </tr>
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
