import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {useState} from "react";
import {success, warning} from "./ToastComponent";
import useItems from "../hooks/useItems";
import {useParams} from "react-router-dom";

export default function SlipComponent(){



    const {id}=useParams()
    const {data}=useItems()


    const [state,setState]=useState({
        description:'',
        amount:'',
        employee:id,
        isAllowance:'',
    })



    const [errors,setErrors]=useState({})



    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const queryClient=useQueryClient()


    const mutation=useMutation(values=>http.post('/slips',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['slip',id])
            setErrors({})
            success('Salary item is added to your team members list')
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
        <div className="mb-10">
            <div className="grid grid-cols-2 gap-10">
                <div className="col-span-2">
                    <label>
                    <span className="block text-xs mb-3">
                        Description
                    </span>
                    <select
                        name={'description'}
                        value={state.description}
                        onChange={handleChange}
                        className={`inp ${errors.description ? 'border-red-600' : 'border-zinc-200'}`}
                    >
                        <option value="">Select</option>
                        {
                            data && data.map((d,i)=>(
                                <option key={i} value={d.id}>{d.title} - {d.isAllowance ? '(Allowance)' : '(Deduction)'}</option>
                            ))
                        }
                    </select>
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
                            <span className="block text-xs mb-3">
                                Amount
                            </span>
                            <input
                                type={'text'}
                                placeholder='Amount'
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
