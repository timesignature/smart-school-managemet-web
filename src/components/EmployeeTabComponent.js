import { Tab } from '@headlessui/react'
import EmployeeEditComponent from "./EmployeeEditComponent";
import FamilyComponent from "./FamilyComponent";
import EducationComponent from "./EducationComponent";
import SalaryComponent from "./SalaryComponent";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function EmployeeTabComponent() {

    return (
        <div>
            <Tab.Group>
                <Tab.List className="flex items-center border-b border-gray-200 text-xs">
                    <Tab
                        key={'profile'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Overview
                    </Tab>

                    <Tab
                        key={'family'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Family
                    </Tab>

                    <Tab
                        key={'education'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Education
                    </Tab>

                    <Tab
                        key={'salary'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Salary Details
                    </Tab>

                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        key={'profile'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none'
                        )}
                    >
                       <div className="mt-10">
                           <EmployeeEditComponent/>
                       </div>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'family'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <div className='mt-10'>
                            <span className="block text-3xl font-light text-p-100">
                                Employee Contacts
                            </span>
                           <div className="mt-10">
                               <FamilyComponent/>
                           </div>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'education'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <EducationComponent/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'salary'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <SalaryComponent/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
