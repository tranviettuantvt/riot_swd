import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function PeopleList() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const {dispatch}=useContext(ChatContext)
  const { currentUser } = useContext(AuthContext);
  const [userChats, setUserChats] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    // check whether group exists, if not create new one
    const combineId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        // create chat in chats collection between two people
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // update user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userinfo"]: /*use variable and string together*/ {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combineId + ".userinfo"]: /*use variable and string together*/ {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUsername("");
  };
  // --------------------------------

  // Fetch all user chats
  useEffect(() => {
    const getUserChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setUserChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getUserChats();
  }, [currentUser.uid]);

  console.log(Object.entries(userChats));

  // ----------------------
  const handleSelectUserChat=(user) => {
    dispatch({type:"CHANGE_USER", payload:user})
  }
  return (
    <div id="plist" class="people-list">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-search"></i>
          </span>
        </div>
        <input
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          class="form-control"
          placeholder="Search..."
          value={username}
        />
        {user && (
          <div class="clearfix" onClick={handleSelect}>
            <img
              src={user.photoURL}
              alt="avatar"
              style={{ with: "40px", height: "40px" }}
            />
            <div class="about">
              <div class="name">{user.displayName}</div>
            </div>
          </div>
        )}
      </div>
      <ul class="list-unstyled chat-list mt-2 mb-0">
        {Object.entries(userChats)?.sort((a,b)=> b[1].date-a[1].date).map((chat) => (
          <li class="clearfix" style={{display:"flex"}} key={chat[0]} onClick={()=>handleSelectUserChat(chat[1].userinfo)}>
            <img src={chat[1].userinfo.photoURL} alt="avatar" />
            <div class="about">
              <div class="name">{chat[1].userinfo.displayName}</div>
              <div class="status"> {chat[1].lastMessage?.input} </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PeopleList;
