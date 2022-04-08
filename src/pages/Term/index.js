import MainLayout from "../../Layout/MainLayout";
import {useState} from "react";
import TermComponent from "../../components/TermComponent";
import useTerms from "../../hooks/useTerms";
import moment from "moment";

export default function Term(){



    const [open,setOpen]=useState(false)

    const {data:terms,isLoading,isError}=useTerms()


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


        return terms && terms.length>0 ? (
            <table className='w-full'>
                <thead>
                    <tr>
                        <td width={'30%'} className='text-xs text-left font-medium border-b border-zinc px-2 py-3'>Description</td>
                        <td width={'10%'} className='text-xs text-left font-medium border-b border-zinc px-2 py-3'>Amount</td>
                        <td width={'30%'} className='text-xs text-left font-medium border-b border-zinc px-2 py-3'>Start</td>
                        <td width={'30%'} className='text-xs text-left font-medium border-b border-zinc px-2 py-3'>End</td>
                    </tr>
                </thead>
                <tbody>
                {
                    terms.map(t=>(
                        <tr key={t.id} className={`${t.isActive ? '' : 'line-through'}`}>
                            <td className='text-xs font-light border-b border-zinc-200 px-3 py-5 text-teal-400'>{t.description}</td>
                            <td className='text-xs font-light border-b border-zinc-200 px-3 py-5'>${t.amount}</td>
                            <td className='text-xs font-light border-b border-zinc-200 px-3 py-5'>{moment(t.start).format('DD MMM YYYY')}</td>
                            <td className='text-xs font-light border-b border-zinc-200 px-3 py-5'> {moment(t.end).format('DD MMM YYYY')}</td>
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
                        <span className="block text-5xl font-light">Term</span>
                        <span className="block text-xs leading-loose mt-2 font-light">
                            12 entries available
                        </span>
                    </div>
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
                <div className="mt-10 flex items-center justify-between">
                    <div className='w-1/2 flex items-center border border-gray-200 px-3 py-4 rounded text-gray-900'>
                        <input type="text" placeholder={'Search by description'} className="flex-1 focus:outline-none text-xs font-light placeholder-gray-700"/>

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                {
                    open && (
                        <TermComponent/>
                    )
                }

                <div className="mt-10">
                    <Rendered/>
                </div>
            </div>
        </MainLayout>
    )
}
