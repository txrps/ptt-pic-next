"use client";
import React, { useState, MouseEvent } from 'react';
import { ApiAuthentication } from "@/enum/api";
import { APIStatusCode } from "@/enum/enum";
import { SecureStorage } from "@/lib";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosFn, FnDialog, usefnFail } from '@/lib/useAxios';

export const useLoginBypass = () => {
    const DialogFn = FnDialog();
    const Router = useRouter();

    const [isIconEye, setIsIconEye] = useState(false);

    const form = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all",
    });

    const handleClickShowSecuredCode = () => setIsIconEye((show) => !show);
    const handleMouseDownSecuredCode = (event) => {
        event.preventDefault();
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13 || event.keyCode === 9) {
            setTimeout(() => {form.setError('sUsername', { type: 'required' }, { shouldFocus: true, }); }, 300);
        }
        else if (event.key === "Enter") {
            let sSecuredCode = form.getValues("sSecureCode");
            if (sSecuredCode) {
                onLogin();
            } else {
                form.setError('sSecureCode', { type: 'required' }, { shouldFocus: true, });
            }                                                    
        }
    };    

    const onLoginFailed = (value) => {
        console.log("Failed", value);
    }

    const onLogin = () => {
        DialogFn.BlockUI();
        let oParam = {
            sUsername: form.getValues("sUsername"),
            sSecureCode: form.getValues("sSecureCode"),
            sMode: "Bypass", // AzureAD = Login AzureAD | Bypass = Login Bypass | Auto = Login Auto (Link Email) | Multi = Login Multi Tab | Azure AD B2C
            sToken: null,
            sLink: null,
        };
        DialogFn.BlockUI();
        AxiosFn.Post(ApiAuthentication.Login, oParam, usefnLoginSuccess(DialogFn, Router), usefnFail({ DialogFn }));
    };   

    return { form, isIconEye, handleClickShowSecuredCode, handleMouseDownSecuredCode, onLogin, handleKeyPress, onLoginFailed };
};

// Define usefnLoginSuccess function
export const usefnLoginSuccess = (DialogFn, Router) => (result) => {
    DialogFn.UnBlockUI();
    if (result.nStatusCode === APIStatusCode.Success && result.sToken !== null) {
        SecureStorage.Set(process.env.NEXT_PUBLIC_APP_JWT_KEY, result.sToken);
        window.location.href = "/";
        // let objUser: IAvatar = GetUserAccout();
        // Router.push('/', { scroll: false });
    } else if (result.nStatusCode === APIStatusCode.Warning) {
        DialogFn.Warning(result.sMessage);
    }
    return {};
};