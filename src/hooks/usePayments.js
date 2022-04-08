import {useQuery} from "react-query";
import http from "../http";

export default function usePayments(id){
    return useQuery(['payments',id],()=>http.get(`/payments/${id}`).then(res=>res.data))
}
