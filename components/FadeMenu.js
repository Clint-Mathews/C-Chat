import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { hide } from "../utils/reducer/showHideSidebarSlice";
import { useDispatch } from "react-redux";
function FadeMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (check) => {
    setAnchorEl(null);
    if (check === 3) {
      router.push("/", undefined, { shallow: true });
      auth.signOut();
    } else if (check === 2) {
      router.replace(`/profile`);
    }
  };

  return (
    <>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={() => handleClose(1)}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            dispatch(hide());
            handleClose(2);
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(hide());
            handleClose(3);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default FadeMenu;
