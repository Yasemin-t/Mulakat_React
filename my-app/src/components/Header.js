import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {useLocation} from "react-router-dom";
function Header() {
  const location = useLocation();
  return (
    <Box sx={{flexGrow: 1}}>
      {location.pathname !== "/" && (
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="#b39ddb"
              aria-label="open drawer"
              edge="start"
              sx={{mr: 2, display: {sm: "none"}}}
            ></IconButton>

            <Button href="/Otanim" sx={{color: "#e1bee7"}}>
              Otobüs Tanımlama
            </Button>
            <Button href="/SeferTanim" sx={{color: "#e1bee7"}}>
              Sefer Tanımlama
            </Button>
            <Button href="/Coin" sx={{color: "#e1bee7"}}>
              Bilet Al
            </Button>
            <Button href="/" sx={{color: "#e1bee7"}}>
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
}

export default Header;
