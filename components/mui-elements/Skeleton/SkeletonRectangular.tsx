

import { Skeleton } from '@mui/material';
import React from 'react'

interface ISkeletonRectangular {
    height: number,
    width: number
}

const SkeletonRectangular = (props: ISkeletonRectangular) => {
    const { height, width } = props;
    return (
        <Skeleton
            variant="rectangular"
            animation="wave"
            width={width}
            height={height}
        />
    )
}

export default SkeletonRectangular