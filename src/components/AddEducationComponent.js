import InstitutionComponent from "./InstitutionComponent";
import useSchools from "../hooks/useSchools";
import {useHistory, useParams} from "react-router-dom";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function AddEducationComponent({func}){



    const {data:schools}=useSchools()


    const {id}=useParams()
    const [state,setState]=useState({
        school:'',
        description:'',
        employee:id
    })



    const [errors,setErrors]=useState({})




    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }




    const h=useHistory()

    const queryClient=useQueryClient()
    const mutation=useMutation(values=>http.post('/education',values).then(res=>res.data),{
        onSuccess:async()=>{
            setErrors({})
            queryClient.invalidateQueries(['education',id])
            success('employee education details has been updated')

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
        <div>
            <div className="flex gap-10">
                <div className="flex-1">

                    <div className='mt-10'>
                        <span className="block text-3xl text-p-100 font-light">Qualification Details</span>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-10">

                        <div>
                            <label>
                                <div className="mb-3 flex items-center justify-between">
                                            <span className="block text-xs">
                                                University / Institution
                                            </span>
                                </div>
                                <select
                                    name={'school'}
                                    value={state.school}
                                    onChange={handleChange}
                                    className={`inp ${errors.school ? 'border-red-600' : 'border-zinc-200'}`}
                                >

                                    <option value="">Select</option>
                                    {
                                        schools && schools.map((s,i)=>(
                                            <option key={i}>{s.name}</option>
                                        ))
                                    }
                                </select>

                                {
                                    errors.school && (
                                        <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.school[0]
                                                }
                                            </span>
                                    )
                                }
                            </label>
                        </div>

                        <div className={'col-span-2'}>
                            <label>
                                        <span className="block text-xs mb-3">
                                            Description
                                        </span>
                                <textarea rows={5}
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



                    </div>

                    <div className="mt-10 flex items-center space-x-3">

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
                <div className="w-1/3">
                    <InstitutionComponent/>
                </div>
            </div>
        </div>
    )
}
