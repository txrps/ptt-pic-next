import { Skeleton } from '@mui/material';
import React from 'react'

interface ISkeletonRound {
    height: string | number,
    width: string | number
}

const SkeletonRound = (props: ISkeletonRound) => {
    const { height, width } = props;
    return (
        <Skeleton
            variant="rounded"
            animation="wave"
            width={width}
            height={height}
        />
    )
}

export default SkeletonRound