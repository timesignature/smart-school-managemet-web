import {useQuery} from "react-query";
import http from "../http";

export default function useStudent(id){
    return useQuery(['student',id],()=>http.get(`/student/${id}`).then(res=>res.data))
}
