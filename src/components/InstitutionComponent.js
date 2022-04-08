import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {useState} from "react";
import {success, warning} from "./ToastComponent";

export default function InstitutionComponent(){


    const [state,setState]=useState({
        name:'',
    })



    const [errors,setErrors]=useState({})



    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const queryClient=useQueryClient()


    const mutation=useMutation(values=>http.post('/school',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['schools'])
            setErrors({})
            success('school is successfully added to the list')
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
                    School
                </span>
            </div>
            <div>
                <label>
                    <span className="block text-xs mb-3">
                        Name
                    </span>
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
