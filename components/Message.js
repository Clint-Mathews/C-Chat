import moment from "moment";
import styled from "styled-components";
import { useAuth } from "../Auth";
function Message({ key, user, message }) {
  const { currentUser } = useAuth();
  const TypeOfMessage = user === currentUser.email;
  // console.log(message);
  return (
    <Container key={key}>
      {TypeOfMessage ? (
        <Sender>
          {message.message}{" "}
          <TimeStamp>
            {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
          </TimeStamp>
        </Sender>
      ) : (
        <Reciever>
          {message.message}
          <TimeStamp>
            {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
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
