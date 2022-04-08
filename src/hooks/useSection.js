import {useQuery} from "react-query";
import http from "../http";

export default function useSection(){
    return useQuery(['section'],()=>http.get('/section').then(res=>res.data))
}
