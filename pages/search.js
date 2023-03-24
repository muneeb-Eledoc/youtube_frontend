import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import axios from '../axios'
import VideoItem from '../components/search/VideoItem'

const Search = () => {
  const [videos, setVideos] = useState([])
  const router = useRouter()
  const {q} = router.query

  useEffect(() => {
    const getQueryVideos = async ()=>{
        try {
            const res = await axios.get(`/video/search?q=${q}`)
            setVideos(res.data)
        } catch (error) {}
    }
    getQueryVideos()
  }, [q])

  return (
    <div>
        <Navbar />
        <div className='flex '>
            <Sidebar />
            <div className="flex flex-1 bg-gray-50 justify-center">
                <div className='w-full flex items-start px-3 flex-col max-w-6xl'>
                    <div className="flex items-center space-x-2 mt-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer active:bg-gray-200">
                        <img className='w-6 h-6' src="/filter.svg" alt="" />
                        <span className='text-gray-500 font-bold text-[15px] uppercase'>Filters</span>
                    </div>
                    <hr className='my-2 h-[1px] w-full bg-gray-400' />
                    <div className="flex w-full flex-col">
                        {videos.map((video, i)=>(
                            <VideoItem key={videos._id} video={video} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search