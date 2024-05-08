export interface DialogProps {
    open: any;
    handleClose: any;
    Title: string;
    IMGModal: string;
    isFontSite: boolean;
    Transition: any;
    lstContent: DialoglistContent[] | [];

}

export interface DialoglistContent {
    id: string;
    Name: string;
    Floor: string;
    Room: string;
    Seating: string;
}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
    colorbg?: string;
    color?: string;
    CloseColor?: string;
}

export interface PropPopUpCustom {
    IsOpen?: boolean;
    setIsOpen?: any;
    onClose?: () => void;
    onClick?: () => void;
    sMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    Title?: string;
    children: React.ReactNode,
    JsxDialogAction?: boolean;
    bgColor?: string;
    Color?: string;
    Close?: boolean;
    hiddenTitle?: boolean;
    CloseSave?: boolean;
    IsBackdropClick?: boolean;
    styles?: React.CSSProperties;
    startAdornment?: any;
    required?: boolean;
    onCustomButton?: React.ReactNode;
    CloseColor?: string;
    fullScreen?: boolean;
    isDialogTitle?: boolean;
    sTitleBtnSave?: string;
}

