import React, { useEffect, useState } from 'react'
import Tags from './Tags'
import VideoItem from './VideoItem'
import axios from '../../axios'

const Main = ({type}) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const getRandomVideos = async ()=>{
      const vidoes = await axios.get(`/video/${type}`)
      setVideos(vidoes.data)
    }
    getRandomVideos()
  }, [type])
  
  return (
    <div className="bg-white w-full flex flex-col items-start">
        <Tags />

        <div className="justify-items-center w-full grid 2xl:flex 2xl:justify-center 2xl:flex-wrap lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 grid-cols-1 lg:gap-1 md:gap-1 sm:gap-2 p-2">
            {videos?.map((video)=>(
              <VideoItem key={video._id} video={video}/>
            ))}
        </div>
    </div>
  )
}

export default Main