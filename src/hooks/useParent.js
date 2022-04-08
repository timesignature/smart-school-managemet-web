import {useQuery} from "react-query";
import http from "../http";

export default function useParent(id){
    return useQuery(['parent',id],()=>http.get(`/parent/${id}`).then(res=>res.data))
}
