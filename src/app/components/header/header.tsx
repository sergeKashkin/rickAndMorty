"use client";

import { AppBar, Icon } from "@mui/material";
import RocketLaunchTwoToneIcon from '@mui/icons-material/RocketLaunchTwoTone';
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";

const TopBar = (props: {title: string}) => {
    return <AppBar position="static" color="transparent">
        <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <RocketLaunchTwoToneIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        { props.title }
      </Typography>
    </Toolbar>
  </AppBar>
}

export default TopBar;