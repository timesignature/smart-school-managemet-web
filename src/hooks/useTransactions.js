import {useQuery} from "react-query";
import http from "../http";

export default function useTransactions(){
    return useQuery([`transactions`],()=>http.get(`/transactions`).then(res=>res.data))
}
