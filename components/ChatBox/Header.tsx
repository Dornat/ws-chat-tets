import React, {ReactElement} from 'react'
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import Link from 'next/link'

const Header = React.memo((): ReactElement => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" style={{flexGrow: 1}}>
          Chat Room
        </Typography>
        <Button color="inherit" endIcon={<ExitToAppIcon/>}>
          <Link href="/">
            <a>Leave Room</a>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
})

export default Header
