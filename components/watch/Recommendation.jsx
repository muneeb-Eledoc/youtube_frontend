import React, { useEffect, useState } from 'react'
import VideoItem from './VideoItem'
import axios from '../../axios'

const Recommendation = ({tags}) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
      const getVideo = async ()=>{
        try {
            const res = await axios.get(`/video/tags?tags=${tags}`)
            setVideos(res.data)
        } catch (error) {}
      }
      getVideo()
    }, [tags])
    
    return (
        <div className='flex flex-col px-2 py-2'>
            {videos?.map((video)=>(
                <VideoItem key={video._id} video={video} />
            ))}
        </div>
    )
}

export default Recommendation