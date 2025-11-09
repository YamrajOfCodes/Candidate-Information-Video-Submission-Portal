import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { candidateApplyAPI,candidateUploadVideoAPI } from "../../API/User/userAPI";



export const CandidateApply = createAsyncThunk("candidateApply",async(data)=>{
    try {
        const response  = await candidateApplyAPI(data.data,data.config);
        console.log(response);
        
        if(response.status==200){
            return response.data;
        }else{
            console.log("error while fetching data");
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const CandidateVideoUpload = createAsyncThunk("CandidateVideoUpload",async(data)=>{
    try {
        const response  = await candidateUploadVideoAPI(data.data,data.candidateId);
        console.log(response);
        
        if(response.status==200){
            return response.data;
        }else{
            console.log("error while fetching data");
        }
    } catch (error) {
        console.log(error);
        
    }
})












  const userSlice  = createSlice({
    name:"userSlice",
    initialState:{
        candidateapply:[],
        candiatevideo:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(CandidateApply.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(CandidateApply.fulfilled,(state,action)=>{
            state.loader = false,
            state.candidateapply = [action.payload]
        })
        .addCase(CandidateApply.rejected,(state,action)=>{
            state.error = [action.payload]
        })


         builder.addCase(CandidateVideoUpload.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(CandidateVideoUpload.fulfilled,(state,action)=>{
            state.loader = false,
            state.candiatevideo = [action.payload]
        })
        .addCase(CandidateVideoUpload.rejected,(state,action)=>{
            state.error = [action.payload]
        })



    }
})

export default userSlice.reducer;