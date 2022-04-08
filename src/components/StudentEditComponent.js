import SectionComponent from "./SectionComponent";
import ParentComponent from "./ParentComponent";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import useParents from "../hooks/useParents";
import useSection from "../hooks/useSection";
import {success, warning} from "./ToastComponent";
import moment from "moment";
import useStudent from "../hooks/useStudent";
import CloudUploadStudentComponent from "./CloudUploadStudentComponent";

export default function StudentEditComponent(){

    const {id}=useParams()
    const {data:student}=useStudent(id)


    const {data:parents}=useParents()
    const {data:sections}=useSection()

    const [parent,setParent]=useState({})
    const [state,setState]=useState({
        name:'',
        surname:'',
        gender:'',
        dob:'',
        religion:'',
        section_id:'',
        avatar:null,
        national_id:'',
        parent_id:'',
        parent:null
    })
    const [errors,setErrors]=useState({})

    useEffect(()=>{
        if(student){
            setState(student)
        }
    },[student])


    const handleParentChange=(e)=>{

        setParent(parents[e.target.value] ?? {})

    }


    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const selectImage=(e)=>{
        setState(prev=>({
            ...prev,avatar:e.target.files[0]
        }))
    }

    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.put(`/students/${id}`,values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['students'])
            setErrors({})
            success('You have successfully updated the student information, congrats!')
            setState({
                name:'',
                surname:'',
                gender:'',
                dob:'',
                religion:'',
                section:'',
                avatar:null,
                national_id:'',
            })
        },
        onError:(e)=>{
            warning()
            setErrors(e.response.data.errors || {})
        },
    })

    const submit=()=>{
        mutation.mutate({...state,parent:parent.id ?? ''})
    }


    return (
        <div className="flex gap-10 mt-10">
            <div className="flex-1">

                <span className="block text-p-100 text-3xl">Student Details</span>

                <div className="mt-10 grid grid-cols-2 gap-10">

                    <div className="col-span-2">
                        {
                            student && (
                                <CloudUploadStudentComponent student={student} />
                            )
                        }
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">First Name</span>
                            <input
                                type="text"
                                placeholder={'enter first name'}
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
                            <span className="block text-xs mb-3">Last Name</span>
                            <input
                                type="text"
                                placeholder={'enter Last name'}
                                name={'surname'}
                                value={state.surname}
                                onChange={handleChange}
                                className={`inp ${errors.surname ? 'border-red-600' : 'border-zinc-200'}`}
                            />
                            {
                                errors.surname && (
                                    <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.surname[0]
                                                }
                                            </span>
                                )
                            }
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">National ID</span>
                            <input
                                type="text"
                                placeholder={'enter national id / birth certificate no.'}
                                name={'national_id'}
                                value={state.national_id}
                                onChange={handleChange}
                                className={`inp ${errors.national_id ? 'border-red-600' : 'border-zinc-200'}`}
                            />
                            {
                                errors.national_id && (
                                    <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.national_id[0]
                                                }
                                            </span>
                                )
                            }
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Gender</span>
                            <select
                                name={'gender'}
                                value={state.gender}
                                onChange={handleChange}
                                className={`inp ${errors.gender ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            {
                                errors.gender && (
                                    <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.gender[0]
                                                }
                                            </span>
                                )
                            }
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Date of Birth</span>
                            <input
                                type="date"
                                name={'dob'}
                                value={state.dob}
                                onChange={handleChange}
                                className={`inp ${errors.dob ? 'border-red-600' : 'border-zinc-200'}`}
                            />
                            {
                                errors.dob && (
                                    <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.dob[0]
                                                }
                                            </span>
                                )
                            }
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Religion</span>
                            <select
                                name={'religion'}
                                value={state.religion}
                                onChange={handleChange}
                                className={`inp ${errors.religion ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                <option>Christianity</option>
                                <option>Muslim</option>
                                <option>Traditional</option>
                            </select>

                            {
                                errors.religion && (
                                    <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.religion[0]
                                                }
                                            </span>
                                )
                            }

                        </label>
                    </div>

                </div>

                <div className="grid grid-cols-3 gap-5 mt-10">
                    <div>
                        <label>
                            <span className="block text-xs mb-3">Year</span>
                            <input
                                type="text"
                                value={moment(Date.now()).format('YYYY')}
                                readOnly
                                placeholder={'Year'}
                                className="input"/>
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Reg No</span>
                            <input
                                type="text"
                                value={`mnb-${Date.now()}`}
                                readOnly
                                className="input"/>
                        </label>
                    </div>

                    <div>
                        <label>
                            <div className="mb-3 flex items-center justify-between">
                                <span className="block text-xs">Section / Class</span>
                                <SectionComponent/>
                            </div>
                            <select
                                name={'section_id'}
                                value={state.section_id}
                                onChange={handleChange}
                                className={`inp ${errors.section_id ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                {
                                    sections && sections.map((s,i)=>(
                                        <option key={i} value={s.id}>{s.title}</option>
                                    ))
                                }
                            </select>

                            {
                                errors.section_id && (
                                    <span className="block text-xs text-red-600 mt-3">
                                        {
                                            errors.section_id[0]
                                        }
                                    </span>
                                )
                            }
                        </label>
                    </div>

                    <div>
                        <label>
                            <span className="block text-xs mb-3">Registration Date</span>
                            <input
                                type="date"
                                placeholder={'Registration Date'}
                                className="input"/>
                        </label>
                    </div>
                </div>


                <div className="mt-10">
                    <div className={'grid grid-cols-2 gap-10'}>

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
                                    value={state.parent?.name ?? ''}
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
                                    value={state.parent?.surname ?? ''}
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
                                    value={state.parent?.phone ?? ''}
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
                                    value={state.parent?.address ?? ''}
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
                                    value={state.parent?.city ?? ''}
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
                                    value={state.parent?.state ?? ''}
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
                                    value={state.parent?.country ?? ''}
                                    readOnly
                                    className="input"
                                />
                            </label>
                        </div>

                    </div>
                </div>

                <div className="mt-10">
                    <button onClick={submit} className='btn bg-p-100 text-white'>
                        {
                            mutation.isLoading ? '...Updating student information' : 'Update student information'
                        }
                    </button>
                </div>

            </div>
            <div className="w-1/3">
                <div>
                    <span className="block text-p-100 text-3xl">Parents</span>
                    <div className="mt-10">
                        <label>
                            <div className="mb-3 flex items-center justify-between">
                                <span className="block text-xs">Select Parent</span>
                                <ParentComponent/>
                            </div>
                            <select

                                onChange={handleParentChange}
                                className={`inp ${errors.parent ? 'border-red-600' : 'border-zinc-200'}`}
                            >
                                <option value="">Select</option>
                                {
                                    parents && parents.map((s,i)=>(
                                        <option key={i} value={i}>
                                            {s.name} {s.surname} &bull; {s.national_id}
                                        </option>
                                    ))
                                }
                            </select>

                            {
                                errors.parent && (
                                    <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.parent[0]
                                                }
                                            </span>
                                )
                            }
                        </label>

                    </div>
                </div>
            </div>
        </div>
    )
}
