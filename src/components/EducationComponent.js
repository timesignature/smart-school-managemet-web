import {useParams} from "react-router-dom";
import useEducation from "../hooks/useEducation";
import AddEducationComponent from "./AddEducationComponent";

export default function EducationComponent(){
    const {id}=useParams()
    const {data,isLoading,isError}=useEducation(id)


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
            <AddEducationComponent/>
            <div className='mt-10'>
                {
                    data.length>0 ? (
                        <div className='w-2/3'>
                            {
                                data.map(d=>(
                                    <div key={d.id} className='flex flex-col border border-gray-200 rounded p-5 mb-5'>
                                        <span className="block text-sm font-medium">{d.school}</span>
                                        <span className="block text-xs font-light mt-2">{d.description}</span>
                                    </div>
                                ))
                            }
                        </div>
                    )  : (
                        <div></div>
                    )
                }
            </div>
        </div>
    )
}
