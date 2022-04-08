import useSetting from "../hooks/useSetting";
import {url} from "../config";

export default function SlipLetterHeadComponent(){

    const {data}=useSetting()

    return (
        <div>
            {
               data && (
                   <div>
                       {
                           data.length>0 ? (
                               <div className="flex items-center justify-between py-5 border-b border-p-100">
                                    <span className="block text-xs leading-loose">
                                        {data[0].name} <br/>
                                        {data[0].address} {data[0].city}
                                    </span>
                                   <div className="w-14 h-14 rounded">
                                       <img
                                           src={`${url}/${data[0].logo}`}
                                           alt=""
                                           className='w-full h-full object-cover rounded'
                                       />
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
