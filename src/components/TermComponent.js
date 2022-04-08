import ToggleComponent from "./toggleComponent";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function TermComponent(){


    const [state,setState]=useState({
        description:'',
        start:'',
        end:'',
        amount:'',
        enabled:true
    })

    const [errors,setErrors]=useState({})


    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/terms',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['terms'])
            setErrors({})
            success('You have successfully add a new term to the list, congrats!')
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
            warning()
        },
    })


    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }


    const submit=()=>{
        mutation.mutate(state)
    }



    return (
        <div className="mt-10">
            <span className="block text-3xl font-light text-p-100">New Term</span>

            <div className="mt-10 grid grid-cols-3 gap-10">
                <div>
                    <label>
                        <span className="block text-xs mb-3">Description</span>
                        <input
                            type="text"
                            placeholder='Description'
                            name={'description'}
                            value={state.description}
                            onChange={handleChange}
                            className={`inp ${errors.description ? 'border-red-600' : 'border-zinc-200'}`}
                        />
                        {
                            errors.description && (
                                <span className="block text-xs text-red-600 mt-3">
                                    {
                                        errors.description[0]
                                    }
                                </span>
                            )
                        }
                    </label>
                </div>

                <div>
                    <label>
                        <span className="block text-xs mb-3">Start At</span>
                        <input
                            type="date"
                            name={'start'}
                            value={state.start}
                            onChange={handleChange}
                            className={`inp ${errors.start ? 'border-red-600' : 'border-zinc-200'}`}
                        />
                        {
                            errors.start && (
                                <span className="block text-xs text-red-600 mt-3">
                                    {
                                        errors.start[0]
                                    }
                                </span>
                            )
                        }
                    </label>
                </div>

                <div>
                    <label>
                        <span className="block text-xs mb-3">End At</span>
                        <input
                            type="date"
                            name={'end'}
                            value={state.end}
                            onChange={handleChange}
                            className={`inp ${errors.end ? 'border-red-600' : 'border-zinc-200'}`}
                        />
                        {
                            errors.end && (
                                <span className="block text-xs text-red-600 mt-3">
                                    {
                                        errors.end[0]
                                    }
                                </span>
                            )
                        }
                    </label>
                </div>

                <div>
                    <label>
                        <span className="block text-xs mb-3">Amount</span>
                        <input
                            type="text"
                            name={'amount'}
                            value={state.amount}
                            onChange={handleChange}
                            className={`inp ${errors.amount ? 'border-red-600' : 'border-zinc-200'}`}
                        />
                        {
                            errors.amount && (
                                <span className="block text-xs text-red-600 mt-3">
                                    {
                                        errors.amount[0]
                                    }
                                </span>
                            )
                        }
                    </label>
                </div>
            </div>
            <div className="mt-10">
                <ToggleComponent enabled={state.enabled} setEnabled={(val)=>setState(prev=>({...prev,enabled:val}))}/>
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
