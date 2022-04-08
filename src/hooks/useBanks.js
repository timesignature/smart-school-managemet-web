import {useQuery} from "react-query";
import http from "../http";

export default function useBanks(){
    return useQuery([`banks`],()=>http.get(`/banks`).then(res=>res.data))
}
