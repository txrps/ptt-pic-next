"use client";

import React, { createContext, useMemo } from "react";
import { Grid } from "@mui/material";
import { BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { useManageAssessmentInnovationStageAll } from "@/hooks/Admin/Questionnaire/useManageAssessmentInnovation";
import ManageAssessmentInnovationStage1 from "./_component/Stage1";
import ManageAssessmentInnovationStage2 from "./_component/Stage2";

const ManageAssessmentInnovationContext = createContext(null);
const ManageAssessmentInnovation = () => {

    const {
        nAssessmentInnovationID, 
        setNAssessmentInnovationID, 
        handleSaveDateStageAll, 
        setLstDataStage1, 
        setLstDataStage2, 
        setNMinScore, 
        setNMaxScore,
        isDisable, 
        isSkeleton, 
        disableMode
    } = useManageAssessmentInnovationStageAll();

    return(
        <ManageAssessmentInnovationContext.Provider
            value={useMemo(() => ({
                nAssessmentInnovationID: nAssessmentInnovationID, 
                setNAssessmentInnovationID: setNAssessmentInnovationID, 
                setLstDataStage1: setLstDataStage1, 
                setLstDataStage2: setLstDataStage2, 
                setNMinScore: setNMinScore, 
                setNMaxScore: setNMaxScore,
                isDisable: isDisable, 
                isSkeleton: isSkeleton, 
                disableMode: disableMode
            }), 
            [
                nAssessmentInnovationID, 
                setNAssessmentInnovationID,
                setLstDataStage1,
                setLstDataStage2,
                setNMinScore,
                setNMaxScore,
                isDisable, 
                isSkeleton, 
                disableMode
            ])} 
        >
            <Grid item xs={12} md={12} container spacing={4} justifyContent={'flex-start'}>
                <Grid item xs={12}>        
                    <ManageAssessmentInnovationStage1 />
                </Grid>
                <Grid item xs={12}>                    
                    <ManageAssessmentInnovationStage2 />
                </Grid>
                <Grid item xs={12} container spacing={2} justifyContent={"center"} alignItems={"start"} style={{ borderBottom: '2%'}}>
                    <Grid item>
                        <BtnSave 
                            id="BtnSubmit_ManageAssessmentInnovation" 
                            txt="Save All" 
                            bgColor={"#336ba6"}
                            bgColorHover={"#306297"}
                            onClick={(e)=> { handleSaveDateStageAll()}} 
                        />
                    </Grid>
                </Grid>
            </Grid>
        </ManageAssessmentInnovationContext.Provider>
    );
}
export default ManageAssessmentInnovation;
export { ManageAssessmentInnovationContext };
