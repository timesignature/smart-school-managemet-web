import {useQuery} from "react-query";
import http from "../http";

export default function useDepartments(){
    return useQuery(
        ['departments'],
        ()=>http.get('/departments').then(res=>res.data)
    )
}
