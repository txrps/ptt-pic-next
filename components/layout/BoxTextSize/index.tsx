import React, { useEffect, useState } from "react";
import { Grid, useMediaQuery } from "@mui/material";
import "./BoxTextSize.css";


export interface IPropsBoxTextSize {
    isFrontEnd: boolean;
}

export const ProviderLayout = React.createContext(null);

const BoxTextSize = (props: IPropsBoxTextSize) => {
    const { isFrontEnd } = props;

    const [sFontSize, setsFontSize] = useState<any>(null);
    const sfontNormal = 'font-small';
    const sfontMedium = 'font-normal';
    const sfontBig = 'font-medium';

    useEffect(() => {
        handleFontSize(); //ตอนโหลดครั้งแรก และ ตอนกดย้อนกลับหน้า
    }, [])

    const handleFontSize = () => {
        let arrBtnSize: any = Array.from(document.getElementsByClassName('cBtnSize'));
        arrBtnSize.forEach(q => {
            q.className.replace('action', "");
        });

        let arrSizeHTML: any = Array.from(document.getElementsByClassName('html'));
        arrSizeHTML.forEach(q => {
            let sSize = q.classList.length > 1 ? q.classList[1] : null;
            if (sSize === sfontNormal) document.getElementById('aFontNormal').classList.add("action");
            if (sSize === sfontMedium) document.getElementById('aFontMedium').classList.add("action");
            if (sSize === sfontBig) document.getElementById('aFontBig').classList.add("action");
        });
    };

    useEffect(() => {
        if (sFontSize != null) handleAddFontSize(); //ตอนที่เปลี่ยนขนาดตัวอักษร
    }, [sFontSize])

    const handleAddFontSize = () => {
        let arrBtnSize: any = Array.from(document.getElementsByClassName('cBtnSize'));
        arrBtnSize.forEach(q => {
            q.classList.remove('action');
            if (sFontSize === q.dataset.select) q.classList.add("action");
        });

        let arrSizeHTML: any = Array.from(document.getElementsByClassName('html'));
        arrSizeHTML.forEach(q => {
            if (sFontSize !== sfontNormal) q.classList.remove(sfontNormal);
            if (sFontSize !== sfontMedium) q.classList.remove(sfontMedium);
            if (sFontSize !== sfontBig) q.classList.remove(sfontBig);
            q.classList.add(sFontSize);
        });

        setsFontSize(null);
    };


    const Layout630 = useMediaQuery('(min-width:630px)');
    const Layout900 = useMediaQuery('(min-width:900px)');

    const objProvider = React.useMemo(() => (
        {
            Layout630,
            Layout900,
        }
    ), [Layout630, Layout900]);

    return (
        <React.Fragment>
            <ProviderLayout.Provider
                value={objProvider}
            >
                <Grid className={isFrontEnd === true ? Layout630 ? "boxTopMenuFrontEnd div-blur" : "boxTopMenuFrontEndPhone div-blur" : "boxTopMenu div-blur"} >
                    <Grid className={isFrontEnd === true ? "boxRightFrontEnd" : "boxLeft"} >
                        <Grid className={isFrontEnd === true ?  "ctrlFontSizeFrontEnd" : "ctrlFontSize"}>
                            {/* Text Size = ขนาดตัวอักษร*/}
                            <Grid className={isFrontEnd === true ? "textFrontSizeFrontEnd" : "textFrontSize"}>ขนาดตัวอักษร</Grid>

                            {/* A = ก */}
                            <Grid className={isFrontEnd === true ? "boxListFrontEnd" : "boxList"}>
                                {/* className="action" */}
                                <a className="cBtnSize" data-select="font-small" id={"aFontNormal"} onClick={() => { setsFontSize("font-small"); }} >ก</a>
                                <a className="cBtnSize" data-select="font-normal" id={"aFontMedium"} onClick={() => { setsFontSize("font-normal"); }} >ก</a>
                                <a className="cBtnSize" data-select="font-medium" id={"aFontBig"} onClick={() => { setsFontSize("font-medium"); }} >ก</a>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ProviderLayout.Provider>
        </React.Fragment>
    )
}
export default BoxTextSize;
