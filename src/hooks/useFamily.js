import {useQuery} from "react-query";
import http from "../http";

export default function useFamily(id){
    return useQuery(['families',id],()=>http.get(`/families/${id}`).then(res=>res.data))
}
