import useSetting from "../hooks/useSetting";
import {url} from "../config";

export default function InvoiceLetterHeadComponent(){
    const {data}=useSetting()
    return (
        <div>
            {
                data && (
                    <div>
                        {
                            data.length > 0 ? (
                                <div>
                                    <div className="flex items-center justify-between">
                                        <div className="w-1/3 h-40 p-2">
                                            <img
                                                src={`${url}/${data[0].logo}`}
                                                alt=""
                                                className='w-full h-full object-cover'
                                            />
                                        </div>

                                        <div className="w-1/3 space-y-3">
                                            <input
                                                type="text"
                                                value={data[0].address}
                                                className="focus:outline-none text-xs text-right py-3 px-2 w-full"
                                                placeholder={'Street'}
                                            />

                                            <input
                                                type="text"
                                                value={`${data[0].city}, ${data[0].state}`}
                                                className="focus:outline-none text-xs text-right py-3 px-2 w-full"
                                                placeholder={'City, State'}
                                            />

                                            <input
                                                type="text"
                                                value={data[0].country}
                                                className="focus:outline-none text-xs text-right py-3 px-2 w-full"
                                                placeholder={'Country'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <span className="block text-xs bg-yellow-300 px-4 py-3">
                                        Looks like you haven't set up your company profile
                                    </span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}
