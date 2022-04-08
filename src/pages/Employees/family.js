import MainLayout from "../../Layout/MainLayout";
import AddFamilyComponent from "../../components/AddFamilyComponent";
import {useHistory, useParams} from "react-router-dom";


export default function Family(){


    const {id}=useParams()
    const h=useHistory()


    return (
        <MainLayout>
            <div className="p-20">
                <div>
                    <span className="block text-5xl font-light">Employee</span>
                    <span className="block text-xs leading-loose mt-2 font-light">
                        Create new employee information
                    </span>
                </div>
                <div className="mt-10">
                    <div className="flex gap-10">
                        <div className="flex-1">


                            <div className='mt-10'>
                                <span className="block text-3xl text-p-100 font-light">Family Member</span>
                            </div>

                           <AddFamilyComponent func={()=> h.push(`/employees/${id}/education`)}/>
                        </div>
                        <div className="w-1/3">

                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
