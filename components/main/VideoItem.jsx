import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactTimeago from 'react-timeago'
import axios from '../../axios'

const VideoItem = ({video}) => {
    const [user, setUser] = useState({})
    const router = useRouter()

    useEffect(() => {
      const getUser = async ()=>{
        const user = await axios.get('/user/find/'+video.userId)
        setUser(user.data)
      }
      getUser()
    }, [video.userId])
    
    const handleRedirect = ()=>{
        router.push('/watch/'+video._id)
    }

    return (
    <div onClick={handleRedirect} className='flex col-span-1 flex-col max-w-xs sm:max-w-[340px] hover:bg-gray-100 p-1 rounded cursor-pointer active:bg-gray-200'>
        <div className="flex">
            <img className='max-h-48 sm:max-h-48 w-full aspect-video object-contain bg-black rounded-xl' src={video.thumbnail} alt="" />
        </div>
        <div className="flex space-x-2 py-2 w-full">
            <img className='w-[34px] h-[34px] rounded-full object-cover' src={user?.img? user?.img : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt="" />
            <div className='flex flex-col justify-between'>
                <div className='font-semibold text-sm text-ellipsis max-h-[64px] line-clamp-2'>{video.title}</div>
                <div className='text-xs mt-1 text-gray-500'>{user?.username}</div>
                <div className="flex text-xs text-gray-500 space-x-1">
                    <span>{video.views} views</span>
                    <span className='font-extrabold'>·</span>
                    <span>{<ReactTimeago date={video.createdAt} />}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoItem