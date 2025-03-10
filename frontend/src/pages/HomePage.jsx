import React from 'react'
import { useChatStore } from '../store/useCharStore.js'
import Sidebar from '../components/SideBar.jsx'
import NoChatSelected from '../components/NoChatSelected.jsx'
import ChatContainer from '../components/ChatContainer.jsx'


const HomePage = () => {

  const { selectUser } = useChatStore();

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex justify-center items-center pt-20 px-4'>
        <div className='bg-base-200 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />


            {!selectUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage