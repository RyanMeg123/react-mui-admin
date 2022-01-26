import { useLocation } from "react-router-dom";
import MessageList from "./MessageList";
import MessageDetail from "./MessageDetail";

const MessageIndex = () => {
  let location = useLocation();
  console.log(location.state,';:::')

  return <>{location.state?.id ? <MessageDetail /> : <MessageList />}</>;
};

export default MessageIndex;
