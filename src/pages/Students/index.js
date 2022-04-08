import MainLayout from "../../Layout/MainLayout";
import useStudents from "../../hooks/useStudents";
import {url} from "../../config";
import {Link} from "react-router-dom";

export default function Students(){

    const {data,isLoading,isError}=useStudents()

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
                        <th width={'40%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Name</th>
                        <th width={'20%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Amount Due</th>
                        <th width={'20%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'>Registered</th>
                        <th width={'20%'} className='text-xs text-teal-600 border-b border-zinc-100 font-medium text-left py-4'></th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map(s=>(
                        <tr key={s.id}>
                            <td className='text-xs py-4 border-b border-zinc-100'>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gray-200 rounded">
                                        <img
                                            src={`${url}/${s.avatar}`}
                                            alt=""
                                            className='w-full h-full rounded object-cover'
                                        />
                                    </div>
                                    <span>{s.name} {s.surname}</span>
                                </div>
                            </td>
                            <td className='text-xs py-4 border-b border-zinc-100'>${s.fees_balance.toFixed(2)}</td>
                            <td className={`text-xs py-4 border-b border-zinc-100 ${s.registered ? 'text-green-600' : 'text-red-600'}`}>{s.registered ? 'Yes' : 'Nop'}</td>
                            <td className='text-xs py-4 border-b border-zinc-100'>
                                <div className="flex items-center space-x-5">
                                    <Link to={`/students/${s.id}/edit`} className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Link>
                                    <Link to={`/students/${s.id}/registration`} className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </Link>
                                </div>
                            </td>
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
                <div className='flex items-center justify-between'>
                    <div>
                        <span className="block text-5xl font-light">Students</span>
                        <span className="block text-xs leading-loose mt-2 font-light">
                           All students here
                        </span>
                    </div>
                    <Link to={'/students/add'} className={'text-p-100'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>

                <div className="mt-10">
                    <div className="grid grid-cols-3 gap-10">
                        <div>
                            <label>
                                <span className="block text-xs mb-3">Name</span>
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    className="input"
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs mb-3">Surname</span>
                                <input
                                    type="text"
                                    placeholder='Enter Surname'
                                    className="input"
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs mb-3">National ID</span>
                                <input
                                    type="text"
                                    placeholder='Enter National ID'
                                    className="input"
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs mb-3">Class</span>
                                <input
                                    type="text"
                                    placeholder='Enter Class'
                                    className="input"
                                />
                            </label>
                        </div>

                    </div>
                </div>

                <div className="mt-10">
                    <button className="px-7 py-4 text-xs rounded focus:outline-none bg-p-100 text-white">
                        Filter
                    </button>
                </div>


                <div className="mt-10">
                    <Rendered/>
                </div>
            </div>
        </MainLayout>
    )
}
