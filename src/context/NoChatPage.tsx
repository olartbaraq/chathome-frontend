import { MessagesSquare } from "lucide-react";
import { Plus } from "lucide-react";

const NoChatpage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center self-center">
      <div className="w-full flex flex-col items-center space-y-4">
        <MessagesSquare size={25} color="#ccc" />
        <div className="flex flex-col space-y-1 w-full items-center ">
          <h3 className="text-slate-300 text-lg">No Chats</h3>
          <div className="text-center flex flex-col space-x-1 w-full">
            <p className="text-slate-300 leading-relaxed">
              You have not received or send anyone a
            </p>
            <p className="text-slate-300 leading-relaxed">message</p>
          </div>
        </div>
        <button
          type="button"
          className="bg-blue-900 w-36 h-10 flex items-center justify-center rounded-md space-x-2"
        >
          <Plus color="#fff" size={15} />
          <p className="text-white">Add a person</p>
        </button>
      </div>
    </div>
  );
};

export default NoChatpage;
