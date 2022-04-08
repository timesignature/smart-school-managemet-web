import {useQuery} from "react-query";
import http from "../http";

export default function useTotalIncome(){
    return useQuery([`total_incomes`],()=>http.get(`/incomes`).then(res=>res.data))
}
