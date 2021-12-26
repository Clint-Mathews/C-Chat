import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
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
function Sidebar() {
  const { currentUser } = useAuth();
  // console.log(currentUser);
  const [chat, setChat] = useState([]);
  const [friends, setFriends] = useState([]);
  const chatsCollectionRef = collection(db, "chats");
  const userChatRef = query(
    chatsCollectionRef,
    where("users", "array-contains", currentUser.email)
  );
  useEffect(() => {
    async function getFriends() {
      const usersRef = collection(db, "users");
      const usersQuery = query(
        usersRef,
        where("email", "!=", currentUser.email)
      );
      const usersSnapshot = await getDocs(usersQuery);
      setFriends(
        usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    async function getChat() {
      const usersSnapshot = await getDocs(userChatRef);
      setChat(usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(
      //   usersSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      // );
    }
    getFriends();
    getChat();
  }, []);

  // const unsubscribe = onSnapshot(userChatRef, updateChat);
  // const unsubscribe = onSnapshot(userChatRef, (querySnapshot) => {
  //   const cities = [];
  //   querySnapshot.forEach((doc) => {
  //     cities.push(doc.data());
  //   });
  //   // console.log(cities);
  // });
  // const updateChat = (chatsSnap) => {
  //   const data = chatsSnap?.docs.map((chat) => {
  //     return { id: chat.id, users: chat.data().users };
  //   });
  //   setChat(data);
  //   // console.log(data);
  // };
  async function checkChatExist(recipientEmail) {
    return await getDocs(userChatRef).then((chatsSnap) => {
      return !!chatsSnap?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0
      );
    });

    // Checking code
    // console.log(recipientEmail);
    // console.log(chatsSnapshot);
    // console.log(chatsSnapshot?.docs.find((chat) => chat.data()));
    // console.log(
    //   chatsSnapshot?.docs.find((chat) =>
    //     chat.data().users.find((user) => user === recipientEmail)
    //   )
    // );
    // console.log(
    //   !!chatsSnapshot?.docs.find(
    //     (chat) =>
    //       chat.data().users.find((user) => user === recipientEmail)?.length >
    //       0
    //   )
    // );
    // console.log(querySnapshot);
    // for (let chat of chatsSnapshot.docs) {
    //   console.log(chat);
    //   console.log(chat.data());
    //   ret = !ret
    //     ? chat.data().users.filter((user) => user === recipientEmail)?.length >
    //       0
    //     : true;
    // }
    // async function someFunction(data) {}
    // await someFunction(element);
    // console.log(
    //   !!chatsSnapshot?.docs.forEach(
    //     (chat) =>
    //       chat.data().users.findAsync((user) => user === recipientEmail)
    //         ?.length > 0
    //   )
    // );
    // console.log(chatsSnapshot);
    // let ret = false;
    // for (let chat of chatsSnapshot.docs) {
    //   console.log(chat);
    //   console.log(chat.data());
    //   ret = !ret
    //     ? chat.data().users.filter((user) => user === recipientEmail)
    //         ?.length > 0
    //     : true;
    // }
    // console.log(ret);
    // return false;
    // console.log(chatsSnapshot);
    // console.log(chatsSnapshot?.docs);
    // console.log(chatsSnapshot?.docs.map((chat) => chat.data()));
    // console.log(chatsSnapshot?.docs.map((chat) => chat.data().users));
    // console.log(chatsSnapshot?.docs.map(async (chat) => await chat.data()));
    // console.log(
    //   chatsSnapshot?.docs.map(
    //     async (chat) =>
    //       chat.data().users.filter(async (user) => user === recipientEmail)
    //         ?.length > 0
    //   )
    // );

    // return !!chatsSnapshot?.docs.map(
    //   (chat) =>
    //     chat.data().users.find((user) => user === recipientEmail)?.length > 0
    // );
  }

  const createChat = async () => {
    const input = prompt("Enter an email you want to chat with ?");
    if (!input) return null;
    // We add the chat to DB "chats" if does not already exists.
    // console.log(EmailValidator.validate(input));
    // console.log(input !== user.email);
    // console.log(!checkChatExist(input));
    // console.log(!(await checkChatExist(input)));
    if (
      EmailValidator.validate(input) &&
      !(await checkChatExist(input)) &&
      input !== currentUser.email
    ) {
      // We need to add chat to Db
      // console.log("im here");
      await setDoc(doc(chatsCollectionRef), {
        users: [currentUser.email, input],
      });
    } else {
      // Email invalid
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={currentUser.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search chat" />
      </Search>
      <SideBarButton onClick={createChat}>Start a new Chat</SideBarButton>
      {/* list of chats will be here */}
      {chat.map((chat) => (
        <Chat
          key={chat.id}
          id={chat.id}
          currentUser={currentUser}
          users={chat.users}
        />
      ))}
      {/* {friends.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat} />
      ))} */}
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
//Since we need it to stay at top
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
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
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  //Entire width
  flex: 1;
`;
const SideBarButton = styled(Button)`
  width: 100%;
  //Increase priority of rule
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
const IconsContainer = styled.div``;
