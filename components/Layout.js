import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import { useAuth } from "../Auth";
import Avatar from "@material-ui/core/Avatar";
import { update } from "../utils/reducer/showHideSidebarSlice";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
function Layout() {
  const { currentUser } = useAuth();
  const open = useSelector((state) => state.sidebarSlice.showSidebar);
  const dispatch = useDispatch();
  const classes = useStyles();
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(update(open));
  };
  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        style={{ border: "1px solid whitesmoke" }}
      >
        <UserAvatar src={currentUser.photoURL} />
      </Button>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={clsx(classes.list, {
            [classes.fullList]: true,
          })}
          role="presentation"
        >
          <Sidebar />
        </div>
      </SwipeableDrawer>
    </>
  );
}

export default Layout;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
