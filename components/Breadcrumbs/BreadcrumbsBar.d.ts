export interface IBreadcrumb {
    Item?: IBreadcrumbItem[];
    isFrontEnd?: boolean;
    isFrontEndProject?: boolean;
}

export interface IBreadcrumbItem {
    nMenuID: number;
    sMenuName?: string;
    sRoute?: string;
    nLevel?: number;
    sIcon?: string;
}

