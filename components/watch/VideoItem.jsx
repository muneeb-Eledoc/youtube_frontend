import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ReactTimeago from 'react-timeago'
import { getUser } from '../../utils/getUser'

const VideoItem = ({ video }) => {
  const [user, setUser] = useState({})
  const router = useRouter()

  useEffect(() => {
    const getChannel = async () => {
      setUser(await getUser(video.userId))
    }
    getChannel()
  }, [video.userId])

  const handleVideoClick = () => {
    router.push(`/watch/${video._id}`)
  }

  return (
    <div onClick={handleVideoClick} className='flex space-x-2 items-start flex-row hover:bg-gray-100 mt-3 rounded cursor-pointer active:bg-gray-200'>
      <div className="flex">
        <img className='max-h-[124px] md:max-h-[152px] lg:max-h-[152px] w-full aspect-video object-contain bg-black rounded-xl' src={video?.thumbnail} alt="" />
      </div>
      <div className="flex flex-col w-full items-start">
        <div className='font-bold text-sm sm:text-md md:text-lg lg:text-sm text-ellipsis max-h-[64px] line-clamp-2'>{video?.title}</div>
        <div className='flex flex-col'>
          <div className='text-xs my-1 text-gray-500'>{user.username}</div>
          <div className="flex text-xs text-gray-500 space-x-1">
            <span>{video.views} views</span>
            <span className='font-extrabold'>·</span>
            <span><ReactTimeago date={video.createdAt} /></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoItem