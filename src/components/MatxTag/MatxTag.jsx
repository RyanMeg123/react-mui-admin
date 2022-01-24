import react from 'react'
import { styled } from '@mui/system'
import { Box } from '@mui/material'

const TagBox = styled(Box)(() =>({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   height: '30px',
   borderRadius: '10px',
   padding: '0px 6px',
   fontSize: '16px',
   backgroundColor: 'rgba(0, 0, 0, 0.08)',
   marginLeft: '8px'
})) 

const MatxTag = (props) => {
    return (
      <TagBox>
        {props.children}
      </TagBox>
    )
}

export default MatxTag;


