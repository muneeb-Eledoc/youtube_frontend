import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../axios'

const CommentBox = ({videoId, setComments, comments}) => {
  const [showCommentBtns, setShowCommentBtns] = useState(false)
  const [comment, setComment] = useState('')
  const {currentUser} = useSelector(state=> state.user)

  const handleCommentSubmit = async ()=>{
    if(comment === '') return

    try{
        axios.post('/comment', { videoId: videoId, comment: comment})
        .then((response) => {
            setComments(prev=> [response.data, ...prev])
            setComment('')
          }, (error) => {
            console.log(error);
          });
    }catch(e){console.log(e)}
  }

  return (
    <div className='w-full'>
        <div className="flex flex-1 space-x-5">
            <h1 className='flex space-x-1 font-semibold'>
                <span>{comments.length}</span>
                <span>Comments</span>
            </h1>

            <h1 className='flex space-x-1 font-semibold'>
                <img className='w-7 h-7' src="/sort.svg" alt="" />
                <span className='uppercase text-md'>Sort by</span>
            </h1>
        </div>

        <div className="flex items-start mt-3 space-x-2">
            <img className='w-10 h-10 rounded-full' src={currentUser.img} alt="" />
            <div className="flex flex-col flex-1">
                <input onChange={(e)=> setComment(e.target.value)} value={comment} onClick={()=> setShowCommentBtns(true)} className='py-1 bg-transparent outline-none border-b border-gray-400 focus:border-b-2 focus:border-gray-600' type="text" placeholder='Add a comment..' />
               {showCommentBtns && <div className="flex justify-end my-2 space-x-3">
                    <button onClick={()=> setShowCommentBtns(false)} className='px-4 py-[7px] text-gray-600 font-semibold text-[15px] rounded active:bg-gray-200 uppercase'>cancel</button>
                    <button onClick={handleCommentSubmit} className='px-4 py-[7px] bg-blue-700 text-white font-semibold text-[15px] rounded-[3px] active:bg-blue-800 uppercase'>Comment</button>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default CommentBox