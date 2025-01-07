import React from "react";
import { X } from "lucide-react";
import { userAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useCharStore.js";



const ChatsHeader = () => {
  const { selectUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = userAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectUser.profilePic || "/avatar.png"} alt={selectUser.fullname} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectUser.fullname}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatsHeader;