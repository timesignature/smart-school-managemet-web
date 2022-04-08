import MainLayout from "../../Layout/MainLayout";
import StudentTabComponent from "../../components/StudentTabComponent";

export default function EditStudent(){

    return (
        <MainLayout>
            <div className="p-20">
                <div>
                    <span className="block text-5xl font-light">Students</span>
                    <span className="block text-xs leading-loose mt-2 font-light">
                        Modify Students & parent information
                    </span>
                </div>

                <div className="mt-10">
                    <StudentTabComponent/>
                </div>

            </div>
        </MainLayout>
    )
}
