import {useQuery} from "react-query";
import http from "../http";

export default function useTerms(){
    return useQuery([`terms`],()=>http.get(`/terms`).then(res=>res.data))
}
