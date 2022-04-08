import {useQuery} from "react-query";
import http from "../http";

export default function useTotalExpenses(){
    return useQuery([`total_expenses`],()=>http.get(`/expenses`).then(res=>res.data))
}
