import React, { useState, useEffect } from "react"

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [images] = useState(["meuble4.jpg", "meuble5.jpg", "meuble6.jpg"])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [images])

  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }
  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  return (
    <div className="relative overflow-hidden w-full max-w-4xl mx-auto h-96 bg-[#FBF9F1] border-4 border-[#E5E1DA] rounded-lg">
      <div
        className="bg-no-repeat bg-cover bg-center h-full transition-all duration-500"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#92C7CF] hover:bg-[#AAD7D9] text-white p-2 text-xl rounded-full"
        >
          ‹
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#92C7CF] hover:bg-[#AAD7D9] text-white p-2 text-xl rounded-full"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default Carousel
