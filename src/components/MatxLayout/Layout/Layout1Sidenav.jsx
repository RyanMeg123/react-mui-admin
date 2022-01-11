import React,{useState, useEffect} from 'react'
import Brand from '../../Brand/Brand'
import { convertHexToRGB } from 'utils'
import { Box, styled, useTheme } from '@mui/system'
import Sidenav from '../../Sidenav/Sidenav'
import useSettings from 'hooks/useSettings'
import { Switch, Hidden,Autocomplete,TextField } from '@mui/material'
import { themeShadows } from '../../MatxTheme/themeColors'
import { sidenavCompactWidth, sideNavWidth } from 'utils/constant'

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

    const [options,setOptions] = useState([])


    useEffect(() => {
        setOptions([{ label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },])
    },[])

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
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ 
                        width: '100%',
                        '& .MuiOutlinedInput-notchedOutline': {
                         borderColor: '#fff !important',
                        },
                          '& .MuiAutocomplete-popper' : {
        '& .MuiPaper-root-MuiAutocomplete-paper' : {
            backgroundColor: '#fff',
            color: '#222A45'
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
