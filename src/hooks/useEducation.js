import {useQuery} from "react-query";
import http from "../http";

export default function useEducation(id){
    return useQuery(['education',id],()=>http.get(`/education/${id}`).then(res=>res.data))
}
