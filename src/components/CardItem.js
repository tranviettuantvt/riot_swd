import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { Food } from "../context";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { addtoFavorite } from "../api/FavouriteService";

function CardItem({
  title,
  image,
  material,
  ingredient_id,
  user_id,
  rate,
  time,
}) {
  const { handleShow } = useContext(Food);
  const [author, setAuthor] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { handleOpen, showPopUp } = useContext(Food);
  const navigate = useNavigate();

  useEffect(() => {
    // get user from firebase through uid
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", user_id));
    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setAuthor(userData);
        }
      })
      .catch((error) => {
        console.log("Error retrieving user document:", error);
      });
  }, [user_id]);

  const handleChatBox = async () => {
    // check whether group exists, if not create new one
    const combineId =
      currentUser.uid > user_id
        ? currentUser.uid + user_id
        : user_id + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combineId));
      if (!res.exists()) {
        // create chat in chats collection between two people
        await setDoc(doc(db, "chats", combineId), { messages: [] });

        // update user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combineId + ".userinfo"]: /*use variable and string together*/ {
            uid: user_id,
            displayName: author.displayName,
            photoURL: author.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user_id), {
          [combineId + ".userinfo"]: /*use variable and string together*/ {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combineId + ".date"]: serverTimestamp(),
        });
      }
      dispatch({ type: "CHANGE_USER", payload: author });
      handleOpen();
      console.log(showPopUp);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChat = () => {
    if (!currentUser) {
      navigate("/login");
      alert("Login first");
    }
    if (user_id !== currentUser.uid) handleChatBox();
  };

  const addtooFavorite = (ingredientId) => {
    let data = {
      ingredient_id: ingredientId,
      user_id: currentUser.uid,
    };
    addtoFavorite(data)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };
  return (
    <div className="col-lg-4" style={{ marginTop: "1rem" }}>
      <div
        className="card position-relative card-item"
        style={{ height: "466px" }}
      >
        <div className="img-item p-3">
          <img
            src={image}
            className="card-img-top rounded"
            alt="..."
            style={{ height: "15rem" }}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title text-success">{title}</h5>
          <p className="card-text">{material}</p>
          <div
            className=""
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>{`Thoi gian nau: ${time}`}</span>
            <div className="cardItem-author" onClick={handleChat}>
              <img
                src={author?.photoURL}
                alt="avatar"
                style={{ height: "40px", borderRadius: "100%" }}
              />
              <div class="about">
                <div class="name">{author?.displayName}</div>
              </div>
            </div>
          </div>
        </div>
        <button className="eye-item" onClick={() => handleShow(ingredient_id)}>
          <i className="fa-solid fa-eye"></i>
        </button>
        <button
          className="favourite-item"
          onClick={() => addtooFavorite(ingredient_id)}
        >
          <i className="fa-sharp fa-solid fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

export default CardItem;
