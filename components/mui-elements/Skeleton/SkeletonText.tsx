import { Skeleton } from '@mui/material';
import React from 'react'

interface ISkeletonRound {
    fontSize: string,
}

const SkeletonRound = (props: ISkeletonRound) => {
    const { fontSize } = props;
    return (
        <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: fontSize }}
        />
    )
}

export default SkeletonRound