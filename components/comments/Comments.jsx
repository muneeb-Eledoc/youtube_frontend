import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import CommentBox from './CommentBox' 
import axios from '../../axios'

const Comments = ({video, channel, setLastComment}) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        const getComments = async ()=>{
        try{
            if(video._id){
                const comments = await axios.get('/comment/'+video._id)
                setComments(comments.data)
            }
        }catch(e){}
      }
      getComments()
    }, [video._id])
    
    return (
        <div className="flex mt-5 flex-col px-2 lg:px-0">
            <CommentBox videoId={video?._id} setComments={setComments} comments={comments}/>

            <div className="flex flex-col mt-6">
                {comments?.map((comment, i)=>(
                    <Comment key={comment._id} comment={comment} setLastComment={setLastComment} i={i} />
                ))}
            </div>
        </div>
    )
}

export default Comments