import { Skeleton, Typography } from '@mui/material'
import React from 'react'

interface IText {
  children: React.ReactNode;
  align?: 'center' | 'left' | 'right'
  className? : string;
  IsSkeleton?: boolean;
  variant?: 'body1'
  | 'body2'
  | 'button'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2',
  // disabled: boolean;
}

const Text = (props: IText) => {
  const { children, IsSkeleton = false, variant = 'body1' ,align,className} = props;
  return (
    <Typography className={className} variant={variant} align={align} gutterBottom>
      {IsSkeleton ? <Skeleton /> : children}
     </Typography>
  )
}

export default Text