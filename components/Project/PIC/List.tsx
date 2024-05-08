import { usePicList } from '@/hooks/Project/PIC/usePicList';
import { FormProvider, useForm } from "react-hook-form";
import { Button, Grid, Typography, InputAdornment } from "@mui/material";
import STTable, { initRows } from '@/components/STTable/STTable';
import { Text } from '@/components/mui-elements/TextMui';
const PicList = (Mode) => {
  const {
    form, datarow, loadding, setDataRow, dataColumn, filter, getTable, ApproveDate, RegisterDate, Kpi, Year, isAdd
  } = usePicList(Mode);

  return [
    <FormProvider {...form}>
        <Grid container>
        <Grid item xs={6} container justifyContent={"flex-start"}>
      <Text variant='body2'>หมายเหตุ : 1. การรายงาน PIC Result ของปี {Year} จะต้อง Approve ให้แล้วเสร็จ </Text><Text variant='body2' className='cDanger'>ภายในวันที่ {RegisterDate}</Text>
      </Grid>
      <Grid item xs={6} container justifyContent={"flex-end"}>
      <Text variant='body2'>หน่วยงานของท่าน : </Text><Text variant='body2' className='cDanger'>ไม่ผ่านเป้าหมาย</Text>
      </Grid>
      <Grid item xs={12} container justifyContent={"flex-start"} paddingLeft={"66px"}>
      <Text variant='body2'>2. การ Register หลังวันที่ </Text><Text variant='body2' className='cInfo'>{ApproveDate} จะถูกวัดผลในปี 2025</Text>
      </Grid>
      <Grid item xs={12}>
      <STTable
            column={dataColumn}
            rows={datarow}
            isLoading={loadding}
            onLoadData={getTable}
            isMenu={true}
            filterField={filter}
            isShowCheckBox={false}
            form={form}
          />
      </Grid>
    </Grid>
      {/* <Grid item container spacing={3} xs={12} md={12} justifyContent={"center"} alignItems={"center"} alignContent={"center"} style={{ borderBottom: '1%' }}>
        <Grid xs={12}>
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            xs={6}
            >
            <Text variant='body2'>หมายเหตุ : 1. การรายงาน PIC Result ของปี 2024 จะต้อง Approve ให้แล้วเสร็จ </Text><Text variant='body2'>ภายในวันที่ 31/05/2024</Text>
          </Grid>
          <Grid container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            xs={5}
            >
            <Text variant='body2'
            
            >หน่วยงานของท่าน : </Text><Text variant='body2'>ไม่ผ่านเป้าหมาย</Text>
          </Grid>
          <Grid container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            paddingLeft={"67px"}
          >
            <Text variant='body2'>2. การ Register หลังวันที่ </Text><Text variant='body2'>31/12/2024 จะถูกวัดผลในปี 2025</Text>
          </Grid>
        </Grid>
        <Grid xs={5}>
        
          </Grid>
        <Grid xs={12}>Year : 2024</Grid>
        <Grid xs={12}>
          <STTable
            column={dataColumn}
            rows={datarow}
            isLoading={loadding}
            onLoadData={getTable}
            isMenu={true}
            filterField={filter}
            isShowCheckBox={false}
            form={form}
          />
        </Grid>
      </Grid> */}
    </FormProvider>
  ]
}

export default PicList;