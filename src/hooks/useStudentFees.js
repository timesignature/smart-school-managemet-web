import {useQuery} from "react-query";
import http from "../http";

export default function useStudentFees(id){
    return useQuery(['fees','student',id],()=>http.get(`fees/student/${id}`).then(res=>res.data))
}
