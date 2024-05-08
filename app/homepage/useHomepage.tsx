import { AxiosFn } from "@/lib/useAxios";
import { Grid, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import pichome1 from '@/public/assets/images/logo/pic-home1.png'
import pichome2 from '@/public/assets/images/logo/pic-home2.png'
import pichome3 from '@/public/assets/images/logo/pic-home3.png'
import pichome4 from '@/public/assets/images/logo/pic-home4.png'
import pichome5 from '@/public/assets/images/logo/pic-home5.png'
import Image from 'next/image'
import { ApiHome } from "@/enum/api";
import { StmImageLoader } from "@/lib";

import { useRouter } from 'next/navigation';
import Link from "next/link";

export const useHomePage = () => {

  const router = useRouter();
  const [arrMenu, setArrMenu] = useState([]);

  useEffect(() => {
    onGetInitialTable();
  }, []);

  const onGetInitialTable = () => {
    AxiosFn.Get(ApiHome.GetMenuCard, {}, (res) => { setArrMenu(res.arrCard); });
  }

  const LayoutWebPC = useMediaQuery('(min-width:1400px)');
  const LayoutipadPro = useMediaQuery('(min-width:1336px)');
  const LayoutWeb = useMediaQuery('(min-width:1180px)');
  const Layoutipad = useMediaQuery('(min-width:769px)');
  const Layoutipadmini = useMediaQuery('(min-width:768px)');
  const LayoutPro = useMediaQuery('(min-width:1024px)');

  const DataMenu = (m) => {
    return (
      <Grid item xs={LayoutWeb || LayoutPro ? 4 : (Layoutipad || Layoutipadmini) ? 6 : 12} key={m.nID}>
        <Grid container justifyContent={"center"} alignItems={"center"}>   
          <div className={LayoutWeb ? "card" : Layoutipadmini ? "card-ipad-mini" : "card-ipad"}>
            <Link href={!m.isDisable ? m.sUrl : "#"} style={{ textDecoration: 'none' }}>
              {m.nNotify !== 0 && <button className="button">{m.nNotify}</button>}
              <Image
                src={m.nID === 1 ? pichome1 : m.nID === 2 ? pichome2 : m.nID === 3 ? pichome3 : m.nID === 4 ? pichome4 : m.nID === 5 ? pichome5 : null}
                alt={''}
                className={LayoutWeb ? "card-img" : "card-img-ipad"}
                loader={StmImageLoader}
              />
              <div className="card-details">
                <div className="text-title">{m.sTitle}</div>
                <div className="text-body">{m.sDescription}</div>
              </div>
            </Link>
            {!m.isDisable && 
              <button
                className="card-button" 
                onClick={(e)=> { 
                  router.push(m.sUrl, { scroll: false });
                }}
              >คลิก</button>
            }
          </div>
        </Grid>
      </Grid>
    )
  }

  return {
    onGetInitialTable,
    arrMenu,
    LayoutWebPC,
    LayoutipadPro,
    LayoutWeb,
    Layoutipad,
    Layoutipadmini,
    LayoutPro,
    DataMenu
  }
}