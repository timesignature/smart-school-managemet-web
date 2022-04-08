import MainLayout from "../../Layout/MainLayout";
import EmployeeTabComponent from "../../components/EmployeeTabComponent";
import useEmployee from "../../hooks/useEmployee";
import {useParams} from "react-router-dom";

export default function EditEmployee(){

    const {id}=useParams()

    const {data}=useEmployee(id)


    return (
        <MainLayout>
            <div className='p-20'>

                <div className="flex items-center justify-between mb-10">

                    <div>
                        {
                            data ? (
                                <div className='flex items-center space-x-5'>
                                    <span className="block text-base font-medium">{data.name} {data.surname}</span>
                                    <span className="block text-xs font-light p-1 bg-gray-100">EMP. ID : {data.id}</span>
                                </div>
                            ) : (
                                <div>
                                    <div className="h-2 w-1/3 bg-gray-200"></div>
                                </div>
                            )
                        }
                    </div>



                </div>

                <EmployeeTabComponent/>
            </div>
        </MainLayout>
    )
}
