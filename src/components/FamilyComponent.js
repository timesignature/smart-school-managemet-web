import useFamily from "../hooks/useFamily";
import {useParams} from "react-router-dom";
import AddFamilyComponent from "./AddFamilyComponent";

export default function FamilyComponent(){
    const {id}=useParams()
    const {data,isLoading,isError}=useFamily(id)


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
        <div className='w-2/3'>
            <AddFamilyComponent/>
            <div className='mt-10'>
                {
                    data.length>0 ? (
                        <div>
                            {
                                data.map(d=>(
                                    <div key={d.id} className='flex flex-col border border-gray-200 rounded p-5 mb-5'>
                                        <span className="block text-sm font-medium">Name : {d.name}</span>
                                        <span className="block text-xs font-light mt-2">Phone : {d.phone}</span>
                                        <span className="block text-xs font-light mt-2">Relationship : {d.relationship}</span>
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
