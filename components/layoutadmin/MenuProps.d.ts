export interface IMenu {
    Item?: IMenuItem[];
}

export interface IMenuItem {
    sKey: string;
    nMenuID: number;
    nMenuHead?: number;
    sMenuName?: string;
    nLevel?: number;
    sMenuLink?: string;
    sIcon?: string;
    lstChild?: IMenuItem[]
    nMenuType?: number;
    arrRoute?: string[];
}

