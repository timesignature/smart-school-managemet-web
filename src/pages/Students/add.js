import MainLayout from "../../Layout/MainLayout";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../../http";
import SectionComponent from "../../components/SectionComponent";
import ParentComponent from "../../components/ParentComponent";
import UploadComponent from "../../components/UploadComponent";
import useParents from "../../hooks/useParents";
import useSection from "../../hooks/useSection";
import moment from "moment";
import {success, warning} from "../../components/ToastComponent";

export default function AddStudent(){


    const {data:parents}=useParents()
    const {data:sections}=useSection()

    const [parent,setParent]=useState({})
    const [state,setState]=useState({
        name:'',
        surname:'',
        gender:'',
        dob:'',
        religion:'',
        section:'',
        avatar:null,
        national_id:'',
    })
    const [errors,setErrors]=useState({})


    const handleParentChange=(e)=>{
        setParent(parents[e.target.value] ?? {})
    }




    const selectImage=(e)=>{
        setState(prev=>({
            ...prev,avatar:e.target.files[0]
        }))
    }

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }

    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/students',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['students'])
            setErrors({})
            success('You have successfully add a new student to the list, congrats!')
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
        const fd=new FormData()
        fd.append('image',state.avatar)
        fd.append('name',state.name)
        fd.append('surname',state.surname)
        fd.append('gender',state.gender)
        fd.append('dob',state.dob)
        fd.append('religion',state.religion)
        fd.append('parent',parent.id ?? '')
        fd.append('section',state.section)
        fd.append('national_id',state.national_id)
        mutation.mutate(fd)
    }







    return (
        <MainLayout>
            <div className="p-20">
                <div className='flex items-center justify-between'>
                    <div>
                        <span className="block text-5xl font-light">Students</span>
                        <span className="block text-xs leading-loose mt-2 font-light">
                            Create new students here. note that parents  are either selected <br/> from existing or created
                        </span>
                    </div>

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
                <div className="flex gap-10 mt-20">
                    <div className="flex-1">

                        <span className="block text-p-100 text-3xl">Student Details</span>

                        <div className="mt-10 grid grid-cols-2 gap-10">

                            <div className="col-span-2">
                                <UploadComponent avatar={state.avatar} setState={setState}/>
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
                                        value={parent.name ?? ''}
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
                                        value={parent.surname ?? ''}
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
                                        value={parent.phone ?? ''}
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
                                        value={parent.address ?? ''}
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
                                        value={parent.city ?? ''}
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
                                        value={parent.state ?? ''}
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
                                        value={parent.country ?? ''}
                                        readOnly
                                        className="input"
                                    />
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
                                        name={'section'}
                                        value={state.section}
                                        onChange={handleChange}
                                        className={`inp ${errors.section ? 'border-red-600' : 'border-zinc-200'}`}
                                    >
                                        <option value="">Select</option>
                                        {
                                            sections && sections.map((s,i)=>(
                                                <option key={i} value={s.id}>{s.title}</option>
                                            ))
                                        }
                                    </select>

                                    {
                                        errors.section && (
                                            <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.section[0]
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
                                        placeholder={'Select student class'}
                                        name={'parent'}
                                        value={state.parent}
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
            </div>
        </MainLayout>
    )
}
