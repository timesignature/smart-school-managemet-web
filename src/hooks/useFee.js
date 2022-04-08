import {useQuery} from "react-query";
import http from "../http";

export default function useFee(id){
    return useQuery([`fee`,id],()=>http.get(`/fee/${id}`).then(res=>res.data))
}
