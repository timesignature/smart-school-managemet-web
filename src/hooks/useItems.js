import {useQuery} from "react-query";
import http from "../http";

export default function useItems(){
    return useQuery(['items'],()=>http.get('/items').then(res=>res.data))
}
