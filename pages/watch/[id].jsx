import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from '../../axios'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { videoDisLike, videoFailure, videoLike, videoStart, videoSuccess } from '../../redux/videoSlice'
import { subscription } from '../../redux/userSlice'
import Comments from '../../components/comments/Comments'
import { getUser } from '../../utils/getUser'
import Recommendation from '../../components/watch/Recommendation'

const Id = ({ video }) => {
    const videoRef = useRef()
    const volumeSlider = useRef()
    const progress = useRef()
    const { currentVideo } = useSelector(state => state.video)
    const [isMute, setIsMute] = useState(true)
    const [videoDuration, setVideoDuration] = useState('0:00')
    const { currentUser } = useSelector(state => state.user)
    const [totalDuration, setTotalDuration] = useState('')
    const [isPaused, setIsPaused] = useState(false)
    const [videoPercent, setVideoPercent] = useState('')
    const [channel, setChannel] = useState({})
    const [lastComment, setLastComment] = useState({})
    const [bufferLength, setBufferLength] = useState(0)
    const [showLoadingOfVideo, setShowLoadingOfVideo] = useState(true)
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        const getVideo = async () => {
            dispatch(videoStart())
            try {
                if (id) {
                    dispatch(videoSuccess(JSON.parse(video)))
                }
            } catch (e) {
                dispatch(videoFailure())
            }
        }
        getVideo()
    }, [id, dispatch, video])

    useEffect(() => {
        const getChannel = async () => {
            setChannel(await getUser(currentVideo?.userId))
        }
        getChannel()
    }, [currentVideo.userId, id])

    const handleVideoLike = async () => {
        try {
            await axios.put('/user/like/' + currentVideo._id)
            dispatch(videoLike(currentUser._id))
        } catch (e) {
            console.log(e)
        }
    }

    const handleVideoDisLike = async () => {
        try {
            await axios.put('/user/dislike/' + currentVideo._id)
            dispatch(videoDisLike(currentUser._id))
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubscription = async () => {
        if (currentUser?.subscribedUsers?.includes(currentVideo?.userId)) {
            await axios.put('/user/unsub/' + currentVideo.userId)
        } else {
            await axios.put('/user/sub/' + currentVideo.userId)
        }
        dispatch(subscription(currentVideo.userId))
    }

    const togglePlay = () => {
        if (videoRef.current?.paused) {
            videoRef.current?.play()
            setIsPaused(false)
        } else {
            videoRef.current?.pause()
            setIsPaused(true)
        }
    }

    useEffect(() => {
        const onKeyDown = (e) => {
            const tagName = document.activeElement.tagName.toLowerCase()
            if (tagName === "input") return
            if (e.ctrlKey) return
            e.preventDefault();

            switch (e.key.toLowerCase()) {
                case ' ':
                    if (tagName === "button") return
                case 'k':
                    togglePlay()
                    break;
                default:
                    break;
            }

        }
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [])

    const updateBuffer = () => {
        if (videoRef?.current?.readyState === 4) {
            try {
                setBufferLength(videoRef?.current?.buffered?.end(0) / videoRef?.current?.duration * 100)
            } catch (e) {
            }
        }
    }

    const volumeChange = () => {
        volumeSlider.current.value = videoRef.current.volume

        if (videoRef.current.muted || videoRef.current.volume === 0) {
            volumeSlider.current.value = 0
            setIsMute(false)
        }
    }

    volumeSlider.current?.addEventListener("input", e => {
        videoRef.current.volume = e.target.value
        if (e.target.value === 0) {
            setIsMute(false)
        } else {
            setIsMute(true)
        }
    })

    videoRef.current?.addEventListener("volumechange", volumeChange)

    function toggleMute() {
        videoRef.current.muted = !videoRef.current.muted
        setIsMute(!videoRef.current.muted)
        volumeSlider.current.value = 0
    }

    videoRef.current?.addEventListener("timeupdate", () => {
        setVideoDuration(formatDuration(videoRef.current?.currentTime))
        const percent = videoRef.current?.currentTime / videoRef.current?.duration * 100
        setVideoPercent(Math.floor(percent))
        // console.log(videoRef.current.buffered.end(0))
        // console.log(videoRef.current.duration)
        updateBuffer()
        if (videoRef.current?.readyState >= 3) {
            setShowLoadingOfVideo(false)
        }

    })

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })
    function formatDuration(time) {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(
                minutes
            )}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    videoRef.current?.addEventListener("loadeddata", () => {
        setTotalDuration(formatDuration(videoRef.current.duration))
        updateBuffer()
        if (videoRef.current?.readyState >= 3) {
            videoRef.current.play()
        }
    })

    // videoRef.current?.addEventListener("suspend", function (e) {
    //     if (videoRef.current?.readyState === 4) {
    //         setShowLoadingOfVideo(false)
    //         setIsPaused(false)
    //     }
    //     else {
    //         setShowLoadingOfVideo(true)
    //         setIsPaused(true)
    //     }
    // });

    const handleProgress = (e) => {
        const pos = (e.pageX - progress.current.offsetLeft - progress.current.offsetParent.offsetLeft) / progress.current.offsetWidth;
        videoRef.current.currentTime = pos * videoRef.current.duration;
    }

    const handleEnded = () => {
        videoRef.current?.pause()
        setIsPaused(true)
    }


    // const handleOnProgress = () => {
    //     // if(checkIfVideoIsLoading()){
    //     setShowLoadingOfVideo(true)
    //     // }else{
    //     //     setShowLoadingOfVideo(false)
    //     // }
    // }

    return (
        <>
            <Head>
                <title>{currentVideo?.title}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/app.ico" />
            </Head>

            <div>
                <Navbar />
                <div className="flex flex-1 bg-white justify-center">
                    <div className="grid grid-cols-9 w-full gap-4 lg:px-8 lg:py-3 max-w-[1400px]">

                        <div className='col-span-9 lg:col-span-6'>
                            <div className="flex flex-col">
                                <div className='flex bg-black max-w-4xl relative group'>
                                    <video
                                        ref={videoRef}
                                        className='aspect-video w-full'
                                        src={currentVideo?.videoUrl}
                                        onWaiting={() => setShowLoadingOfVideo(true)}
                                        onEnded={handleEnded}
                                        onClick={togglePlay}
                                    ></video>

                                    {showLoadingOfVideo && <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                                        <img src="/loading.gif" className='w-12 h-12' alt="" />
                                    </div>}

                                    <div className={`flex flex-col pt-3 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 left-0 w-full shadow h-[70px] bg-gradient-to-t from-[#000000b6] to-[#00000000] ${isPaused ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="flex my-1 px-3">
                                            <div ref={progress} onMouseDown={handleProgress} onMouseUp={handleProgress} className="flex h-1 w-full cursor-pointer bg-gray-400 bg-opacity-70 progress-bar hover:scale-y-[1.30] transition-all duration-100 relative">
                                                <div style={{ width: `${parseInt(bufferLength).toString()}%` }} className="h-full bg-gray-200 bg-opacity-60 absolute top-0 left-0"></div>
                                                <div style={{ width: `${parseInt(videoPercent).toString()}%` }} className='flex h-full bg-[red] transition-all duration-600 relative'>
                                                <div className='group-hover:w-3 h-3 progress-indicator rounded-full bg-[red] absolute -right-1 -top-1' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex text-white justify-between items-center px-3 mt-1">
                                            <div className="flex space-x-3">
                                                <button onClick={togglePlay} className='hover:scale-110 transition-all duration-100'>
                                                    {isPaused ? <svg className="play-icon w-8 h-8" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                                                    </svg> : <svg className="pause-icon w-8 h-8" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                                                    </svg>}
                                                </button>

                                                <div className="flex">
                                                    <button onClick={toggleMute} className='hover:scale-110 transition-all duration-100'>
                                                        {!isMute ? <svg className="volume-muted-icon w-7 h-7" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                                                        </svg> : <svg className="volume-high-icon w-7 h-7" viewBox="0 0 24 24">
                                                            <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                                        </svg>}
                                                    </button>

                                                    <input ref={volumeSlider} min='0' max='1' step='any' className='w-20' type="range" />
                                                </div>

                                                <div className="flex items-center space-x-1">
                                                    <span>{videoDuration}</span>
                                                    <span>/</span>
                                                    <span>{totalDuration}</span>
                                                </div>
                                            </div>
                                            <div className="flex"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-2 px-2 lg:px-0">

                                    <div className='flex space-x-1'>
                                        <span className='text-sm text-blue-700'>#videoplayer</span>
                                        <span className='text-sm text-blue-700'>#videoplayer</span>
                                        <span className='text-sm text-blue-700'>#videoplayer</span>
                                    </div>

                                    <div className="flex">
                                        <h1 className='font-bold text-xl'>{currentVideo?.title}</h1>
                                    </div>

                                    <div className="flex space-x-2 items-start mt-2 w-fit">
                                        <span className='text-gray-800 text-md font-semibold min-w-fit'>{currentVideo?.views} views</span>
                                        <span className='text-gray-800 text-md font-semibold min-w-fit'>{moment(currentVideo?.createdAt).format('LL')}</span>
                                        <p className='max-h-[32px] line-clamp-1 text-sm mt-[3px]'>{currentVideo?.desc}
                                        </p>
                                    </div>

                                    <div className="flex mt-2 space-x-3 items-center">
                                        <div className='flex items-center space-x-1 cursor-pointer' onClick={handleVideoLike}>
                                            <div className='w-8 h-8 p-1 rounded-full flex items-center justify-center active:bg-gray-300'><img src={currentVideo?.likes?.includes(currentUser._id) ? "/filledthumbsup.svg" : "/thumbsup.svg"} alt="" /></div>
                                            <span className='font-semibold text-sm'>{currentVideo?.likes?.length}</span>
                                        </div>

                                        <div className='flex items-center space-x-1 cursor-pointer' onClick={handleVideoDisLike}>
                                            <div className='w-8 h-8 p-1 rounded-full flex items-center justify-center active:bg-gray-300'><img src={currentVideo?.dislikes?.includes(currentUser._id) ? "/filledthumbsdown.svg" : "/thumbsdown(2).svg"} alt="" /></div>
                                            <span className='font-semibold text-sm'>{currentVideo?.dislikes?.length}</span>
                                        </div>

                                        <div className='flex items-center space-x-1 cursor-pointer'>
                                            <div className='w-8 h-8 p-1 rounded-full flex items-center justify-center active:bg-gray-300'><img src="/share.svg" alt="" /></div>
                                            <span className='font-semibold text-sm'>Share</span>
                                        </div>

                                        <div className='flex items-center space-x-1 cursor-pointer'>
                                            <div className='w-8 h-8 p-1 rounded-full flex items-center justify-center active:bg-gray-300'><img src="/yourclip.svg" alt="" /></div>
                                            <span className='font-semibold text-sm'>Clip</span>
                                        </div>

                                        <div className='flex items-center space-x-1 cursor-pointer'>
                                            <div className='w-8 h-8 p-1 rounded-full flex items-center justify-center active:bg-gray-300'><img src="/save.svg" alt="" /></div>
                                            <span className='font-semibold text-sm'>Save</span>
                                        </div>
                                    </div>

                                    <div className="flex mt-2 justify-center items-start md:justify-between flex-col md:flex-row lg:flex-row flex-1 md:space-x-2 space-y-2 md:space-y-0">
                                        <div className="flex py-1 px-3 h-[50px] w-full justify-between border border-gray-300 rounded-md">
                                            <div className="flex items-center">
                                                <img className='w-8 h-8 rounded-full' src={channel?.img ? channel.img : 'https://cdn-icons-png.flaticon.com/512/847/847969.png'} alt="" />
                                                <div className="flex flex-col ml-2">
                                                    <span className='text-[15px] font-bold text-gray-800'>{channel?.username}</span>
                                                    <span className='text-xs text-gray-500'>{channel?.subscribers} subscriber</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button onClick={handleSubscription} className={`py-[7px] px-4 text-[14px] tracking-normal rounded-[2px] uppercase text-white font-[600] ${currentUser.subscribedUsers?.includes(currentVideo?.userId) ? 'bg-gray-200 text-gray-600' : 'bg-subscribe'}`}>{currentUser?.subscribedUsers?.includes(currentVideo?.userId) ? 'Subscribed' : 'Subscribe'}</button>
                                                <img className='w-6 h-6' src="/notification.svg" alt="" />
                                            </div>
                                        </div>

                                        <div className="flex w-full py-1 h-[50px] rounded-md border border-gray-300">
                                            <div className="flex flex-col px-3 border-r border-gray-300">
                                                <span className='font-bold text-sm'>Comments</span>
                                                <span className='font-medium text-xs'>125</span>
                                            </div>

                                            <div className="flex flex-1 p-1 items-start">
                                                <img className='w-5 h-5 rounded-full' src={lastComment?.img} alt="" />
                                                <p className='line-clamp-2 text-xs ml-2'>{lastComment?.comment}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='w-full block lg:hidden'>
                                <Recommendation tags={currentVideo.tags} />
                            </div>

                            <Comments video={currentVideo} channel={channel} setLastComment={setLastComment} />
                        </div>
                        <div className='col-span-3 hidden lg:block'>
                            <Recommendation tags={currentVideo.tags} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Id

export async function getServerSideProps(context) {
    const { params } = context
    const video = await axios.get('/video/find/' + params.id);
    return {
        props: {
            video: JSON.stringify(video.data)
        }, // will be passed to the page component as props
    }
}