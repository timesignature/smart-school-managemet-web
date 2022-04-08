import useParent from "../hooks/useParent";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
export default function ParentEditComponent(){

    const {id}=useParams()
    const {data:parent}=useParent(id)
    const [state,setState]=useState({
        name:'',
        surname:'',
        phone:'',
        address:'',
        city:'',
        state:'',
        country:'',
    })

    useEffect(()=>{
        if(parent){
            console.log(parent)
            setState(parent)
        }
    },[parent])


    return (
        <div className={'w-2/3 grid grid-cols-2 gap-10'}>

            <div className="mt-10 col-span-2">
                <span className="block text-3xl text-p-100">
                    Parent Details
                </span>
            </div>


            <div>
                <label>
                    <span className="block text-xs mb-3">First Name</span>
                    <input
                        type="text"
                        value={state.name ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

            <div>
                <label>
                    <span className="block text-xs mb-3">Last Name</span>
                    <input
                        type="text"
                        value={state.surname ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

            <div>
                <label>
                    <span className="block text-xs mb-3">Phone</span>
                    <input
                        type="text"
                        value={state.phone ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

            <div className={'col-span-2'}>
                <label>
                    <span className="block text-xs mb-3">Home Address</span>
                    <textarea
                        rows={5}
                        value={state.address ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

            <div>
                <label>
                    <span className="block text-xs mb-3">City</span>
                    <input
                        type="text"
                        value={state.city ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

            <div>
                <label>
                    <span className="block text-xs mb-3">State</span>
                    <input
                        type="text"
                        value={state.state ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

            <div>
                <label>
                    <span className="block text-xs mb-3">Country</span>
                    <input
                        type="text"
                        value={state.country ?? ''}
                        readOnly
                        className="input"
                    />
                </label>
            </div>

        </div>
    )
}
