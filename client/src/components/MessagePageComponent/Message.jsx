/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { format } from "timeago.js";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import "./Message.css";
function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-top justifiy-content-center align-items-center d-flex">
        {!own && (
          <Avatar
            alt="Remy Sharp"
            src={message.senderId.image.url}
            sx={{ width: 35, height: 35 }}
          />
        )}
        <p className="message-text m-0 p-2 px-3">{message.text}</p>{" "}
        {own && (
          <Avatar
            alt="Remy Sharp"
            src={message.senderId.image.url}
            sx={{ width: 35, height: 35 }}
          />
        )}
      </div>
      <Typography className="user-profile__location mt-1 me-2" style={{ fontSize: "12px" }}>
        {format(message.createdAt)}
      </Typography>
    </div>
  );
}

export default Message;