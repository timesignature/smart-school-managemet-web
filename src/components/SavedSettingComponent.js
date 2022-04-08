import LogoComponent from "./LogoComponent";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import CloudUploadComponent from "./CloudUploadComponent";

export default function SavedSettingComponent({setting}){


    const [state,setState]=useState(setting)


    const [errors,setErrors]=useState({})

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.put(`/setting/${setting.id}`,values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['settings'])
            setErrors({})
            success('its a success!!!, congrats!')
        },
        onError:(e)=>{
            warning()
            setErrors(e.response.data.errors || {})
        },
    })



    const submit=()=>{
        mutation.mutate(state)
    }




    return (
        <div className="p-20">
            <div className="flex items-center justify-between">
                    <span className="block text-4xl font-light">
                        Setting
                    </span>

                <button onClick={submit} className="btn bg-p-100 text-white">
                    {
                        mutation.isLoading ? '... Updating entry' : 'Update entry'
                    }
                </button>
            </div>


            <div className="flex gap-10 mt-20">

                <div className="flex-1">

                        <span className="block text-3xl font-light text-p-100">
                            Company Details
                        </span>

                    <div className="grid grid-cols-2 gap-10 mt-10">


                        <div>
                            <CloudUploadComponent setting={setting} label={'Logo'}/>
                        </div>
                        <div></div>


                        <div className='col-span-2'>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">School Name</span>
                                <input
                                    type="text"
                                    placeholder='School Name'
                                    name={'name'}
                                    value={state.name}
                                    onChange={handleChange}
                                    className={`inp ${errors.name ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.name && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.name[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">Email</span>
                                <input
                                    type="text"
                                    placeholder='Email'
                                    name={'email'}
                                    value={state.email}
                                    onChange={handleChange}
                                    className={`inp ${errors.email ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.email && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.email[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">Phone</span>
                                <input
                                    type="text"
                                    placeholder='Phone Number'
                                    name={'phone'}
                                    value={state.phone}
                                    onChange={handleChange}
                                    className={`inp ${errors.phone ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.phone && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.phone[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div className='col-span-2'>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">Address</span>
                                <textarea
                                    rows={4}
                                    placeholder='Address'
                                    name={'address'}
                                    value={state.address}
                                    onChange={handleChange}
                                    className={`inp ${errors.address ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.address && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.address[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">City</span>
                                <input
                                    type="text"
                                    placeholder='City'
                                    name={'city'}
                                    value={state.city}
                                    onChange={handleChange}
                                    className={`inp ${errors.city ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.city && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.city[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">State</span>
                                <input
                                    type="text"
                                    placeholder='State'
                                    name={'state'}
                                    value={state.state}
                                    onChange={handleChange}
                                    className={`inp ${errors.state ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.state && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.state[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">Country</span>
                                <input
                                    type="text"
                                    placeholder='Country'
                                    name={'country'}
                                    value={state.country}
                                    onChange={handleChange}
                                    className={`inp ${errors.country ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.country && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.country[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div className="col-span-2">
                                <span className="block text-3xl font-light text-p-100">
                                    Invoice Settings
                                </span>
                        </div>

                        <div className='col-span-2'>
                            <label>
                                <span className="block text-xs text-teal-700 mb-3">Notes</span>
                                <textarea
                                    rows={4}
                                    placeholder='notes'
                                    name={'notes'}
                                    value={state.notes}
                                    onChange={handleChange}
                                    className={`inp ${errors.notes ? 'border-red-600' : 'border-zinc-200'}`}
                                />
                                {
                                    errors.notes && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.notes[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>
                    </div>

                </div>
                <div className="w-1/3">

                    <LogoComponent/>

                </div>
            </div>

        </div>
    )
}
