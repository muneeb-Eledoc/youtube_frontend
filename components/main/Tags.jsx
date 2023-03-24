import React, { useRef, useState } from 'react'

const Tags = () => {
  const [shouldLeftArrowVisible, setShouldLeftArrowVisible] = useState(true)
  const [shouldRightArrowVisible, setShouldRightArrowVisible] = useState(true)
  const tagsRef = useRef()
    const tags = [
        'All',
        'Gaming',
        'CSS',
        'Music',
        'Comedy',
        'Live',
        'Functions',
        'Mixes',
        'Sales',
        'Pop music',
    ]
  
  const handleArrow = ()=>{
    if(tagsRef.current.scrollLeft === 0){
      setShouldLeftArrowVisible(false)
    }else{
      setShouldLeftArrowVisible(true)
    }
    if(tagsRef.current.scrollLeft === tagsRef.current.scrollLeftMax){
      setShouldRightArrowVisible(false)
    }else{
      setShouldRightArrowVisible(true)
    }
  }

  const handleScrollForWard = ()=>{
      tagsRef.current.scroll({
        left: tagsRef.current.scrollLeft + 150,
        behavior: 'smooth'
      })
      setTimeout(() => {
        handleArrow()
      }, 500);
      // console.log(tagsRef.current.scrollLeft, tagsRef.current.offsetWidth, tagsRef.current.scrollLeftMax+tagsRef.current.scrollLeftMax)
    }

  const handleScrollBackWard = ()=>{
      tagsRef.current.scroll({
        left: tagsRef.current.scrollLeft - 150,
        behavior: 'smooth'
      })
      setTimeout(() => {
        handleArrow()
      }, 500);
  }
  return (
    <div className='border-y backdrop-blur-[5px] w-full cursor-grab max-w-[calc(100vw-0px)] md:max-w-[calc(100vw-60px)] lg:max-w-[calc(100vw-246px)] border-gray-200 py-2 px-2 bg-white sticky top-[55px] bg-opacity-95'>
       <div className="flex flex-1 relative">
       {shouldLeftArrowVisible && <button onClick={handleScrollBackWard} className='absolute -top-1 left-0 bg-white shadow hover:bg-gray-50 active:bg-gray-100 p-1 rounded-full'><img className='w-8 h-8' src="/left-arrow.svg" alt="" /></button>}
        {shouldRightArrowVisible && <button onClick={handleScrollForWard} className='absolute -top-1 right-0 bg-white shadow hover:bg-gray-50 active:bg-gray-100 p-1 rounded-full'><img className='w-8 h-8' src="/right-arrow.svg" alt="" /></button>}
        <div ref={tagsRef} className='flex space-x-3 items-center px-3 flex-1 overflow-x-scroll scrollbar-hide'>
          {tags.map((tag)=>(
            <div className='px-3 py-1 bg-gray-100 min-w-fit hover:bg-gray-200 border-[1px] border-gray-300 rounded-full text-[15px] cursor-pointer' key={tag}>
                {tag}
            </div>
          ))}
        </div>
       </div>
    </div>
  )
}

export default Tags