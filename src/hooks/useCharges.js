import {useQuery} from "react-query";
import http from "../http";

export default function useCharges(){
    return useQuery([`charges`],()=>http.get(`/charges`).then(res=>res.data))
}
