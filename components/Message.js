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
          <MessageView> {message.message}</MessageView>
          <TimeStamp>
            {message.timestamp ? formatTime(message.timestamp) : "..."}
          </TimeStamp>
        </Sender>
      ) : (
        <Reciever>
          <MessageView> {message.message}</MessageView>
          <TimeStamp>
            {message.timestamp ? formatTime(message.timestamp) : "..."}
          </TimeStamp>
        </Reciever>
      )}
    </Container>
  );
}

export default Message;

const Container = styled.div`
  color: white !important;
`;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 12px;
  min-width: 80px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  color: var(--primary) !important;
  background-color: #abe9cd;
  background-image: linear-gradient(
    to right,
    #ece9e6 0%,
    #ffffff 51%,
    #ece9e6 100%
  );
  border-radius: 13px;
  background: linear-gradient(145deg, #ffffff, #dedddd);
  box-shadow: 2px 2px 2px #a5a5a4, -2px -2px 12px #ffffff;
`;

const Reciever = styled(MessageElement)`
  text-align: left;
  background-color: #262d31;
  border-radius: 13px;
  background: linear-gradient(145deg, #293034, #22292c);
  box-shadow: 9px 9px 12px #161a1c, -9px -9px 12px #364046;
`;

const TimeStamp = styled.span`
  padding: 12px;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
  font-weight: 600;
`;

const MessageView = styled.p`
  padding: 0;
  margin: 0;
  margin-bottom: 5px;
`;
