import {useQuery} from "react-query";
import http from "../http";

export default function useTotalFromFees(){
    return useQuery([`total_from_fees`],()=>http.get(`/income_from_fees`).then(res=>res.data))
}
