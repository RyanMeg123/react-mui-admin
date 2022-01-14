import React from 'react'
import { Box, styled} from '@mui/system'
import { Button } from '@mui/material'

import Search from './components/search'
import Table from './components/table'

const RegisterRoot = styled('div')(({theme}) => ({
    margin: '30px',
}))

const StyledButton = styled(Button)(({theme}) => ({
    margin: theme.spacing(1)
}))

const BtnContent = styled('div')(() =>({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '40px 0'
}))


const  Register  = () => {
    return (
        <>
          <RegisterRoot>
              <Search/>
              <BtnContent>
              <StyledButton variant="contained" color="primary">
                    查询
                </StyledButton>

                <StyledButton variant="contained" color="secondary">
                    下载数据
                </StyledButton>
                <StyledButton variant="contained" color="inherit">
                    重置
                </StyledButton>
        
              </BtnContent>
              <Table/>
          </RegisterRoot>
        </>
    )
}

export default Register;
