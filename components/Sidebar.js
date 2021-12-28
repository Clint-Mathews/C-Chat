import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChatIcon from "@material-ui/icons/Chat";
import * as EmailValidator from "email-validator";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import {
  doc,
  setDoc,
  query,
  where,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../Auth";
import Friends from "./Friends";
import FadeMenu from "./FadeMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import { hide } from "../utils/reducer/showHideSidebarSlice";
import { useDispatch } from "react-redux";
function Sidebar() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [chat, setChat] = useState([]);
  const chatsCollectionRef = collection(db, "chats");
  const userChatRef = query(
    chatsCollectionRef,
    where("users", "array-contains", currentUser?.email)
  );
  async function getChat() {
    const usersSnapshot = await getDocs(userChatRef);
    const chatData = usersSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp?.toDate().getTime(),
    }));
    setChat(chatData);
  }
  useEffect(() => {
    getChat();
  }, []);

  const createChat = async () => {
    const input = prompt("Enter an email you want to chat with ?");
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !(await checkChatExist(input)) &&
      input !== currentUser.email
    ) {
      await setDoc(doc(chatsCollectionRef), {
        users: [currentUser.email, input],
      });
      await getChat();
      dispatch(hide());
    } else {
      console.log("Enter valid or non duplicate email");
    }
  };
  async function checkChatExist(recipientEmail) {
    return await getDocs(userChatRef).then((chatsSnap) => {
      return !!chatsSnap?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0
      );
    });
  }

  return (
    <Container>
      <HeadMain>
        <Header>
          <div
            onClick={() => {
              dispatch(hide());
              router.replace("/");
            }}
          >
            <UserAvatar src={currentUser.photoURL} />
          </div>
          <IconsContainer>
            <IconButton onClick={createChat}>
              <ChatIcon />
            </IconButton>
            <FadeMenu />
          </IconsContainer>
        </Header>

        <SideBarSeperator>CHATS</SideBarSeperator>
      </HeadMain>
      {/* list of chats will be here */}
      {chat.map((chat) => (
        <Chat key={chat.id} currentUser={currentUser} chat={chat} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  height: 100vh;
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  min-width: 300px;
  min-height: 350px;
  overflow-y: scroll;
  // Hide scroll bar
  ::-webkit-scrollbar {
    display: none;
  }
  -ns-overflow-stlye: none;
  scrollbar-width: none;
`;
const HeadMain = styled.div`
  position: sticky;
  z-index: 1;
  top: 0;
`;
//Since we need it to stay at top
const Header = styled.div`
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  // Opacity so that on hover it shows a higlight effect
  :hover {
    opacity: 0.8;
  }
`;

const SideBarSeperator = styled.div`
  width: 100%;
  background-color: white;
  padding: 8px;
  text-align: center;
  font-weight: 500;
  //Increase priority of rule
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const IconsContainer = styled.div``;
