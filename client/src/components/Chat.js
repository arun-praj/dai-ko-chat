import React, { Component, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
// const ROOT_CSS = css({
//    height: 600,
//    width: 400,
// });
let socket;

const Chat = (props) => {
   const ENDPOINT = "https://daikochat.herokuapp.com/";
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState("");
   const [data, setData] = useState([]);

   useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("join", { name: props.username });
      return () => {
         socket.emit("disconnect");
         socket.off();
      };
   }, [ENDPOINT]);

   // useEffect(() => {
   //    socket.on("message", (message) => {
   //       setMessages([...messages, message]);
   //    });
   // }, [messages]);

   useEffect(() => {
      socket.on("message", (details) => {
         setData((prevNames) => [...prevNames, details]);
      });
   }, [messages]);

   // if (username.length === 0) {
   //    return <Redirect to="/" />;

   const sendMessage = (e) => {
      e.preventDefault();
      if (message) {
         socket.emit("sendMessage", { name: props.username, message }, () => {
            setMessage("");
         });
      }
   };

   return (
      <div className="wrapper">
         <div className="message-input">
            <ScrollToBottom className="chat-box">
               <span className="chat-error chat-error-bold">
                  Dont reload the page. I repeat dont reload the page
               </span>
               {data.map((e) => (
                  <div>
                     {e.name ? (
                        <div className="chat">
                           <div className="chat-name">{e.name} : </div>
                           <div className="chat-message">{e.text}</div>
                        </div>
                     ) : (
                        <div className="chat-error">Login to continue. remove /chat from url</div>
                     )}
                  </div>
               ))}
            </ScrollToBottom>
            {/* <div className="chat">
               {e.name ? <div className="chat-name">{e.name} : </div> : null}=
               {e.text ? <div className="chat-message">{e.text}</div> : null}
            </div> */}
            <input
               className="chat-input"
               type="text"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
               placeholder="Press enter to send Homie."
            />
         </div>
      </div>
   );
};

// class Chat extends Component {
//    state = {
//       username: "",
//    };
//    componentDidMount() {
//       this.setState({
//          username: this.props.username,
//       });
//       socket = io(ENDPOINT);
//       console.log(socket);
//    }
//    render() {
//       // console.log(this.props);
//       if (this.props.username.length === 0) {
//          return <Redirect to="/" />;
//       }
//       return (
//          <div className="wrapper">
//             <div></div>
//          </div>
//       );
//    }
// }
export default Chat;
