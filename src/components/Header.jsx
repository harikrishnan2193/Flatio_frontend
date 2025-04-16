import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
      const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <>
      <div id='header' className="bg-gray-700 py-2 text-white mx-auto lg:px-lg-padding xl:px-xl-padding">
                <nav className="flex flex-col sm:flex-row items-center justify-between py-3 px-8 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-2">
                        <i className="fa-solid fa-building text-5xl"></i>
                        <Link to={'/cp'}><p className="text-2xl font-bold font-raleway">Flatio</p></Link>
                    </div>

                    <div className='hidden text-white xl:flex flex-col sm:flex-row space-x-0 sm:space-x-8 space-y-2 sm:space-y-0'>
                        <Link to={'/cp'}>
                            <button className="btn btn-outline-light me-2">
                                <i className="fa-solid fa-user-tie"></i> CP
                            </button>
                        </Link>

                        <Link to={'/projects'}>
                            <button className="btn btn-outline-light me-2">
                                <i className="fa-solid fa-house-user"></i> Projects
                            </button>
                        </Link>

                        <Link to={'/lead'}>
                            <button className="btn btn-outline-light me-2">
                                <i className="fa-solid fa-person"></i> Lead
                            </button>
                        </Link>
                    </div>

                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="xl:hidden text-white text-3xl">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </nav>

                {/* Sidebar Menu */}
                <div className={`fixed top-0 right-0 w-3/4 sm:w-1/3 h-full bg-gray-500 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
                    <div className="p-5">
                        <button onClick={() => setIsMenuOpen(false)} className="text-white text-3xl">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <nav className="flex flex-col items-start space-y-10 p-5 text-white">
                        <Link to={'/cp'}>
                            <button className="btn btn-outline-light me-2">
                                <i className="fa-solid fa-user-tie"></i> CP
                            </button>
                        </Link>

                        <Link to={'/projects'}>
                            <button className="btn btn-outline-light me-2">
                                <i className="fa-solid fa-house-user"></i> Projects
                            </button>
                        </Link>

                        <Link to={'/lead'}>
                            <button className="btn btn-outline-light me-2">
                                <i className="fa-solid fa-person"></i> Lead
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
    </>
  )
}

export default Header