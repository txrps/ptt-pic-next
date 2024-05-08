"use client";

import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import SuggestionScoring from "@/components/Project/SuggestionScoring";
import AssessmentInnovation from "@/components/Project/AssessmentInnovation/AssessmentInnovation";
import { EnumGroupUser } from "@/enum/enumSystem";

export default function ProjectComponents() {

  const [isRequire, setIsRequire] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(false);
  const [disableMode, setDisableMode] = useState("text");

  const [arrDataSuggestionScoring, setArrDataSuggestionScoring] = useState([]);
  const [objDataAssessmentInnovation1, setObjDataAssessmentInnovation1] = useState(null);
  const [objDataAssessmentInnovation2, setObjDataAssessmentInnovation2] = useState(null);
  const [objDataAssessmentInnovation3, setObjDataAssessmentInnovation3] = useState(null);
  const [objDataAssessmentInnovation4, setObjDataAssessmentInnovation4] = useState(null);

  useEffect(() => {
    console.log("arrDataSuggestionScoring", arrDataSuggestionScoring);    
  }, [arrDataSuggestionScoring]);

  useEffect(() => {
    console.log("objDataAssessmentInnovation1", objDataAssessmentInnovation1);    
  }, [objDataAssessmentInnovation1]);

  useEffect(() => {
    console.log("objDataAssessmentInnovation2", objDataAssessmentInnovation2);    
  }, [objDataAssessmentInnovation2]);

  useEffect(() => {
    console.log("objDataAssessmentInnovation3", objDataAssessmentInnovation3);    
  }, [objDataAssessmentInnovation3]);

  useEffect(() => {
    console.log("objDataAssessmentInnovation4", objDataAssessmentInnovation4);    
  }, [objDataAssessmentInnovation4]);

  return (
    <Grid item container spacing={4} alignItems={"flex-start"} justifyContent={"center"} style={{ padding: '4rem' }}>
      <Grid item >
        <Button color="secondary" variant="contained" onClick={() => setIsRequire(e => !e)}>
          {isRequire ? "unrequire" : "require"}
        </Button>
      </Grid>
      <Grid item >
        <Button color="success" variant="contained" onClick={() => setIsDisable(e => !e)}>
          {isDisable ? "undisable" : "disable"}
        </Button>
      </Grid>
      <Grid item >
        <Button color="info" variant="contained" onClick={() => setDisableMode(e => e == "input" ? "text" : "input")}>
          {disableMode === "input" ? "disableMode : input" : "disableMode : text"}
        </Button>
      </Grid>
      <Grid item >
        <Button color="warning" variant="contained" onClick={() => setIsSkeleton(e => !e)}>
          {isSkeleton ? "Skeleton : True" : "Skeleton : fasle"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Grid item container spacing={1} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', borderTop: '1%' }}>
          <Grid item xs={12}>
            <SuggestionScoring
              isDisable={isDisable}
              isSkeleton={isSkeleton}
              nPicQuestionID={null}
              nQtoolID={1}
              setArrData={setArrDataSuggestionScoring}
              setnTotalScore={(nTotalScore)=> {console.log("nTotalScore", nTotalScore);}}
            />
          </Grid>
        </Grid>  
      </Grid>
      <Grid item xs={12}>
        <Grid item container spacing={1} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', borderTop: '1%' }}>
          <Grid item xs={12}><Typography variant="h6" color='purple'>Stage Innovation Committee</Typography></Grid>
          <Grid item xs={12}>
            <AssessmentInnovation
              nGroupID={EnumGroupUser.InnovationCommittee}
              nScore={80}
              isRequire={isRequire}
              isDisable={isDisable}
              disableMode={disableMode}
              isSkeleton={isSkeleton}
              nPicAssessmentInnovationID={3}
              setObjData={setObjDataAssessmentInnovation1}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item container spacing={1} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', borderTop: '1%' }}>
          <Grid item xs={12}><Typography variant="h6" color='purple'>Stage QSHE BA</Typography></Grid>
          <Grid item xs={12}>
            <AssessmentInnovation
              nGroupID={EnumGroupUser.QSHE_BA}
              nScore={80}
              isRequire={isRequire}
              isDisable={isDisable}
              disableMode={disableMode}
              isSkeleton={isSkeleton}
              nPicAssessmentInnovationID={2}
              setObjData={setObjDataAssessmentInnovation2}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item container spacing={1} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', borderTop: '1%' }}>
          <Grid item xs={12}><Typography variant="h6" color='purple'>{"Stage Self-Assessment > nPicAssessmentInnovationID = null & nScore >= 80"}</Typography></Grid>
          <Grid item xs={12}>
            <AssessmentInnovation
              nGroupID={EnumGroupUser.Administrator}
              nScore={80}
              isRequire={isRequire}
              isDisable={isDisable}
              disableMode={disableMode}
              isSkeleton={isSkeleton}
              nPicAssessmentInnovationID={null}
              setObjData={setObjDataAssessmentInnovation3}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item container spacing={1} style={{ border: '1px solid', borderStyle: "dotted", borderRadius: '12px', padding: '2em', borderTop: '1%' }}>
          <Grid item xs={12}><Typography variant="h6" color='purple'>{"Stage Self-Assessment > nPicAssessmentInnovationID = null & nScore < 80"}</Typography></Grid>
          <Grid item xs={12}>
            <AssessmentInnovation
              nGroupID={EnumGroupUser.Administrator}
              nScore={50}
              isRequire={isRequire}
              isDisable={isDisable}
              disableMode={disableMode}
              isSkeleton={isSkeleton}
              nPicAssessmentInnovationID={null}
              setObjData={setObjDataAssessmentInnovation4}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}