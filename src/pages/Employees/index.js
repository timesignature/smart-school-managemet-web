import MainLayout from "../../Layout/MainLayout";
import {url} from "../../config";
import {Link} from "react-router-dom";
import useEmployees from "../../hooks/useEmployees";

export default function Employees(){


    const {data,isLoading,isError}=useEmployees()
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


        return data && data.length > 0 ? (
            <table className="w-full">
                <thead>
                <tr>
                    <th width={'50%'} className='text-xs font-medium text-left py-4 px-3'>Name</th>
                    <th width={'20%'} className='text-xs font-medium text-left py-4 px-3'>Email</th>
                    <th width={'20%'} className='text-xs font-medium text-left py-4 px-3'>Department</th>
                </tr>
                </thead>
                <tbody>
                {
                    data.map(s=>(
                        <tr key={s.id}>
                            <td className='text-xs py-4 px-3'>
                                <div className="flex items-center space-x-5">
                                    <div className="w-12 h-12 bg-gray-200 rounded">
                                        <img
                                            src={`${url}/${s.avatar}`}
                                            alt=""
                                            className='w-full h-full rounded object-cover'
                                        />
                                    </div>
                                    <div>
                                        <Link to={`/employees/${s.id}/edit`} className={'text-indigo-500 font-medium'}>{s.name} {s.surname}</Link>
                                        <span className='block text-[10px] mt-2'>{s.designation?.title}</span>
                                    </div>
                                </div>
                            </td>
                            <td className='text-xs py-4 px-3'>{s.email}</td>
                            <td className='text-xs py-4 px-3'>{s.department?.title}</td>
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

    return (
        <MainLayout>
            <div className="p-20">
                <div>
                    <span className="block text-5xl font-light">Employee</span>
                    <span className="block text-xs leading-loose mt-2 font-light">
                        12 entries available
                    </span>
                </div>
                <div className="mt-10 flex items-center justify-between">
                    <div className='w-1/2 flex items-center border border-gray-200 px-3 py-4 rounded text-gray-900'>
                        <input type="text" placeholder={'Search by name,surname'} className="flex-1 focus:outline-none text-xs font-light placeholder-gray-700"/>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <Link to={'/employees/add'} className={'text-p-100'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>

                <div className="mt-10">
                    <Rendered/>
                </div>
            </div>
        </MainLayout>
    )
}
