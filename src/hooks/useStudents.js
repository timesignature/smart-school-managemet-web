import {useQuery} from "react-query";
import http from "../http";

export default function useStudents(){
    return useQuery([`students`],()=>http.get(`/students`).then(res=>res.data))
}
