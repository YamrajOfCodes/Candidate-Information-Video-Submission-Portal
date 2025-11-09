import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"


export const candidateApplyAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/apply`,data,header,header);
}

export const candidateUploadVideoAPI = async(data,candidateId)=>{
    return await commonrequest("POST",`${BASE_URL}/candidates/${candidateId}/video`,data,true,"");
}


