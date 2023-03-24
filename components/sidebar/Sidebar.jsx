import Link from 'next/link'

const links1 = [
    {
        title: 'Home',
        icon: '/home.svg',
        link: '/'
    },
    {
        title: 'Explore',
        icon: '/explore.svg',
        link: '/trend'
    },
    {
        title: 'Shorts',
        icon: '/shorts.svg',
        link: '/'
    },
    {
        title: 'Subscription',
        icon: '/subscription.svg',
        link: '/subscription'
    },
]

const links2 = [
    {
        title: 'Library',
        icon: '/library.svg'
    },
    {
        title: 'History',
        icon: '/history.svg'
    },
    {
        title: 'Your videos',
        icon: '/yourvideos.svg'
    },
    {
        title: 'Watch later',
        icon: '/watchlater.svg'
    },
    {
        title: 'Your clips',
        icon: '/yourclip.svg'
    },
    {
        title: 'Likes videos',
        icon: '/thumbsup.svg'
    },
]

const explore = [
    {
        title: 'Gaming',
        icon: '/gaming.svg'
    },
    {
        title: 'Sports',
        icon: '/sports.svg'
    },
]

const Sidebar = ({page}) => {

  return (
    <div className='md:min-w-[45px] lg:min-w-[246px] h-[calc(100vh-55px)] sticky top-[55px] hidden md:block overflow-y-auto scrollbar-thin scrollbar-thumb-blue-50 hover:dark:scrollbar-thumb-gray-300 scrollbar-track-gray-300 dark:scrollbar-thumb-white dark:scrollbar-track-white'>
        <div className="flex flex-col flex-1 mt-3">
            {links1.map((link)=>(
                <Link href={link.link} key={link.icon}>
                   <div  className={`flex items-center py-2 sm:px-5 hover:bg-gray-100 cursor-pointer ${page===link.title && 'bg-gray-200'}`}>
                        <div className='lg:min-w-[50px]'>
                            <img className='w-6 h-6' src={link.icon} alt="" />
                        </div>
                        <span className='text-[15px] hidden lg:block'>
                            {link.title}
                        </span>
                   </div>
                </Link>
            ))}
        </div>
        <hr className='my-2' />
        <div className="flex flex-col flex-1 mt-3">
            {links2.map((link)=>(
                <div className='flex items-center py-2 sm:px-5 hover:bg-gray-100 cursor-pointer' key={link.icon}>
                    <div className='lg:min-w-[50px]'>
                        <img className='w-6 h-6' src={link.icon} alt="" />
                    </div>
                    <span className='text-[15px] hidden lg:block'>
                        {link.title}
                    </span>
                </div>
            ))}
        </div>
        <hr className='my-2' />
        <div className="flex flex-col flex-1 mt-3 justify-center">
            <h3 className='px-5 mb-2 font-bold uppercase text-[15px] text-gray-600 hidden lg:block'>Explore</h3>
            {explore.map((link)=>(
                <div className='flex items-center md:justify-center lg:justify-start py-2 px-5 hover:bg-gray-100 cursor-pointer' key={link.icon}>
                    <div className='lg:min-w-[45px]'>
                        <img className='w-6 h-6' src={link.icon} alt="" />
                    </div>
                    <span className='text-[15px] hidden lg:block'>
                        {link.title}
                    </span>
                </div>
            ))}
        </div>
     
    </div>
  )
}

export default Sidebar