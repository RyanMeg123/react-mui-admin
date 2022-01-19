import React from 'react'
import { Alert } from '@mui/material'

const MatxAlert = ({
    severity = 'success',
    message,
}) => {
    return (
        <Alert severity={severity} sx={{
            position: 'absolute',
            top: '4%',
            width: '80%',
            left: '10%',
            borderRadius: '16px'
        }}>{message}</Alert>
    )
}

export default MatxAlert;