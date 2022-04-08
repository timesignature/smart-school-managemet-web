import MainLayout from "../../Layout/MainLayout";
import useSetting from "../../hooks/useSetting";
import SavedSettingComponent from "../../components/SavedSettingComponent";
import UnSavedSettingComponent from "../../components/UnSavedSettingComponent";


export default function Setting(){


    const {data:setting,isLoading,isError}=useSetting()


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


        return setting && (
            <div>
                {
                    setting.length > 0 ? (
                        <SavedSettingComponent setting={setting[0]}/>
                    ) : (
                        <UnSavedSettingComponent/>
                    )
                }
            </div>
        )
    }


    return (
        <MainLayout>

            <Rendered/>

        </MainLayout>
    )
}
