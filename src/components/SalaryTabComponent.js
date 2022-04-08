import { Tab } from '@headlessui/react'
import ItemListComponent from "./ItemListComponent";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SalaryTabComponent() {

    return (
        <div>
            <Tab.Group>
                <Tab.List className="flex items-center border-b border-gray-200 text-xs">
                    <Tab
                        key={'earning'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none text-xs',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Earnings
                    </Tab>

                    <Tab
                        key={'deduction'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none text-xs',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Deductions
                    </Tab>

                    <Tab
                        key={'reimbursement'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none text-xs',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Reimbursements
                    </Tab>

                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        key={'earning'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none'
                        )}
                    >
                        <ItemListComponent title={'earning'}/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'deduction'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <ItemListComponent title={'deduction'}/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'reimbursement'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <ItemListComponent title={'reimbursement'}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
