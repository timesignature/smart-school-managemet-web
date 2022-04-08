import {useQuery} from "react-query";
import http from "../http";

export default function usePayroll(){
    return useQuery([],()=>http.get('/payroll').then(res=>res.data))
}
