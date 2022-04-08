import {useQuery} from "react-query";
import http from "../http";

export default function useSetting(){
    return useQuery([`settings`],()=>http.get(`/settings`).then(res=>res.data))
}
