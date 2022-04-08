import {useQuery} from "react-query";
import http from "../http";

export default function useParents(){
    return useQuery(['parents'],()=>http.get('/parents').then(res=>res.data))
}
