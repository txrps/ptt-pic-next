import { ParseHtml } from '@/lib'
import { Popover, Typography } from '@mui/material'
import React from 'react'

const RenderCellPopover = ({ anchorEl, setAnchorEl, MessagePopper }) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Typography sx={{ p: 2 }}>{ParseHtml(MessagePopper)}</Typography>
        </Popover>
    )
}
export default RenderCellPopover