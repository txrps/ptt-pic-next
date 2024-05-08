import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import Slide from '@mui/material/Slide';
import Grid from "@mui/material/Grid";

import { BtnConfirm } from "@/components/mui-elements/Button/ButtonAll";
import DescriptionIcon from '@mui/icons-material/Description';

import { FormProvider, useForm } from 'react-hook-form';
import { I18NextNs } from '@/enum/enum';
import { TextAreaItem } from '@/components/input-element/TextArea';
import { I18n } from '@/lib';

export default function ModalAddDescription(props) {

    const { IsOpen, setIsOpen, sFileName, dtRow } = props;

    const form = useForm({
        shouldFocusError: true,
        mode: "all"
    });

    const onAddDescription = React.useCallback(() => {
        dtRow.sDescription = form.getValues("sDescription");
        setIsOpen(false);
    }, [dtRow, form, setIsOpen]);


    React.useEffect(() => {
        if (IsOpen && props.sDescription) {
            form.setValue("sDescription", props.sDescription)
        }
        else {
            form.setValue("sDescription", "")
        }
    }, [IsOpen, form, props.sDescription])


    return (
        <BootstrapDialog
            onClose={() => { setIsOpen(false); }}
            TransitionComponent={Transition}
            open={IsOpen}
            maxWidth={'sm'}
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={() => { setIsOpen(false); }}>
                <Typography variant="h6" style={{ margin: 0 }}>
                    <DescriptionIcon />{" "}<b>{I18n.SetText("UploadFile.AddDescription", I18NextNs.labelComponent)}</b>
                </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Grid container justifyContent="flex-end" alignItems="center">
                    <Grid item xs={12}>
                        <Typography>
                            <b>{I18n.SetText("UploadFile.FileName", I18NextNs.labelComponent)} : </b>{sFileName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormProvider  {...form}>
                            <TextAreaItem
                                id='sDescription'
                                name='sDescription'
                                required={false}
                                label={I18n.SetText("UploadFile.Description", I18NextNs.labelComponent)}
                                maxLength={200}
                                placeholder={I18n.SetText("UploadFile.Description", I18NextNs.labelComponent)}
                                row={4}
                            />
                        </FormProvider>
                    </Grid>
                    <Grid item >
                        <BtnConfirm id='confirm-description' onClick={() => { onAddDescription() }} />
                    </Grid>
                </Grid>
            </DialogContent>
        </BootstrapDialog>
    );
}


export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, py: 1, backgroundColor: "#5197ff", color: "#ffffff" }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        p: 0,
                        color: "#ffffff",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
