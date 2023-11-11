import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

function MessagesChat({ handleOpen }) {
  const [input, setInput] = useState("");
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // fetch the message oc userChats between two people
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  // hanlde input
  const handleSendMessage = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: arrayUnion({
        id: uuidv4(),
        input,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        input,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        input,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setInput("");
  };

  const handleInputKeyDown = (e) => {
    e.code === "Enter" && handleSendMessage();
  };

  const ref=useRef()
  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [messages])

  
  return (
    <div class="chat">
      <div class="chat-header clearfix">
        <div class="row">
          <div class="col-lg-6">
            <a
              href="javascript:void(0);"
              data-toggle="modal"
              data-target="#view_info"
            >
              <img src={data.user?.photoURL} alt="avatar" />
            </a>
            <div class="chat-about">
              <h6 class="m-b-0">{data.user?.displayName}</h6>
            </div>
          </div>
          <div class="offset-5 col-lg-1 hidden-sm text-right">
            <a
              onClick={handleOpen}
              href="javascript:void(0);"
              class="btn btn-outline-success"
            >
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="chat-history">
        <ul class="m-b-0">
          {messages.map((m) => (
            <li class="clearfix" ref={ref}>
              <div class={`message-data ${m.senderId === currentUser.uid && "text-end"}`}>
                <img
                style={{height:"42px",borderRadius:"100%"}}
                  src={
                    m.senderId === currentUser.uid
                      ? currentUser.photoURL
                      : data.user.photoURL
                  }
                  alt="avatar"
                />
                <span class="message-data-time">{m.date.toDate().toLocaleString()}</span>
              </div>
              <div class={`message ${m.senderId === currentUser.uid ? "other-message float-right":"my-message"}`}>{m.input}</div>
            </li>
          ))}
        </ul>
      </div>
      <div class="chat-message clearfix">
        <div class="input-group mb-0">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-send"></i>
            </span>
          </div>
          <input
            onKeyDown={handleInputKeyDown}
            type="text"
            class="form-control"
            placeholder="Enter text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default MessagesChat;
