/* eslint-disable react/no-unescaped-entities */

import {
  CircularProgress,
} from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Roomster from "../../API/config";
import "./MessagePage.scss";
import Conversation from "../../components/MessagePageComponent/Conversation";
import Message from "../../components/MessagePageComponent/Message";
import { v4 as uuidv4 } from "uuid";
import { addOnlineUser, removeUnseen } from "../../store/Slices/userSlice";
import { useLocation } from "react-router-dom";
import InputEmoji from "react-input-emoji";

function MessagePage() {
  // { socket }
  const user = useSelector((state) => {
    return state.user?.user;
  });
  const [value, setValue] = useState("");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchString, setSearchString] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [friend, setFreiend] = useState(null);
  const scrollRef = useRef();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [openChat, setOpenChat] = useState(null);
  const conversationsBeforeSearch = useRef(null);
  const dipsatch = useDispatch();
  const location = useLocation();
  const conversationLength = useRef(null);
  const isOpenNewChat = useRef(true);
  const onlineUsers = useSelector((state) => {
    return state.user?.onlineUsers;
  });
  const socket = useSelector((state) => {
    return state.user?.socket;
  });
  const unseenConvo = useSelector((state) => {
    return state.user?.unseen;
  });
  useEffect(() => {
    if (
      conversations.length !== 0 &&
      conversationsBeforeSearch.current === null
    ) {
      console.log("saving initial conversations");
      conversationsBeforeSearch.current = [...conversations];
      console.log(conversationsBeforeSearch.current);
    }
    let searchedConversations = [];
    conversationsBeforeSearch.current?.forEach((conversation) => {
      conversation.members.forEach((member) => {
        if (
          !searchedConversations.includes(conversation) &&
          member.fullName.toLowerCase().includes(searchString.toLowerCase())
        ) {
          searchedConversations.push(conversation);
        }
      });
    });
    console.log(searchString);
    setConversations([...searchedConversations]);
    setCurrentChat(null);
  }, [searchString]);
  useEffect(() => {
    socket?.emit("getOnlineUsers");
    socket?.on("sentOnlineUsers", (users) => {
      dipsatch(addOnlineUser(users));
    });
    socket?.on("getUsers", (users) => {
      dipsatch(addOnlineUser(users));
    });
  }, [user._id]);
  useEffect(() => {
    const openConversation = async (memberId) => {
      try {
        const response = await Roomster.post("conversations/" + user._id, {
          members: [memberId, user._id],
        });
        setOpenChat(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (location.state) {
      const { id } = location.state;
      openConversation(id);
    }
  }, [location.state]);

  useEffect(() => {
    currentChat?.members.map((member) => {
      if (arrivalMessage && member._id === arrivalMessage.senderId?._id) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    });
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    let isExist = null;
    conversations.forEach((conversation) => {
      if (conversation?._id === openChat?._id) {
        isExist = conversation;
      }
    });
    if (isExist !== null) {
      setPage(1);
      setHasMore(true);
      if (currentChat === isExist) {
        dipsatch(
          removeUnseen(isExist?.members.find((m) => m._id !== user._id)._id)
        );
      }
    } else {
      if (openChat !== null) {
        console.log("openchat");
        setConversations((prev) => [openChat, ...prev]);
        setPage(1);
        setHasMore(true);
        console.log("isOpenNewChat.current", isOpenNewChat.current);
        if (isOpenNewChat.current === true) {
          setFreiend(openChat?.members.find((m) => m._id !== user._id));
          dipsatch(
            removeUnseen(openChat?.members.find((m) => m._id !== user._id)._id)
          );
          setCurrentChat(openChat);
          isOpenNewChat.current = false;
        }
      }
    }
  }, [openChat, conversations]);

  useEffect(() => {
    if (user._id != "") {
      const getConversations = async () => {
        try {
          const res = await Roomster.get("conversations/" + user._id);
          setConversations(res.data.data);
          conversationLength.current = res.data.data.length;
        } catch (err) {
          console.log(err);
        }
      };
      getConversations();
    }
  }, [user._id]);
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      const openConversation = async (memberId) => {
        isOpenNewChat.current = false;
        try {
          const response = await Roomster.post("conversations/" + user._id, {
            members: [memberId, user._id],
          });
          setOpenChat(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      openConversation(data.sender._id);
      setArrivalMessage({
        senderId: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await Roomster.get(
          `messages/${user?._id}/msg/${currentChat?._id}?limit=10&page=${page}`
        );
        setMessages(res.data.data.reverse());
        setPage(2);
      } catch (err) {
        console.log(err);
      }
    };
    if (currentChat != null) getMessages();
  }, [currentChat, user?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(friend)
    socket?.emit("sendMessage", {
      sender: user,
      receiverId: friend._id,
      "text": value,
    });
    try {
      const res = await Roomster.post("/messages/" + user._id, {
        senderId: user._id,
        conversationId: currentChat._id,
        text: value,
      });
      setMessages([...messages, { ...res.data, senderId: user }]);
      setValue('');
    } catch (err) {
      console.log(err);
    }
  };
  const cliclOnConversation = (conv) => {
    setCurrentChat(conv);
    setPage(1);
    setHasMore(true);
    setFreiend(conv?.members.find((m) => m._id !== user._id));
    dipsatch(removeUnseen(conv?.members.find((m) => m._id !== user._id)._id));
    try {
      Roomster.patch("conversations/" + user._id, {
        conversationId: conv._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const loadMore = async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    setPage(page + 1);
    const newData = await Roomster.get(
      `messages/${user?._id}/msg/${currentChat?._id}?limit=10&page=${page}`
    );
    if (newData.data.data.length === 0) {
      setHasMore(false);
    } else {
      setMessages((prevState) => [
        ...newData.data.data.reverse(),
        ...prevState,
      ]);
    }
    setLoading(false);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat, arrivalMessage, messages]);

  const handleScroll = (event) => {
    const { scrollTop } = event.currentTarget;
    console.log(scrollTop);
    if (scrollTop === 0) {
      loadMore();
    }
  };

  //.........................
    const chat = document.querySelector(".chat");
    const profile = document.querySelector(".user-profile");

    /* ===================================
        Screen resize handler
    ====================================== */
    const smallDevice = window.matchMedia("(max-width: 767px)");
    const largeScreen = window.matchMedia("(max-width: 1199px)");
    function chatMobile() {
      if(chat != null)
      chat.classList.add("chat--mobile");
    }
    function handleDeviceChange(e) {
      if (e.matches) chatMobile();
      else chatDesktop();
    }

    function handleLargeScreenChange(e) {
      if (e.matches) profileToogleOnLarge();
      else profileExtraLarge();
    }


    function chatDesktop() {
      
    if(chat != null)
    {
      chat.classList.remove("chat--mobile");
    }
    }

    function profileToogleOnLarge() {
      if(profile != null)
      {
        profile.classList.add("user-profile--large");
      }
    }

    function profileExtraLarge() {
      if(profile != null)
      {
        profile.classList.remove("user-profile--large");
      }
    }

    if (smallDevice && largeScreen != null) {
      smallDevice.addEventListener("change", handleDeviceChange);
      largeScreen.addEventListener("change", handleLargeScreenChange);
    }

    if ( smallDevice &&  largeScreen != null)
    {
      handleDeviceChange(smallDevice);
      handleLargeScreenChange(largeScreen);
    }

    /* ===================================
        Events
    ====================================== */

    const messagingMember = document.querySelectorAll('.messaging-member');
    const chatPrevious = document.querySelector(".chat__previous");
    const chatDetails = document.querySelector(".chat__details");
    const userProfileClose = document.querySelector(".user-profile__close");
    if (messagingMember != null) {
      messagingMember.forEach(messagingMember => {
        messagingMember.addEventListener("click", function () {
          if(chat !=null)
          {
            chat.style.display = "block";
            chat.classList.add("chat--show");
          }
        });
      });
    }

    if(chatPrevious != null)
    {
    chatPrevious.addEventListener("click", function () {
      
        chat.classList.remove("chat--show");
      });
    }
          if(chatDetails != null)
      {
        chatDetails.addEventListener("click", function () {
          if(profile !=null)
          {
            profile.style.display = "block";
            profile.classList.add("user-profile--show");
          }
        });
      }

      if(userProfileClose != null)
      {

        userProfileClose.addEventListener("click", function () {
          profile.classList.remove("user-profile--show");
        });
      }

 

  return (


    <div className="home-page__content messages-page">
  <div className="container-fluid h-100">
    <div className="row px-0 h-100">
      {/* <!-- start message list section  --> */}
      
      <div className="col-12 col-md-4 col-lg-5 col-xl-3 px-0 messages-page__list-scroll" >

        <div className="messages-page__header mb-0 px-4 pt-3 pb-3">
          <span className="messages-page__title">Chats</span>
          
        </div>
        <div className="messages-page__search mb-0 px-3 pb-3">
          <div className="custom-form__search-wrapper">
            <input type="text" className="form-control custom-form" id="search"  onChange={(e) => {
                    setSearchString(e.target.value);
                  }} placeholder="Enter person name …" />
            <button type="submit" className="custom-form__search-submit">
              <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon--search" viewBox="0 0 46.6 46.6">
                <path d="M46.1,43.2l-9-8.9a20.9,20.9,0,1,0-2.8,2.8l8.9,9a1.9,1.9,0,0,0,1.4.5,2,2,0,0,0,1.5-.5A2.3,2.3,0,0,0,46.1,43.2ZM4,21a17,17,0,1,1,33.9,0A17.1,17.1,0,0,1,33,32.9h-.1A17,17,0,0,1,4,21Z" fill="#f68b3c" />
              </svg>
            </button>
          </div>
        </div>

        <ul className="messages-page__list pb-5 px-1 px-md-3">
          {conversations.map((conv) => (
            <div key={conv._id} onClick={() => cliclOnConversation(conv)}>
                  <Conversation
                    conversation={conv}
                    user={user}
                    unseen={unseenConvo}
                  // onlineUsers={onlineUsers}
                  />

                  </div>
                  ))}

        </ul>
      </div>
      {/* <!-- end message list section  -->
      <!-- start content section  --> */}
        {currentChat !== null ? (
          <div className="chat col-12 col-md-8 col-lg-7 col-xl-6 px-0 pl-md-1 chat--show">
            <div className="chat__container">
              <div className="chat__wrapper py-2 pt-mb-2 pb-md-3">
                <div className="chat__messaging messaging-member--online pb-2 pb-md-2 pl-2 pl-md-4 pr-2">
                  <div className="chat__previous d-flex d-md-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon--previous" viewBox="0 0 45.5 30.4">
                      <path d="M43.5,13.1H7l9.7-9.6A2.1,2.1,0,1,0,13.8.6L.9,13.5h0L.3,14v.6c0,.1-.1.1-.1.2v.4a2,2,0,0,0,.6,1.5l.3.3L13.8,29.8a2.1,2.1,0,1,0,2.9-2.9L7,17.2H43.5a2,2,0,0,0,2-2A2.1,2.1,0,0,0,43.5,13.1Z" fill="#f68b3c" />
                    </svg>
                  </div>
               

                    <div className="chat__infos pl-2 pl-md-0  p-0" >
                        <CardHeader
                          className="messages-top"
                          avatar={
                            <Avatar
                              alt="Remy Sharp"
                              src={friend.image.url}
                              // " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4wVGjMQ37PaO4PdUVEAliSLi8-c2gJ1zvQ&usqp=CAU"
                              sx={{ width: 40, height: 40 }}
                            />
                          }
                          title={friend.fullName}
                          subheader={
                            onlineUsers.some((user) => user.userId === friend._id)
                              ? "online"
                              : "offline"
                          }
                        />
                    </div>


                  <div className="chat__actions mr-2 ">
                    <ul className="m-0">

                      <li className="chat__details d-flex d-xl-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 42.2 11.1">
                          <g>
                            <circle cx="5.6" cy="5.6" r="5.6" fill="#d87232" />
                            <circle cx="21.1" cy="5.6" r="5.6" fill="#d87232" />
                            <circle cx="36.6" cy="5.6" r="5.6" fill="#d87232" />
                          </g>
                        </svg>
                      </li>
                    </ul>

                  </div>
                </div>
                <div className="chat__content pt-4 px-3" onScroll={handleScroll}>
                  <ul className="chat__list-messages">
                  <div className="messages-box" >
                        {messages.map((msg) => (
                  <div ref={scrollRef} key={uuidv4()}>
                    <Message
                      message={msg}
                      own={msg.senderId._id === user._id}></Message>
                  </div>
                ))}
                {loading && (
                  <div className="centerItem">
                    <CircularProgress />
                  </div>
                )}
              </div>
                  </ul>
                </div>
                <div className="chat__send-container px-2 px-md-3 pt-1 pt-md-3">
                  <div className="custom-form__send-wrapper ">
                    <div className="w-100 pe-5">

                      <InputEmoji
                        placeholder="Type a message"
                        value={value}
                        onChange={setValue}                       
                       height={25}
                      />
                    </div>

                    <button  onClick={handleSubmit}  className="custom-form__send-submit">
                      <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon svg-icon--send" viewBox="0 0 45.6 45.6">
                        <g>
                          <path d="M20.7,26.7a1.4,1.4,0,0,1-1.2-.6,1.6,1.6,0,0,1,0-2.4L42.6.5a1.8,1.8,0,0,1,2.5,0,1.8,1.8,0,0,1,0,2.5L21.9,26.1A1.6,1.6,0,0,1,20.7,26.7Z" fill="#d87232" />
                          <path d="M29.1,45.6a1.8,1.8,0,0,1-1.6-1L19.4,26.2,1,18.1a1.9,1.9,0,0,1-1-1.7,1.8,1.8,0,0,1,1.2-1.6L43.3.1a1.7,1.7,0,0,1,1.8.4,1.7,1.7,0,0,1,.4,1.8L30.8,44.4a1.8,1.8,0,0,1-1.6,1.2ZM6.5,16.7l14.9,6.6a2,2,0,0,1,.9.9l6.6,14.9L41,4.6Z" fill="#d87232" />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ) : ''}
      {/* <!-- end content section  -->
      <!-- start infos section  --> */}
       {currentChat !== null ? (
      <div className="col-12 col-md-5 col-lg-4 col-xl-3 px-4 px-sm-5 px-lg-4 user-profile">
        <div className="user-profile__close d-flex d-xl-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 38.8 38.9">
            <g>
              <path d="M2,38.9a1.9,1.9,0,0,1-1.4-.5,2.1,2.1,0,0,1,0-2.9L35.4.6a1.9,1.9,0,0,1,2.8,0,1.9,1.9,0,0,1,0,2.8L3.4,38.4A1.9,1.9,0,0,1,2,38.9Z" fill="#d87232" />
              <path d="M36.8,38.9a1.9,1.9,0,0,1-1.4-.5L.6,3.4A1.9,1.9,0,0,1,.6.6,1.9,1.9,0,0,1,3.4.6L38.2,35.5a2.1,2.1,0,0,1,0,2.9A1.9,1.9,0,0,1,36.8,38.9Z" fill="#d87232" />
            </g>
          </svg>
        </div>
        <div className="user-profile__wrapper">
          <div className="user-profile__avatar">
          <Avatar
                              alt="Remy Sharp"
                              src={friend.image.url}
                              sx={{ width: 200, height: 200 }}
                            />
          </div>
          <div className="user-profile__details mt-1">
            <span className="user-profile__name">{friend.fullName}</span>
            <span className="user-profile__location">{friend.address.country},{friend.address.city}</span>
            <span className="user-profile__phone">{friend.email}</span>
          </div>
        </div>
      </div>):
      
      <div className=" col new_chat">
      </div>      
      }
      {/* <!-- end infos section  --> */}
    </div>
  </div>
</div>
  );
}

export default MessagePage;