import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { storage } from '../../firebase'
import axios from '../../axios'

const Navbar = () => {
  const userImgRef = useRef()
  const router = useRouter()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [query, setQuery] = useState('')
  const { currentUser } = useSelector(state => state.user)
  const [video, setVideo] = useState(null)
  const [img, setImg] = useState(null)
  const [videoPercent, setVideoPercent] = useState(0)
  const [imgPercent, setImgPercent] = useState(0)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState([])

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const uploadFile = (file, urlType) => {
    const filename = new Date().getTime() + file.name
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === 'thumbnail' ? setImgPercent(parseInt(progress)) : setVideoPercent(parseInt(progress))
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs(prev => ({ ...prev, [urlType]: downloadURL }))
        });
      }
    );
  }
  useEffect(() => {
    video && uploadFile(video, 'videoUrl')
  }, [video])

  useEffect(() => {
    img && uploadFile(img, 'thumbnail')
  }, [img])

  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    try {
      axios.post('/video', { ...inputs, tags }).then((respone) => {
        router.push('/watch/' + respone.data._id)
      })
    } catch (error) { }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query === '') return

    router.push(`/search?q=${query}`)
  }

  return (
    <>
      <div className='flex justify-between items-center px-6 h-[55px] sticky top-0 bg-white bg-opacity-95 backdrop-blur-[5px] z-40'>

        <div className='flex items-center space-x-5 mr-2'>
          <svg className='w-6 h-6 font-extrabold' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g className="style-scope yt-icon"><path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z" className="style-scope yt-icon" /></g></svg>
          <img className='w-[90px] h-11' src='/youtube.svg' alt='' />
        </div>

        <div className='flex-1 max-w-2xl items-center space-x-3 hidden md:flex'>
          <form onSubmit={handleSearch} className='flex items-center border border-gray-300 bg-white w-full shadow-inner rounded-full overflow-hidden focus-within:border-blue-500'>
            <input onChange={(e) => setQuery(e.target.value)} className='outline-none flex-1 px-2 pl-5 pb-[2px]' type="text" placeholder='Search' />
            <button className='p-[18px] py-[7px] bg-gray-50 border-l border-gray-300 cursor-pointer'>
              <img className='w-6 h-6' src="/search.svg" alt="" />
            </button>
          </form>

          <div className='flex items-center justify-center cursor-pointer p-2 w-10 h-10 bg-gray-50 active:bg-gray-200 rounded-full'>
            <img className='text-gray-600' src="/mike.svg" alt="" />
          </div>
        </div>

        <div className='flex items-center justify-end space-x-1 md:space-x-4 md:px-3'>
          <div onClick={() => setShowUploadModal(prev => !prev)} className='flex gropu items-center justify-center cursor-pointer p-2 w-10 h-10 hover:bg-gray-50 active:bg-gray-200 rounded-full'>
            <img src="/camera.svg" alt="" />
          </div>
          <div className='flex items-center justify-center curso=r-pointer p-2 w-10 h-10 hover:bg-gray-50 active:bg-gray-200 rounded-full'>
            <img src="/notification.svg" alt="" />
          </div>
          {!currentUser ? <div>
            <button onClick={() => router.push('/signin')} className='bg-blue-50 border-2 border-blue-600 px-4 py-1 text-blue-600 font-semibold rounded active:bg-blue-100 hover:shadow'>Sign in</button>
          </div> :
            <div>
              <img ref={userImgRef} className='w-9 h-9 ml-1 cursor-pointer rounded-full' src={currentUser.img ? currentUser.img : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt='' />
            </div>}
        </div>

      </div>

      <div className={`flex bg-black bg-opacity-30 overflow-auto backdrop-blur-sm w-full h-screen absolute top-0 z-50 justify-center items-center transition-all duration-300 ${showUploadModal ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="flex w-96 rounded bg-white p-3 relative flex-col shadow-lg">
          <h1 className='font-bold text-lg'>Upload new video</h1>
          <img onClick={() => setShowUploadModal(prev => !prev)} className='w-6 h-6 absolute top-3 right-3 hover:scale-125 cursor-pointer' src="/close.svg" alt="" />

          <hr className='my-3' />

          <form className='flex flex-col mb-3' onSubmit={handleUploadSubmit}>
            <label className='text-gray-500'>Video file</label>
            {videoPercent > 0 ? videoPercent === 100 ? 'Completed ' + videoPercent + '%' :
              'Uploading: ' + videoPercent + '%'
              : <input onChange={(e) => setVideo(e.target.files[0])} className='mt-1 border border-gray-300 px-3 py-1 bg-gray-50 outline-blue-500 rounded shadow' accept='video/*' type="file" />}
            <input name='title' onChange={handleChange} className='mt-2 border border-gray-300 px-3 py-1 bg-gray-50 outline-blue-500 rounded shadow' type="text" placeholder='Title' />
            <textarea name='desc' onChange={handleChange} className='mt-2 border border-gray-300 px-3 py-1 bg-gray-50 outline-blue-500 rounded shadow h-14' placeholder='Description' />
            <textarea onChange={handleTags} className='mt-2 border border-gray-300 px-3 py-1 bg-gray-50 outline-blue-500 rounded shadow h-14' placeholder='Tags e.g funny,music' />
            <label className='mt-2 text-gray-500'>Thumbnail</label>
            {imgPercent > 0 ? imgPercent === 100 ? 'Completed ' + imgPercent + '%' :
              'Uploading: ' + imgPercent + '%'
              : <input onChange={(e) => setImg(e.target.files[0])} className='mt-1 border border-gray-300 px-3 py-1 bg-gray-50 outline-blue-500 rounded shadow' accept='image/*' type="file" />}
            <hr className='my-3' />
            <button className='py-2 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700 transition-all duration-300'>Upload</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Navbar