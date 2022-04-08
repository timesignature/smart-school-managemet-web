import {useQuery} from "react-query";
import http from "../http";

export default function useFees(id){
    return useQuery([`fees`,id],()=>http.get(`/fees/${id}`).then(res=>res.data))
}
