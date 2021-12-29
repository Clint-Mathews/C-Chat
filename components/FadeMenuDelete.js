import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { db } from "../firebase";
import { useRouter } from "next/router";
import { doc, deleteDoc } from "firebase/firestore";
function FadeMenuDelete({ chatId }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (check) => {
    setAnchorEl(null);
    if (check === 2) {
      // Delete Chat
      await deleteDoc(doc(db, "chats", chatId));
      router.replace("/");
    }
  };

  return (
    <>
      <IconButton
        aria-controls="fade-menu"
        aria-haspopup="true"
        style={{
          color: "var(--icon-color)",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #262a2d, #2d3236)",
          boxShadow: "8px 8px 21px #111314, -8px -8px 21px #434b50",
        }}
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
        <MenuItem onClick={() => handleClose(2)}>Delete Chat</MenuItem>
      </Menu>
    </>
  );
}

export default FadeMenuDelete;
