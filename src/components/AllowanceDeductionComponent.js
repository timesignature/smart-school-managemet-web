import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";

export default function AllowanceDeductionComponent({data,employee}) {
    let [isOpen, setIsOpen] = useState(false)

    const [amount,setAmount]=useState(0)

    const [errors,setErrors]=useState({})

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/slips',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['slip',,employee])
            setErrors({})
            success('You have successfully updated your payslip, congrats!')
            closeModal()
        },
        onError:(e)=>{
            setErrors(e.response.data.errors || {})
            warning()
        },
    })





    const submit=()=>{
        mutation.mutate({
            amount,
            title:data.title,
            type:data.type,
            employee,
            item:data.id,
        })
    }



    return (
        <>
            <td className='text-xs text-light p-5 cursor-pointer text-teal-800' onClick={openModal}>{data.title}</td>
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
                                    Adjust employee {data.type}
                                </Dialog.Title>
                                <div className="mt-5">
                                    <div>
                                        <label>
                                            <span className="block text-xs mb-3">Salary type</span>
                                            <input
                                                type="text"
                                                placeholder={'Salary Type'}
                                                name={'title'}
                                                value={data.title}
                                                disabled
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

                                    <div className='mt-10'>
                                        <label>
                                            <span className="block text-xs mb-3">Amount</span>
                                            <input
                                                type="text"
                                                placeholder={'Amount'}
                                                name={'amount'}
                                                value={amount}
                                                onChange={val=>setAmount(val.target.value)}
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
