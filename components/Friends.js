import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
function Friends({ id, photoURL, displayName }) {
  return (
    <Container key={id}>
      {photoURL ? (
        <UserAvatar
          src={photoURL}
          alt={`${photoURL ? photoURL : displayName} image`}
        />
      ) : (
        <UserAvatar alt={`${displayName} image`}>{displayName[0]}</UserAvatar>
      )}
      <p>{displayName}</p>
    </Container>
  );
}

export default Friends;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
