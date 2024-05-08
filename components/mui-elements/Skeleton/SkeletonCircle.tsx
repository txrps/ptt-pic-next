import { Skeleton } from '@mui/material';
import React from 'react'

interface ISkeletonCircle{
    size : number
}

const SkeletonCircle = (props : ISkeletonCircle) => {
    const {size} = props;
    return (
        <Skeleton 
            variant="circular" 
            animation="wave"
            width={size} 
            height={size} 
        />
    )
}

export default SkeletonCircle