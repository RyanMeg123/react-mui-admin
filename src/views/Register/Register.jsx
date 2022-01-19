import React, { useEffect, useState } from 'react'
import { Box, styled} from '@mui/system'
import { Button,Alert,Snackbar,Slide } from '@mui/material'

import Search from './components/search'
import Table from './components/table'
import { preRegister,download } from 'api/index'
import { useSelector } from 'react-redux'
import { downLoadFile } from 'utils/index'
import dayjs from 'dayjs'
import { PreRegister} from 'react-ea-components'

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

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}



const  Register  = () => {
  const gameCode = useSelector(state => {
    return state.gameSetting.currentGameCode
      ? state.gameSetting.currentGameCode
      : window.localStorage.getItem("gameCode");
  });

  const [dataList, setDataList] = useState([])

  const [dataTotal, setDataTotal] = useState(0)

  const [open, setOpen] = useState(false)

  const [state,setState] = useState({
  })

  useEffect(() => {
    const getTableList = async() => {
     let params = {
         gameCode: gameCode,
         pageNumber: 1,
         orderField: 'regTime',
         orderType: 'desc'
     }
     const res =  await preRegister(params)
     console.log(res,'这是tableList')
     const { users,total } = res.data
     setDataList(users)
     setDataTotal(total)

    }
    getTableList()
  },[gameCode])
  const handleChange = (event) => {
    // event.persist()
    console.log(event,'event')
    setState({
        ...state,
        [event.target.name] : event.target.value
    })
  }
  const handleBeginTimeChange = (beginTime) => {
        setState({ ...state, beginTime})
  }

  const handleEndTimeChange = (endTime) => {
      console.log(dayjs(JSON.parse(JSON.stringify(endTime))).unix(),'endtime')
        setState({ ...state, endTime })
  }

  const handleAutocompleteCountryChange = (event,value) => {
      console.log(event,'rejrj')
      setState({ ...state, country: value.countryCode})
  }

  const handleAutocompleteMethodChange = (event,value) => {
      console.log(event,'rejrj')
      setState({ ...state, method: value.key})
  }

  const handleAutocompleteLanguagesChange = (event,value) => {
      console.log(event,value,'rejrj')
      setState({ ...state, lang: value.fullCode})
  }

  const handleAutocompleteDeviceChange = (event,value) => {
      console.log(event,value,'rejrj')
      setState({ ...state, device: value.key})
  }

  
  const handleBtnChange = async(isDownLoad) => {
      console.log(state,'this is state')
      let params = {
        gameCode: gameCode,
        pageNumber: 1,
        orderField: 'regTime',
        orderType: 'desc'
      }
      if (state.beginTime) {
       params = Object.assign({...params},state,{
          beginTime:  state.beginTime ? dayjs(state.beginTime).unix() : '',
       })
      }
      if (state.endTime) {
       params = Object.assign({...params},state,{
         endTime:  state.endTime ? dayjs(state.endTime).unix() : '',
       })
      }
      params = Object.assign({...params},state)
      console.log(params,'params')
      if (isDownLoad) {
        const res = await download(params);
        console.log(res,'donwLoad')
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        },1000)
        downLoadFile(res.data, gameCode);
      } else {
        const res =  await preRegister(params)
        console.log(res,'这是tableList')
        const { users,total } = res.data
        setDataList(users)
        setDataTotal(total)
      }
    
  }


    return (
        <>
          <RegisterRoot>
          {/* <PreRegister/> */}
              <Search handleChange={handleChange} state={state} handleBeginTimeChange={handleBeginTimeChange} handleEndTimeChange={handleEndTimeChange} handleAutocompleteCountryChange={handleAutocompleteCountryChange} handleAutocompleteMethodChange={handleAutocompleteMethodChange} handleAutocompleteLanguagesChange={handleAutocompleteLanguagesChange} handleAutocompleteDeviceChange={handleAutocompleteDeviceChange}/>
              <BtnContent>
                <StyledButton variant="contained" color="primary" onClick={() => handleBtnChange(false)}>
                    查询
                </StyledButton>

                <StyledButton variant="contained" color="secondary" 
                onClick={() => handleBtnChange(true)}
                 sx={{
                    color: '#fff'
                }}>
                    下载数据
                </StyledButton>
                <StyledButton variant="contained" color="inherit">
                    重置
                </StyledButton>
        
              </BtnContent>
              <Table tableData={dataList} total={dataTotal} />
          </RegisterRoot>
          <Snackbar open={open} autoHideDuration={6000}  TransitionComponent={TransitionLeft}
                key={'top,center'}>
                <Alert
                    severity="success" 
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    )
}

export default Register;
