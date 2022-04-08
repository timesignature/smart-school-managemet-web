import {useQuery} from "react-query";
import http from "../http";

export default function useSchools(){
    return useQuery([`schools`],()=>http.get(`/school`).then(res=>res.data))
}
