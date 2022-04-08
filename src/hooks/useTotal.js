import {useQuery} from "react-query";
import http from "../http";

export default function useTotal(id){
    return useQuery([`total`],()=>http.get(`/total/${id}`).then(res=>res.data))
}
