import React,{useState, useEffect} from 'react'
import Brand from '../../Brand/Brand'
import { convertHexToRGB } from 'utils'
import { Box, styled, useTheme } from '@mui/system'
import Sidenav from '../../Sidenav/Sidenav'
import useSettings from 'hooks/useSettings'
import { Switch, Hidden,Autocomplete,TextField } from '@mui/material'
import { themeShadows } from '../../MatxTheme/themeColors'
import { sidenavCompactWidth, sideNavWidth } from 'utils/constant'
import { useDispatch,useSelector } from 'react-redux'
import { matchSorter } from 'match-sorter'
import { setCurrentGameCode,setCurrentLanguagesList,setCurrentGameItem } from 'redux/actions/GameSettingActions'

const SidebarNavRoot = styled(Box)(({ theme, width, primaryBg, bgImgURL }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: width,
    boxShadow: themeShadows[8],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    zIndex: 111,
    overflow: 'hidden',
    color: theme.palette.text.primary,
    transition: 'all 250ms ease-in-out',
    backgroundImage: `linear-gradient(to bottom, rgba(${primaryBg}, 0.96), rgba(${primaryBg}, 0.96)), url(${bgImgURL})`,
    '&:hover': {
        width: sideNavWidth,
        '& .sidenavHoverShow': {
            display: 'block',
        },
        '& .compactNavItem': {
            width: '100%',
            maxWidth: '100%',
            '& .nav-bullet': {
                display: 'block',
            },
            '& .nav-bullet-text': {
                display: 'none',
            },
        },
    },
}))

const NavListBox = styled(Box)(() => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

const AutoBox = styled(Box)(() => ({
    display: 'flex',
    marginBottom: '10px',
    '& .MuiAutocomplete-popper .MuiPaper-root' : {
        color: '#222A45',
        background: '#fff'
    },
}))

const Layout1Sidenav = () => {
    const theme = useTheme()
    const { settings, updateSettings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode, bgImgURL } = leftSidebar
    const dispatch = useDispatch()
    const gameList = useSelector((state) => {
          console.log(state,'statestatestatestate')
          return state.gameSetting.gameList
    })
    
    const currentGameCode = useSelector((state) => {
        return state.gameSetting.currentGameCode
    })

    const getSidenavWidth = () => {
        switch (mode) {
            case 'compact':
                return sidenavCompactWidth
            default:
                return sideNavWidth
        }
    }
    const primaryRGB = convertHexToRGB(theme.palette.primary.main)

    const updateSidebarMode = (sidebarSettings) => {
        updateSettings({
            layout1Settings: {
                leftSidebar: {
                    ...sidebarSettings,
                },
            },
        })
    }

    const handleSidenavToggle = () => {
        updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' })
    }

    const handleAutocompleteChange = (event,newValue) => {
        console.log(event, newValue,'valueNew')
        setAutoValue(newValue)
        dispatch(setCurrentGameCode(newValue.code))
        dispatch(setCurrentLanguagesList(newValue.languages))
        dispatch(setCurrentGameItem(newValue))
        window.localStorage.setItem('gameCode',newValue.code)
    }

    const [options,setOptions] = useState([])
    const [autoValue, setAutoValue] = useState(null)
    
    const filterOptions = (gameList,{inputValue}) =>  matchSorter(gameList,inputValue, {keys: ['name', 'publish_name','name_pinyin','code']})


    useEffect(() => {
    console.log(gameList)
    setAutoValue(gameList[0])

    },[gameList])

    return (
        <SidebarNavRoot
            bgImgURL={bgImgURL}
            primaryBg={primaryRGB}
            width={getSidenavWidth()}
        >
            <NavListBox>
                <Brand>
                    <Hidden smDown>
                        <Switch
                            onChange={handleSidenavToggle}
                            checked={leftSidebar.mode !== 'full'}
                            color="secondary"
                            size="small"
                        />
                    </Hidden>
                </Brand>
                <AutoBox>
                <Autocomplete
                    variant="dashed"
                    value={autoValue}
                    disablePortal
                    id="combo-box-demo"
                    options={gameList}
                    onChange={(event,newValue) => {handleAutocompleteChange(event,newValue)}}
                    filterOptions={filterOptions}
                    getOptionLabel={(option) => option.name}
                    sx={{ 
                        width: '100%',
                        padding: '0 5px',
                        '& .MuiOutlinedInput-notchedOutline': {
                         borderColor: '#fff !important',
                        },
                        '& .MuiAutocomplete-popper' : {
                         '& .MuiPaper-root-MuiAutocomplete-paper' : {
                            backgroundColor: '#fff',
                            color: '#222A45',
                         }
                        }
                     }}
                    renderInput={(params) => <TextField {...params} label="游戏"  sx={{ 
                        '& .Mui-focused' : {
                            color: '#fff !important'
                        },
                        '& .MuiAutocomplete-endAdornment .MuiAutocomplete-clearIndicator' : {
                              color: '#fff'
                        },
                        '& .MuiAutocomplete-endAdornment .MuiAutocomplete-popupIndicator' : {
                              color: '#fff'
                        }
                     }}/>}
                   />
               </AutoBox>
                <Sidenav />
            </NavListBox>
        </SidebarNavRoot>
    )
}

export default React.memo(Layout1Sidenav)
