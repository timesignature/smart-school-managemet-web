import MainLayout from "../../Layout/MainLayout";
import {useHistory} from "react-router-dom";
import AddEducationComponent from "../../components/AddEducationComponent";


export default function Education(){



    const h=useHistory()

    const _next=()=>{
        h.push(`/employees`)
    }


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
                    <AddEducationComponent func={()=>_next()}/>
                </div>
            </div>
        </MainLayout>
    )
}
