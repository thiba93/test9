import React, { useState, useEffect } from "react"

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images] = useState([
    "meuble1.jpg",
    "meuble2.jpg",
    "meuble3.jpg",
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [images])

  const goPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }
  const goNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto h-96">
      <div className="bg-no-repeat bg-cover bg-center h-full" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
        <button onClick={goPrev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 text-xl">
          ‹
        </button>
        <button onClick={goNext} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 text-xl">
          ›
        </button>
      </div>
    </div>
  )
}

export default Carousel
