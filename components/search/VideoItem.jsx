import React from 'react'

const VideoItem = ({ video }) => {

    const handleVideoClick = () => {

    }

    return (
        <div onClick={handleVideoClick} className='flex flex-1 space-x-3 p-1 items-start flex-row hover:bg-gray-100 mt-2 rounded cursor-pointer active:bg-gray-200'>
            <div className="flex">
                <img className='max-h-[300px] w-full sm:min-w-[290px] min-w-[170px] max-w-[170px] sm:max-w-none md:min-w-[350px] lg:min-w-[400px] aspect-video object-contain bg-black' src={video.thumbnail} alt="" />
            </div>
            <div className="flex flex-col w-full items-start">
                <div className='font-bold text-sm sm:text-lg md:text-lg text-ellipsis line-clamp-2'>{video.title}</div>
                <div className='flex flex-col'>
                    <div className="flex text-sm text-gray-500 space-x-1">
                        <span>{video.views} views</span>
                        <span className='font-extrabold'>·</span>
                        <span>9 days ago</span>
                    </div>
                    <div className='text-sm text-gray-500 items-center flex space-x-2 mt-2 md:mt-3'>
                        <img className='w-5 sm:w-7 h-5 sm:h-7 rounded-full' src="https://firebasestorage.googleapis.com/v0/b/fb-pro-54491.appspot.com/o/1660797831518hq720.jpg?alt=media&token=2b1d5c1e-a06e-4021-9822-00aba535bce0" alt="" />
                        <span>muneeb rana</span>
                    </div>
                    <div className="hidden md:flex">
                        <p className='text-sm text-gray-600 text-ellipsis line-clamp-2 mt-1'>{video.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoItem