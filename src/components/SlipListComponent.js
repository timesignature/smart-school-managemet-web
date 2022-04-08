import {useParams} from "react-router-dom";
import useSlip from "../hooks/useSlip";
import moment from "moment";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success} from "./ToastComponent";

export default function SlipListComponent(){

    const {id}=useParams()
    const {data,isLoading,isError}=useSlip(id)


    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.delete(`/slip/${values.id}`).then(res=>res.data),{
        onSuccess:async()=>{
            await queryClient.invalidateQueries(['slip',id])
            success('record has been deleted successfully')
        }
    })


    const _submit=(id)=>{
        mutation.mutate({
            id
        })
    }



    const _totalSalary=(val)=>{
        let total=0
        val.forEach(d=>{
            if(d.isAllowance){
                total+=+d.amount
            }else{
                total-=+d.amount
            }
        })

        return total.toFixed(2)
    }


    if(isLoading){
        return (
            <div>
                <span className="block text-xs text-center">...Loading</span>
            </div>
        )
    }

    if(isError){
        return (
            <div>
                <span className="block text-xs text-center">Something went wrong</span>
            </div>
        )
    }


    return data && (
        <div>
            {
                data.length >0 ? (
                    <div>
                        <div>
                            {
                                mutation.isLoading && (
                                    <span className="block text-xs text-green-500 py-4">Deleting...</span>
                                )
                            }
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th width={'30%'} className='text-xs font-medium border-b border-t border-gray-200 text-left p-4'>Date</th>
                                    <th width={'40%'} className='text-xs font-medium border-b border-t border-gray-200 text-left p-4'>Description</th>
                                    <th width={'20%'} className='text-xs font-medium border-b border-t border-gray-200 text-left p-4'>Amount</th>
                                    <th width={'10%'} className='text-xs font-medium border-b border-t border-gray-200 text-left p-4'></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((d,i)=>(
                                    <tr key={i}>
                                        <td className='text-xs font-light p-4 border-b border-gray-200'>{moment(d.created_at).format('DD MMM YYYY')}</td>
                                        <td className='text-xs font-light p-4 border-b border-gray-200'>{d.description}</td>
                                        <td className='text-xs font-light p-4 border-b border-gray-200'>{d.isAllowance ? d.amount : `(${d.amount})`}</td>
                                        <td className='text-xs font-light p-4 border-b border-gray-200'>
                                            <button onClick={()=>_submit(d.id)} className='focus:outline-none text-red-600'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="mt-10">
                            <span className="bg-gray-50 p-1 text-xs font-bold">
                                Total Salary ${_totalSalary(data)}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <span className="block text-xs font-light">
                            No Content
                        </span>
                    </div>
                )
            }
        </div>
    )
}
