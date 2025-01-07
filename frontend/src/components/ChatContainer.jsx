import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useCharStore';
import ChatsHeader from './ChatsHeader';
import MessagesInput from './MessagesInput';
import { userAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils.js';




const ChatContainer = () => {

  const { messages, getMessages, isMessagesLoding, selectUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();

  const { authUser } = userAuthStore();
  const messageEndRef = useRef(null);



  useEffect(() => {
    getMessages(selectUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);


  useEffect(() => {
    if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);



  if (isMessagesLoding) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatsHeader />
        <MessageSkeleton />
        <MessagesInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatsHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessagesInput />
    </div>
  );
}

export default ChatContainer