import React, { useEffect, useState } from 'react'
import ReactTimeago from 'react-timeago'
import { getUser } from '../../utils/getUser'

const Comment = ({comment, setLastComment, i}) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const getCommentUser = async ()=>{
        if(comment.userId){
            const res = await getUser(comment.userId)
            setUser(res)
            if(i===0){
                setLastComment({...comment, img: res.img})
            }
        }
    }
    getCommentUser()
  }, [comment.userId, i, setLastComment, comment])
   
  return (
    <div className='mb-5 flex items-start space-x-2'>
        <img className='w-10 h-10 rounded-full' src={user?.img? user?.img : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt='' />
        <div className="flex flex-col">
            <div className="flex space-x-2 items-center">
                <span className='text-sm text-gray-700 font-bold'>{user.username}</span>
                <span className='text-sm text-gray-500'><ReactTimeago date={comment?.createdAt} /></span>
            </div>
            <p className='p-[2px] font-thin'>{comment.comment}</p>
            <div className="flex items-center space-x-4 mt-2">
                <div className="flex space-x-2 items-center">
                    <div className='w-7 h-7 p-1 active:bg-gray-200 rounded-full cursor-pointer'><img src="/thumbsup.svg" alt="" /></div>
                    <span className='font-thin text-xs'>{comment?.likes.length}</span>
                </div>

                <div className="flex space-x-2 items-center">
                    <div className='w-7 h-7 p-1 active:bg-gray-200 rounded-full cursor-pointer'><img src="/thumbsdown(2).svg" alt="" /></div>
                    <span className='font-thin text-xs'>{comment?.dislikes.length}</span>
                </div>

                <div className="flex space-x-2 items-center">
                    <span className='uppercase text-xs cursor-pointer font-bold text-gray-600'>Reply</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comment