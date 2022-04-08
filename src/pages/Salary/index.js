import MainLayout from "../../Layout/MainLayout";
import SalaryTabComponent from "../../components/SalaryTabComponent";
import ItemComponent from "../../components/ItemComponent";

export default function Salary(){
    return (
        <MainLayout>
            <div className="p-20">
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <span className="block text-3xl font-light text-p-100">Configure your employee salary structure</span>
                        <span className="block text-xs mt-3">Select the necessary components to include in your employee salary <br/> structure and preview salary</span>
                    </div>

                    <ItemComponent/>

                </div>
                <SalaryTabComponent/>
            </div>
        </MainLayout>
    )
}
