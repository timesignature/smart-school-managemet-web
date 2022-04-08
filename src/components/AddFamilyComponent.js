import {useHistory, useParams} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function AddFamilyComponent({func}){



    const {id}=useParams()
    const [state,setState]=useState({
        name:'',
        relationship:'',
        phone:'',
        employee:id

    })



    const [errors,setErrors]=useState({})




    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const queryClient=useQueryClient()

    const h=useHistory()

    const mutation=useMutation(values=>http.post('/families',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            success('employee family details has been added')
            await queryClient.invalidateQueries(['employees'])
            setErrors({})
           func()
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
            warning()
        },
    })

    const submit=()=>{
        mutation.mutate(state)
    }



    return (
        <div>
            <div className="mt-10 grid grid-cols-2 gap-10">

                <div>
                    <label>
                        <div className="mb-3 flex items-center justify-between">
                                            <span className="block text-xs">
                                                Full Name
                                            </span>
                        </div>
                        <input
                            type={'text'}
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
                                        <span className="block text-xs mb-3">
                                            Relationship
                                        </span>
                        <input
                            type={'text'}
                            name={'relationship'}
                            value={state.relationship}
                            onChange={handleChange}
                            className={`inp ${errors.relationship ? 'border-red-600' : 'border-zinc-200'}`}
                        />
                        {
                            errors.relationship && (
                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.relationship[0]
                                                }
                                            </span>
                            )
                        }
                    </label>
                </div>

                <div>
                    <label>
                                        <span className="block text-xs mb-3">
                                            Phone Number / Cell
                                        </span>
                        <input
                            type={'text'}
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


            </div>

            <div className="mt-10">
                <button
                    type="button"
                    className="btn bg-p-100 text-white"
                    onClick={submit}
                >
                    {
                        mutation.isLoading ? 'Saving new entry' : 'Save new entry'
                    }
                </button>
            </div>
        </div>
    )
}
