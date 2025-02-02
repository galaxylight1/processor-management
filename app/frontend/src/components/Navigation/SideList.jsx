/*
 * Component that renders the List inside Sidebar
 * Side List includes quick filters such as Launched, Discontinued, Mobile Only, Desktop Only, Server Only for quick access
 */

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MonitorIcon from "@mui/icons-material/Monitor";
import StorageIcon from "@mui/icons-material/Storage";
import PieChartIcon from "@mui/icons-material/PieChart";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const styles = (theme) => ({
  listItem: {
    ".MuiButtonBase-root": {
      paddingBottom: "0.4rem",
      paddingLeft: "0.8rem",
    },
  },
  listItemBtn: {
    "&.Mui-selected": {
      "&:hover": {
        backgroundColor: "#D3D2D2",
      },
      backgroundColor: "#D3D2D2",
    },
  },
  listItemTypo: {
    sx: {
      fontSize: "0.76rem",
    },
    noWrap: true,
    color: "#6A6A6A",
  },
});

export default function SideList({ handleOnListBtnClick }) {
  const theme = useTheme();
  const currPath = window.location.pathname;

  const [listArr, setListArr] = useState([
    {
      txt: "All Processors",
      icon: <ShoppingCartIcon />,
      selected: currPath === "/" ? true : false,
    },
    { txt: "Desktop Segment", icon: <MonitorIcon />, selected: false },
    { txt: "Mobile Segment", icon: <PhoneIphoneIcon />, selected: false },
    { txt: "Server Segment", icon: <StorageIcon />, selected: false },
    {
      txt: "Launched",
      icon: <RocketLaunchIcon />,
      selected: false,
    },
    {
      txt: "Discontinued",
      icon: <LayersClearIcon />,
      selected: false,
    },
    {
      txt: "Pie Visualization",
      icon: <PieChartIcon />,
      selected: currPath === "/graph" ? true : false,
    },
  ]);

  const setSelectedInListArr = (index) => {
    const newObj = { ...listArr[index], selected: true };
    const newArr = [];
    listArr.map((item, i) => {
      if (i === index) newArr.push(newObj);
      else newArr.push({ ...item, selected: false });
    });
    setListArr(newArr);
  };

  return (
    <List sx={{ marginTop: "0.4rem" }}>
      {listArr.map((item, index) => (
        <ListItem
          key={index}
          disableGutters
          alignItems="center"
          sx={styles(theme).listItem}
        >
          <ListItemButton
            selected={item.selected}
            sx={styles(theme).listItemBtn}
            onClick={() => {
              handleOnListBtnClick(item.txt);
              setSelectedInListArr(index);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.txt}
              primaryTypographyProps={styles(theme).listItemTypo}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
