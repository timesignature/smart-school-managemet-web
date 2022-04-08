import { Tab } from '@headlessui/react'
import StudentEditComponent from "./StudentEditComponent";
import ParentEditComponent from "./ParentEditComponent";
import BursaryComponent from "./BursaryComponent";
import FeeComponent from "./FeeComponent";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function StudentTabComponent() {

    return (
        <div className='mt-10'>
            <Tab.Group>
                <Tab.List className="flex items-center border-b border-gray-200 text-xs">
                    <Tab
                        key={'student'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Student
                    </Tab>


                    <Tab
                        key={'fees'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Fees
                    </Tab>

                    <Tab
                        key={'bursary'}
                        className={({ selected }) =>
                            classNames(
                                'py-3 px-5 focus:outline-none',
                                selected
                                    ? 'border-b border-p-100'
                                    : ''
                            )
                        }
                    >
                        Bursary
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        key={'student'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none'
                        )}
                    >
                        <StudentEditComponent/>
                    </Tab.Panel>


                    <Tab.Panel
                        key={'fees'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <FeeComponent/>
                    </Tab.Panel>

                    <Tab.Panel
                        key={'bursary'}
                        className={classNames(
                            'bg-white p-3',
                            'focus:outline-none '
                        )}
                    >
                        <BursaryComponent/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
