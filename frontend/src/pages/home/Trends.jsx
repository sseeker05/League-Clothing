import React from 'react'
import card1 from "../../assets/card-1.png"
import card2 from "../../assets/card-2.png"
import card3 from "../../assets/card-3.png"


const Trends = () => {
  const cards = [
    {
      id: 1,
      image: card1,
      trend: "Trending",
      title: "Mastering the Art of Capsule Wardrobes",
    },
    {
      id: 1,
      image: card2,
      trend: "Trending",
      title: "Unveiling the Hottest Beachwear Trends",
    },{
      id: 1,
      image: card3,
      trend: "Trending",
      title: "Navigating the World of Women's Tailoring",
    }
  ]
  return (
    <section className='section__container hero__container'HeroSection>
     
      {
         cards.map ((card) => (
          <div key={card.id} className='hero__card'>
          <img src={card.image} alt='' />
         <div className='hero__content'>
          <p>{card.trend}</p>
          <h4>{card.title}</h4>
          <a href='#'>Read More</a>
         </div>
         
          </div>
        
        ))
      }
       
    </section>
  )
}

export default Trends
