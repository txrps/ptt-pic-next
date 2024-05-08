"use client";
import React from 'react';
import { Button, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { FormProvider} from 'react-hook-form';
import { TextBoxItem } from '@/components';
import { Visibility, VisibilityOff} from "@mui/icons-material";
import { useLoginBypass } from '@/hooks/useLogin';

const LoginBypass = () => {
  const { 
    form, 
    isIconEye, 
    handleClickShowSecuredCode, 
    handleMouseDownSecuredCode, 
    onLogin,
    handleKeyPress,
    onLoginFailed,
  } = useLoginBypass();

  return (
    <Grid item container spacing={2} justifyContent={"center"} alignItems={"center"} alignContent={"center"}>
      <FormProvider {...form}>
        <Grid item container spacing={3} xs={12} md={4} justifyContent={"center"} alignItems={"center"} alignContent={"center"} style={{ borderBottom: '1%', paddingTop: '5%'}}>
          <Typography variant="h6">Login Bypass</Typography>
          <Grid item xs={12}>
            <TextBoxItem
              id={"sUsername"}
              name={"sUsername"}
              label={`UserName`}
              required={true}
              type={"text"}
              maxLength={10}
              onKeyPress={handleKeyPress}
              autoComplete="text"
              IsCharacterCount={false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextBoxItem
              id={"sSecureCode"}
              name={"sSecureCode"}
              maxLength={20}
              label={"Password"}
              required={true}
              type={isIconEye ? "text" : "password"}
              isPatternPassword={false} //true
              endAdornment={ 
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowSecuredCode}
                    onMouseDown={handleMouseDownSecuredCode}
                    edge="end"
                  >
                    {isIconEye ? <VisibilityOff style={{color:'#202178'}} /> : <Visibility style={{color:'#202178'}}/>}
                  </IconButton>
                </InputAdornment>
              }              
              autoComplete="new-password"
              IsCharacterCount={false}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  form.handleSubmit(onLogin, onLoginFailed)(e);
                }
              }}
            />
          </Grid>
          <Grid item container spacing={4} justifyContent={"flex-end"} alignItems={"flex-end"} alignContent={"flex-end"}>
            <Grid item>
              <Button 
                id="btnLogin" 
                color="primary" 
                variant="contained" 
                // onClick={form.handleSubmit((e) => { onLogin(); }, (e) => { console.log("error", e) })}
                onClick={form.handleSubmit(onLogin)}
              > LOGIN
              </Button>
            </Grid>
          </Grid> 
        </Grid>
      </FormProvider>
    </Grid>
  )
};

export default LoginBypass;