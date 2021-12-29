import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
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
            {currentUser?.photoURL ? (
              <UserAvatar
                src={currentUser.photoURL}
                alt={`${currentUser.displayName} image`}
              />
            ) : (
              <UserAvatar alt={`${currentUser.displayName} image`}>
                {currentUser.displayName[0].toUpperCase()}
              </UserAvatar>
            )}
          </div>
          <IconsContainer>
            <IconButton
              style={{
                color: "var(--icon-color)",
                borderRadius: "50%",
                background: "linear-gradient(145deg, #262a2d, #2d3236)",
                boxShadow: "8px 8px 21px #111314, -8px -8px 21px #434b50",
              }}
              onClick={createChat}
              aria-label="Create chat"
            >
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
  color: white;
  height: 100vh;
  flex: 0.45;
  border-right: 1px solid var(--secondary);
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
  /* border-bottom: 1px solid whitesmoke; */
  background-color: var(--secondary);
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  /* color: var(--icon-color); */
  border-radius: 50%;
  background: linear-gradient(145deg, #262a2d, #2d3236);
  box-shadow: 8px 8px 21px #585858, -8px -8px 21px #383838;
  // Opacity so that on hover it shows a higlight effect
  :hover {
    opacity: 0.8;
  }
`;

const SideBarSeperator = styled.div`
  width: 100%;
  padding: 8px;
  text-align: center;
  font-weight: 500;
  color: var(--icon-color);
  background: linear-gradient(145deg, #2a2f32, #32383b);
  box-shadow: 29px 29px 57px #131516, -29px -29px 57px #4b5358;
  //Increase priority of rule
  &&& {
    border-top: 1px solid var(--icon-color);
    border-bottom: 1px solid var(--icon-color);
  }
`;
const IconsContainer = styled.div``;
