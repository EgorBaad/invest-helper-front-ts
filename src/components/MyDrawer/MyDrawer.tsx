/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const MenuButton = styled(Button)`
  width: 100%;
  justify-content: left;
  -webkit-justify-content: left;

  a {
    text-decoration: none;
  }

  svg {
    vertical-align: middle;
  }
`;

const MenuItem = styled(Link)`
  width: 100%;
`

const Expander = styled(Button)`
  font-weight: 700;
  margin: 6px;
  text-align: left;
  width: min-content;
`;

const ChangeViewIcon = styled(ChangeCircleOutlinedIcon)`
  position: absolute;
  top: 1.2em;
  left: 2.5em;
`;

interface IMyDrawerProps {
  text: string;
  className?: string;
}

export default function MyDrawer(props: IMyDrawerProps) {
  const [isDrawn, setIsDrawn] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawn(open);
  };

  return (
    <div className={props.className}>
      <Expander variant="contained" onClick={toggleDrawer(true)}>
        {props.text} <ChangeViewIcon />
      </Expander>
      <Drawer anchor={"left"} open={isDrawn} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem>
              <MenuItem to="/">
                <MenuButton>
                  <HomeOutlinedIcon />
                  {"Home"}
                </MenuButton>
              </MenuItem>
            </ListItem>
            <ListItem>
              <MenuItem to="/portfolio">
                <MenuButton>
                  <CasesOutlinedIcon />
                  {"Portfolio"}
                </MenuButton>
              </MenuItem>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
