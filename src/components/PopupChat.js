import React, { useContext, useState } from "react";
import PeopleList from "./PeopleList";
import MessagesChat from "./MessagesChat";
import { Food } from "../context";

function PopupChat() {
  const {showPopUp, handleOpen} =useContext(Food)

  return (
    <div>
      <button class="pop-button" onClick={handleOpen}>
        <i class="fa-brands fa-rocketchat"></i>
      </button>

      {showPopUp && (
        <div class="container popup-chat">
          <div class="row clearfix">
            <div class="offset-4 col-lg-8">
              <div class="card chat-app">
                <PeopleList/>
                <MessagesChat handleOpen={handleOpen}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupChat;
