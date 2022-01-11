import React from 'react'
import useSettings from 'hooks/useSettings'

const MatxLogo = ({ className }) => {
    const { settings } = useSettings()
    const theme = settings.themes[settings.activeTheme]

    return (
     <>
       <img src="/assets/images/logo.png"  style={{width: '36px',height: '36px'}}/>
     </>
    )
}

export default MatxLogo
