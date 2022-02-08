import React,{Suspense} from 'react'
import { Small } from "../Typography"
import { styled, useTheme } from '@mui/system'
import { Grid, Typography } from '@mui/material'
const LinearProgress = React.lazy(() => import('@mui/material/LinearProgress'))

const CustomLinearProgress = styled(LinearProgress)(() => ({
    borderRadius: 2,
    background: 'rgba(0, 0, 0, 0.1)',
}))

const MatxProgressBar = ({
    value = 75,
    color = 'primary',
    text = '',
    spacing = 2,
    coloredText = false,
}) => {
    const theme = useTheme()
    const secondary = theme.palette.text.secondary

    return (
        <Grid
            container
            spacing={spacing}
            alignItems="center"
        >
            <Grid item xs={text ? 8 : 12}>
            <Suspense fallback={<div>Loading...</div>}>
                <CustomLinearProgress
                    color={color}
                    value={value}
                    variant="determinate"
                ></CustomLinearProgress>
                </Suspense>
            </Grid>
            {text !== '' && (
                <Grid item xs={text ? 4 : false}>
                    <Typography color={color}>
                        <Small sx={{ color: coloredText ? '' : secondary }}>
                            {text}
                        </Small>
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default MatxProgressBar
