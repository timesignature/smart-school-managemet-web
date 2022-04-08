import { Toaster } from 'react-hot-toast';
export default function Layout(props){
    return (
        <div className="h-screen bg-white text-gray-900 flex font-mont overflow-y-hidden">
            <div className="flex-1 flex overflow-y-hidden">
                {props.children}
                <Toaster />
            </div>

        </div>
    )
}
