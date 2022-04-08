import {useQuery} from "react-query";
import http from "../http";

export default function useSlip(id){
    return useQuery(['slip',id],()=>http.get(`/slip/${id}`).then(res=>res.data))
}
