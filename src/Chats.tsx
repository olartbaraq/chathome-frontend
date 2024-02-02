import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "./context/ContextProvider";
import { UserChat, Messages } from "./typings";
import { Send } from "lucide-react";

const Chats = ({ user_id, email }: UserChat) => {
  const { userData } = useContext(UserContext);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [showMessages, setShowMessages] = useState<Messages[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const funcMessages = async () => {
      const headers = {
        Authorization: `Bearer ${userData.token}`,
      };

      try {
        const listMessages = await axios.get(
          `http://chat-home-6d7818406fa3.herokuapp.com/chat/users/${user_id}/messages/`,
          {
            headers: headers,
          }
        );

        setShowMessages(listMessages.data);
      } catch (error: any) {
        const errorBody = error.response.data;
        toast.error(`${errorBody.errors || errorBody.detail}`, {
          autoClose: 2000,
          theme: "light",
        });
      }
    };
    funcMessages();
  }, [showMessages]);

  useEffect(() => {
    // Create a WebSocket connection
    const ws = new WebSocket(
      `ws://chat-home-6d7818406fa3.herokuapp.com/ws/chat/${user_id}/?token=${userData.token}`
    );

    // Set up event listeners
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    ws.addEventListener("message", (event) => {
      const newMessage = JSON.parse(event.data);
      setShowMessages((prevMessages) => [...prevMessages, newMessage]);

      // Check if the user has scrolled manually
      const chatContainer = chatContainerRef.current;
      if (chatContainer) {
        const isScrolledToBottom =
          chatContainer.scrollHeight - chatContainer.clientHeight <=
          chatContainer.scrollTop + 1;
        setIsAutoScrolling(isScrolledToBottom);
      }
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
      // You may want to handle reconnection logic here
    });

    // Save the WebSocket instance to state
    setSocket(ws);

    // Clean up the WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, [user_id, userData.token]);

  // Scroll to the bottom when messages change or user manually scrolls to the bottom
  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    if (chatContainer && isAutoScrolling) {
      // If at the bottom or auto-scrolling, scroll automatically
      chatContainer.scrollTop =
        chatContainer.scrollHeight - chatContainer.clientHeight;
    }
  }, [showMessages, isAutoScrolling]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const isScrolledToBottom =
        chatContainer.scrollHeight - chatContainer.clientHeight <=
        chatContainer.scrollTop + 1;
      setIsAutoScrolling(isScrolledToBottom);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (message && socket) {
      const data = {
        message: message,
      };
      socket.send(JSON.stringify(data));
      setMessage("");
    }
  };

  return (
    <div className="w-full h-[88vh] flex flex-col py-12 px-4 space-y-5">
      <div className="w-full h-14 flex items-center justify-center border-t-2 border-b-2 border-slate-300">
        {email}
      </div>
      <div
        ref={chatContainerRef}
        className="flex-col flex space-y-4 h-full overflow-y-auto"
        onScroll={handleScroll}
      >
        {showMessages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user_id !== user_id ? "justify-end" : "justify-start"
            }`}
          >
            {message.user_id !== user_id ? (
              <div className="max-w-max h-12 px-4 flex items-center bg-blue-300 border rounded-md">
                {message.content}
              </div>
            ) : (
              <div className="max-w-max h-12 px-4 flex items-center bg-green-300 border rounded-md">
                {message.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          type="text"
          className="relative w-full px-2 h-12 flex items-center text-sm focus:outline-none justify-center border border-slate-200 rounded-md"
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          autoFocus
        />
        <button type="submit" className="absolute top-4 right-10">
          <Send color="#1A75E0" size={20} />
        </button>
      </form>
    </div>
  );
};

export default Chats;
