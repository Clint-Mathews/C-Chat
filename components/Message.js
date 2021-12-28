import styled from "styled-components";
import { useAuth } from "../Auth";
import formatTime from "../utils/formatTime";
function Message({ id, user, message }) {
  const { currentUser } = useAuth();
  const TypeOfMessage = user === currentUser.email;
  return (
    <Container key={id}>
      {TypeOfMessage ? (
        <Sender>
          {message.message}
          <TimeStamp>
            {message.timestamp ? formatTime(message.timestamp) : "..."}
          </TimeStamp>
        </Sender>
      ) : (
        <Reciever>
          {message.message}
          <TimeStamp>
            {message.timestamp ? formatTime(message.timestamp) : "..."}
          </TimeStamp>
        </Reciever>
      )}
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #a8ddf7;
`;
const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const TimeStamp = styled.span`
  color: grey;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
