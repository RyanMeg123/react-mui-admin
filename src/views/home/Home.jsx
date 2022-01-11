import React from 'react'
import {
    Box,
    styled
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { House}  from '../../components'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center'
}))

const JustifyBox = styled(FlexBox)(() => ({
    maxWidth: 320,
    flexDirection: 'column',
    justifyContent: 'center',
}))
const HomeRoot = styled(FlexBox)(() => ({
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh !important',
}))
const Home = () => {
    return (
        <HomeRoot>
             <JustifyBox>
              <House></House>
             </JustifyBox>
        </HomeRoot>
    )
}
export default Home;