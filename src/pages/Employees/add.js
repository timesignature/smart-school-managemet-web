import MainLayout from "../../Layout/MainLayout";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import http from "../../http";
import {useHistory} from "react-router-dom";
import UploadComponent from "../../components/UploadComponent";
import BankComponent from "../../components/BankComponent";
import DepartmentComponent from "../../components/DepartmentComponent";
import DesignationComponent from "../../components/DesignationComponent";
import useDepartments from "../../hooks/useDepartments";
import useDesignation from "../../hooks/useDesignation";
import useBanks from "../../hooks/useBanks";
import {success, warning} from "../../components/ToastComponent";

export default function AddEmployee(){


    const {data:departments}=useDepartments()
    const {data:designation}=useDesignation()
    const {data:banks}=useBanks();


    const [state,setState]=useState({
        name:'',
        surname:'',
        gender:'',
        dob:'',
        national_id:'',
        religion:'',
        marital:'',
        nationality:'',
        avatar:null,
        phone:'',
        email:'',
        department:'',
        designation:'',
        joining_date:'',
        address:'',
        country:'',
        state:'',
        city:'',
        children:0,
        bank:'',
        account_number:'',

    })



    const [errors,setErrors]=useState({})



    const h=useHistory()

    const handleChange=(e)=>{
        return setState(prev=>({
            ...prev,[e.target.name]:e.target.value
        }))
    }



    const queryClient=useQueryClient()


    const mutation=useMutation(values=>http.post('/employees',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['employees'])
            setErrors({})
            success('you have successfully added a new member to your team, congrats!!!')
            h.push(`/employees/${data.id}/contact`)
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
        fd.append('email',state.email)
        fd.append('phone',state.phone)
        fd.append('designation',state.designation)
        fd.append('department',state.department)
        fd.append('national_id',state.national_id)
        fd.append('nationality',state.nationality)
        fd.append('joining_date',state.joining_date)
        fd.append('address',state.address)
        fd.append('country',state.country)
        fd.append('state',state.state)
        fd.append('city',state.city)
        fd.append('marital',state.marital)
        fd.append('children',state.children)
        fd.append('bank',state.bank)
        fd.append('account_number',state.account_number)
        mutation.mutate(fd)
    }


    return (
        <MainLayout>
            <div className="p-20">
                <div>
                    <span className="block text-5xl font-light">Employee</span>
                    <span className="block text-xs leading-loose mt-2 font-light">
                        Create new employee information
                    </span>
                </div>
                <div className="mt-10">
                    <div className="flex gap-10">
                        <div className="flex-1">

                            <div>
                                <span className="block text-3xl text-p-100 font-light">Employee Details</span>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-10">
                                <div>
                                    <UploadComponent avatar={state.avatar} setState={setState}/>
                                </div>

                                <div></div>

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            First Name
                                        </span>
                                        <input
                                            type={'text'}
                                            placeholder='First Name'
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
                                            Last Name
                                        </span>
                                        <input
                                            type={'text'}
                                            placeholder='Last Name'
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
                                        <span className="block text-xs mb-3">
                                            Gender
                                        </span>
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
                                        <span className="block text-xs mb-3">
                                            Marital Status
                                        </span>
                                        <select
                                            name={'marital'}
                                            value={state.marital}
                                            onChange={handleChange}
                                            className={`inp ${errors.marital ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            <option>Single</option>
                                            <option>Married</option>
                                            <option>Widowed</option>
                                        </select>
                                        {
                                            errors.marital && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.marital[0]
                                                }
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Date of birth
                                        </span>
                                        <input
                                            type={'date'}
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
                                        <span className="block text-xs mb-3">
                                            National ID
                                        </span>
                                        <input
                                            type={'text'}
                                            placeholder='National ID'
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
                                        <span className="block text-xs mb-3">
                                            Number of children
                                        </span>
                                        <input
                                            type={'text'}
                                            placeholder='No. of children'
                                            name={'children'}
                                            value={state.children}
                                            onChange={handleChange}
                                            className={`inp ${errors.children ? 'border-red-600' : 'border-zinc-200'}`}
                                        />
                                        {
                                            errors.children && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.children[0]
                                                }
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Religion
                                        </span>
                                        <select
                                            name={'religion'}
                                            value={state.religion}
                                            onChange={handleChange}
                                            className={`inp ${errors.religion ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            <option>Christian</option>
                                            <option>Muslim</option>
                                            <option>Rastafarian</option>
                                            <option>African Tradition</option>
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

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                           Nationality
                                        </span>
                                        <input
                                            type={'text'}
                                            placeholder='Nationality'
                                            name={'nationality'}
                                            value={state.nationality}
                                            onChange={handleChange}
                                            className={`inp ${errors.nationality ? 'border-red-600' : 'border-zinc-200'}`}
                                        />
                                        {
                                            errors.nationality && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.nationality[0]
                                                }
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                            </div>

                            <div className="mt-10 grid grid-cols-3 gap-5">
                                <div>
                                    <label>
                                <span className="block text-xs mb-3">
                                    Department
                                </span>
                                        <select
                                            name={'department'}
                                            value={state.department}
                                            onChange={handleChange}
                                            className={`inp ${errors.department ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            {
                                                departments && departments.map((d,i)=>(
                                                    <option key={i} value={d.id}>{d.title}</option>
                                                ))
                                            }
                                        </select>


                                        {
                                            errors.department && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.department[0]
                                                }
                                            </span>
                                            )
                                        }

                                    </label>
                                </div>

                                <div>
                                    <label>
                                    <span className="block text-xs mb-3">
                                        Designation
                                    </span>
                                        <select
                                            name={'designation'}
                                            value={state.designation}
                                            onChange={handleChange}
                                            className={`inp ${errors.designation ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            {
                                                designation && designation.map((d,i)=>(
                                                    <option key={i} value={d.id}>{d.title}</option>
                                                ))
                                            }
                                        </select>


                                        {
                                            errors.designation && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.designation[0]
                                                }
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Joining Date
                                        </span>
                                        <input
                                            type={'date'}
                                            placeholder='National ID'
                                            name={'joining_date'}
                                            value={state.joining_date}
                                            onChange={handleChange}
                                            className={`inp ${errors.joining_date ? 'border-red-600' : 'border-zinc-200'}`}
                                        />
                                        {
                                            errors.joining_date && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.joining_date[0]
                                                }
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>
                            </div>

                            <div className='mt-10'>
                                <span className="block text-3xl text-p-100 font-light">Contact Details</span>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-10">
                                <div className={'col-span-2'}>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Home Address
                                        </span>
                                        <textarea
                                            rows={5}
                                            placeholder='Home Address'
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
                                        <span className="block text-xs mb-3">
                                            Phone
                                        </span>
                                        <input
                                            type={'text'}
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

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Email Address
                                        </span>
                                        <input
                                            type={'email'}
                                            placeholder='E-Mail Address'
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
                                        <span className="block text-xs mb-3">
                                            City
                                        </span>
                                        <input
                                            type={'text'}
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
                                        <span className="block text-xs mb-3">
                                            State
                                        </span>
                                        <input
                                            type={'text'}
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
                                        <span className="block text-xs mb-3">
                                            Country
                                        </span>
                                        <input
                                            type={'text'}
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

                            </div>


                            <div className='mt-10'>
                                <span className="block text-3xl text-p-100 font-light">Bank Details</span>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-10">

                                <div>
                                    <label>
                                        <div className="mb-3 flex items-center justify-between">
                                            <span className="block text-xs">
                                                Bank
                                            </span>
                                            <BankComponent/>
                                        </div>
                                        <select
                                            name={'bank'}
                                            value={state.bank}
                                            onChange={handleChange}
                                            className={`inp ${errors.bank ? 'border-red-600' : 'border-zinc-200'}`}
                                        >
                                            <option value="">Select</option>
                                            {
                                                banks && banks.map(b=>(
                                                    <option key={b.id} value={b.id}>{b.name}</option>
                                                ))
                                            }
                                        </select>
                                        {
                                            errors.bank && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.bank[0]
                                                }
                                            </span>
                                            )
                                        }
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <span className="block text-xs mb-3">
                                            Account Number
                                        </span>
                                        <input
                                            type={'text'}
                                            placeholder='Account Number'
                                            name={'account_number'}
                                            value={state.account_number}
                                            onChange={handleChange}
                                            className={`inp ${errors.account_number ? 'border-red-600' : 'border-zinc-200'}`}
                                        />
                                        {
                                            errors.account_number && (
                                                <span className="block text-xs text-red-600 mt-3">
                                                {
                                                    errors.account_number[0]
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
                        <div className="w-1/3">

                            <div>
                                <DepartmentComponent/>
                            </div>

                            <div className="mt-20">
                                <DesignationComponent/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
