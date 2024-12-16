import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
      <div className='header__content z-30'>
        <h4>Up to 40% off</h4>
        <h1>New Collection For winter</h1>
        <p>Discover all the new arrivals of ready-to-wear and accessories</p>
        <button className='btn'><Link to="/shop">Shop Now</Link></button>
      </div>
      <div>
       <img src={bannerImg}></img>
      </div>
    </div>
  )
}

export default Banner
