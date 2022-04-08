import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {useMutation, useQueryClient} from "react-query";
import http from "../http";
import {success, warning} from "./ToastComponent";
import moment from "moment";

export default function TransactionComponent({title,isExpense}) {
    let [isOpen, setIsOpen] = useState(false)

    const [state,setState]=useState({
        description:'',
        amount:0,
        deposit:'',
        type:'',
        discount:0,
        isExpense:isExpense
    })

    const [errors,setErrors]=useState({})

    function closeModal() {
        setState({
            description:'',
            amount:0,
            deposit:'',
            type:'',
            discount:0,
            isExpense:isExpense
        })
        setErrors({})
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }



    const queryClient=useQueryClient()

    const mutation=useMutation(values=>http.post('/transactions',values).then(res=>res.data),{
        onSuccess:async(data)=>{
            await queryClient.invalidateQueries(['transactions'])
            setErrors({})
            success('Transaction has been processed successfully')
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

            <button
                type={'button'}
                onClick={openModal}
                className='text-xs bg-zinc-100 px-5 py-3 rounded-full focus:outline-none hover:bg-zinc-200'>{title}</button>

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
                                    {
                                        isExpense ? 'Process Expenses' : 'Process Incomes'
                                    }
                                </Dialog.Title>
                                <div className="mt-5">
                                    <div>
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

                                    <div className="mt-10 grid grid-cols-2 gap-5">
                                        <div>
                                            <label>
                                                <span className="block text-xs mb-3">Date</span>
                                                <input
                                                    type="date"
                                                    value={moment(Date.now().toString()).format('yyyy-MM-dd')}
                                                    readOnly
                                                    className={`inp ${errors.title ? 'border-red-600' : 'border-zinc-200'}`}
                                                />
                                            </label>
                                        </div>
                                        <div/>
                                    </div>

                                    <div className="mt-10 grid grid-cols-2 gap-5">
                                        <div>
                                            <label>
                                                <span className="block text-xs mb-3">Deposit or Withdrawal</span>
                                                <select
                                                    name={'type'}
                                                    value={state.type}
                                                    onChange={handleChange}
                                                    className={`inp ${errors.type ? 'border-red-600' : 'border-zinc-200'}`}
                                                >
                                                    <option value="">Select</option>
                                                    <option>Deposit</option>
                                                    <option>Withdrawal</option>
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

                                        <div>
                                            <label>
                                                <span className="block text-xs mb-3">Amount</span>
                                                <input
                                                    type="number"
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
                                </div>

                                <div className="mt-5 flex items-center space-x-5">
                                    <button
                                        type="button"
                                        className="btn bg-p-100 text-white"
                                        onClick={submit}
                                    >
                                        {
                                            mutation.isLoading ? 'Saving new entry' : 'Save new entry'
                                        }
                                    </button>

                                    <button onClick={closeModal} className="btn bg-zinc-100">Cancel</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
