"use client";

import { AppBar } from "@mui/material";
import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";
import Link from "next/link";
import Box from "@mui/material/Box/Box";

export interface link {
  title: string;
  path: string;
}

const TopBar = (props: { title: string; links: link[] }) => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <RocketLaunchTwoToneIcon />
        </IconButton>
          <h4 className="text-transparent max-sm:text-black font-bold text-2xl bg-clip-text bg-gradient-to-r to-violet-600 from-emerald-600">
            {props.title}
          </h4>
        <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Box sx={{ gap: "1em", display: "flex" }}>
          {props.links.map((link) => (
            <Link key={link.title} href={link.path}>
              <span className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm max-sm:px-2 px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{link.title}</span>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
