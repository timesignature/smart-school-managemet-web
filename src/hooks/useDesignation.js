import {useQuery} from "react-query";
import http from "../http";

export default function useDesignation(){
    return useQuery(
        ['designation'],
        ()=>http.get('/designation').then(res=>res.data)
    )
}
