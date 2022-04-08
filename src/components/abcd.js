import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {useState} from "react";
import {success, warning} from "./ToastComponent";
import ToggleComponent from "./toggleComponent";

export default function Abcd(){


    const [state,setState]=useState({
        title:'',
        type:''
    })



    const [errors,setErrors]=useState({})



    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const queryClient=useQueryClient()


    const mutation=useMutation(values=>http.post('/items',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['items'])
            setErrors({})
            success('a salary item has been added to the list')
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
            <div className="mb-5">
                <span className="block text-3xl font-light text-p-100">
                    Salary Properties
                </span>
            </div>
            <div>
                <label>
                    <span className="block text-xs mb-3">
                        Name
                    </span>
                    <input
                        type={'text'}
                        placeholder='Title'
                        name={'title'}
                        value={state.title}
                        onChange={handleChange}
                        className={`inp ${errors.title ? 'border-red-600' : 'border-zinc-200'}`}
                    />
                    {
                        errors.title && (
                            <span className="block text-xs text-red-600 mt-3">
                                {
                                    errors.title[0]
                                }
                            </span>
                        )
                    }
                </label>
            </div>

            <div className="mt-5">

                <label>
                    <span className="block text-xs mb-3">
                        Type
                    </span>
                    <select
                        name={'type'}
                        value={state.type}
                        onChange={handleChange}
                        className={`inp ${errors.type ? 'border-red-600' : 'border-zinc-200'}`}
                    >
                        <option value="">Select</option>
                        <option>earning</option>
                        <option>deduction</option>
                        <option>reimbursement</option>
                    </select>
                    {
                        errors.type && (
                            <span className="block text-xs text-red-600 mt-3">
                                {
                                    errors.type[0]
                                }
                            </span>
                        )
                    }
                </label>

            </div>

            <div className="mt-5">
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
