import {useQuery} from "react-query";
import http from "../http";

export default function useEmployees(){
    return useQuery([`employees`],()=>http.get(`/employees`).then(res=>res.data))
}
