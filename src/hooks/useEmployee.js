import {useQuery} from "react-query";
import http from "../http";

export default function useEmployee(id){
    return useQuery([`employee`,id],()=>http.get(`/employee/${id}`).then(res=>res.data))
}
