import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/ContextProvider";
import { AddUser } from "../typings";
import { MessagesSquare } from "lucide-react";
import { toast } from "react-toastify";
import Chats from "../Chats";

const MessagesPage = () => {
  const { userData } = useContext(UserContext);
  const [show, setShow] = useState<number>(16);
  const [listUsers, setListUsers] = useState<AddUser[]>([]);
  const [renderChat, setRenderChat] = useState<boolean>(false);
  const [Email, setEmail] = useState<string>("");
  const [User_Id, setUserId] = useState<string>("");

  const hideHandler = () => {
    setShow(0);
  };
  const showHandler = () => {
    setShow(16);
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${userData.token}`,
    };

    const getUsers = async () => {
      try {
        const listAddedUsersResponse = await axios.get(
          "http://chat-home-6d7818406fa3.herokuapp.com/chat/users/list_emails/",
          {
            headers: headers,
          }
        );

        setListUsers(listAddedUsersResponse.data);
      } catch (error: any) {
        const errorBody = error.response.data;
        toast.error(`${errorBody.errors || errorBody.detail}`, {
          autoClose: 2000,
          theme: "light",
        });
      }
    };

    getUsers();
  }, []);

  const chatHandler = async (user_id: string, user_email: string) => {
    setRenderChat(true);
    setEmail(user_email);
    setUserId(user_id);
  };

  return (
    <div className="w-full flex items-center self-start">
      <div className="w-1/3 h-[90vh] flex flex-col space-y-5 items-start ">
        <div className="w-full h-full flex flex-col px-8 py-6 items-start space-y-3 bg-slate-100">
          <h3 className="text-black text-xl">Inbox</h3>
          <div className="relative">
            <input
              type="search"
              className="relative w-60 px-2 h-12 flex items-center text-sm focus:outline-none justify-center border border-slate-200 rounded-md"
              placeholder="     Search for message"
              onBlur={showHandler}
              onFocus={hideHandler}
            />
            <Search
              color="#cccccc"
              size={show}
              className="absolute top-4 left-2"
            />
          </div>

          {/* Render users that have been added */}
          <div className="w-full flex flex-col space-x-1 items-start">
            {listUsers.map((eachUser) => (
              <div
                className={`border rounded-md p-2 mb-3 bg-slate-200 cursor-pointer`}
                onClick={() => chatHandler(eachUser.user, eachUser.email)}
                key={eachUser.user}
              >
                <div
                  className={`${
                    eachUser.email == userData.user.email ? "hidden" : "block"
                  }`}
                >
                  {eachUser.email}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Interface */}

      <div className="w-2/3 h-full flex items-center justify-center">
        {renderChat ? (
          <div className="w-full h-screen flex items-start">
            <Chats user_id={User_Id} email={Email} />
          </div>
        ) : (
          <div className="w-full h-full items-center justify-center flex flex-col space-y-3">
            <MessagesSquare size={20} color="#ccc" />
            <h3 className="text-slate-500 text-base">
              Click on chat to read conversation
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
