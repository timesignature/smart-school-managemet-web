import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import useTerms from "../hooks/useTerms";
import moment from "moment";

export default function PaymentComponent({id}) {
    let [isOpen, setIsOpen] = useState(false)

    const {data:terms}=useTerms()

    const [state,setState]=useState({
        description:'',
        charge:'',
        amount:'',
        student:id
    })

    const [errors,setErrors]=useState({})

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post(`/fees/student/${id}`,values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['fees','student',id])
            setErrors({})
            success('You have successfully adjusted your student bursary, congrats!')
            closeModal()
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
        <>
                <button type={'button'} onClick={openModal} className="focus:outline-none text-p-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed bg-black bg-opacity-25 inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full font-mont max-w-lg p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl text-p-100 font-light"
                                >
                                    Fees Adjustments
                                </Dialog.Title>
                                <div className="mt-10">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label>
                                                <span className="block text-xs mb-3">Charge / Payment</span>
                                                <select
                                                    name={'charge'}
                                                    value={state.charge}
                                                    onChange={handleChange}
                                                    className={`inp ${errors.charge ? 'border-red-600' : 'border-zinc-200'}`}
                                                >
                                                    <option value="">Select</option>
                                                    <option value={1}>Charge</option>
                                                    <option value={0}>Payment</option>
                                                </select>

                                                {
                                                    errors.charge && (
                                                        <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.charge[0]
                                                        }
                                                    </span>
                                                    )
                                                }
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <span className="block text-xs mb-3">Term</span>
                                                <select
                                                    name={'term'}
                                                    value={state.term}
                                                    onChange={handleChange}
                                                    className={`inp ${errors.term ? 'border-red-600' : 'border-zinc-200'}`}
                                                >
                                                    <option value="">Select</option>
                                                    {
                                                        terms && terms.map((t,i)=>(
                                                            <option key={i} value={t.id}>
                                                                {t.description}  -  {moment(t.from).format('MMM Do YYYY')} &bull; {moment(t.to).format('MMM Do YYYY')}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    errors.term && (
                                                        <span className="block text-xs text-red-600 mt-3">
                                                        {
                                                            errors.term[0]
                                                        }
                                                    </span>
                                                    )
                                                }
                                            </label>
                                        </div>
                                    </div>

                                    <div className='mt-10'>
                                        <label>
                                            <span className="block text-xs mb-3">Description</span>
                                            <input
                                                type="text"
                                                placeholder={'Description'}
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

                                    <div className='mt-10'>
                                        <label>
                                            <span className="block text-xs mb-3">Amount</span>
                                            <input
                                                type="text"
                                                placeholder={'Amount'}
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
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
