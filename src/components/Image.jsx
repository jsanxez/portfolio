import { useState } from 'preact/hooks'

export default function Image ({ imageSet }) {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => { setShowModal(true) }
  const handleSlider = () => { setShowModal(false) }

  return (
    <>
      <div>
        <img src={imageSet[0].path.src} alt={imageSet[0].alt} onClick={handleClick} className='md:w-80 rounded-2xl aspect-video object-cover cursor-pointer border border-purple-700' loading='lazy' />
        {imageSet.length > 1 && <div class='w-1 h-1 rounded-full bg-purple-700 mx-auto mt-2' />}
        {showModal && <Slider imageSet={imageSet} onClose={handleSlider} />}
      </div>
    </>
  )
}

function Slider ({ imageSet, onClose }) {
  imageSet = imageSet.map(img => ({ ...img, isVisible: false }))
  const modImages = imageSet.map(img => ({ ...img }))
  modImages[0].isVisible = true
  const [images, setImages] = useState(modImages)
  const [index, setIndex] = useState(0)

  const updateIndex = (n, length) => { // n: [-1 | 1]
    let i = index
    i = i + n

    if (i < length && i >= 0) {
      setIndex(i)
      return i
    } else {
      const j = (!(i < length)) ? 0 : imageSet.length - 1
      setIndex(j)
      return j
    }
  }

  const makeSlideVisible = (i) => {
    const updatedImages = imageSet.map(img => ({ ...img }))
    updatedImages[i].isVisible = true
    setImages(updatedImages)
  }

  const handlePrevious = (e) => {
    e.stopPropagation()
    const i = updateIndex(-1, imageSet.length)
    makeSlideVisible(i)
  }

  const handleNext = (e) => {
    e.stopPropagation()
    const i = updateIndex(1, imageSet.length)
    makeSlideVisible(i)
  }

  return (
    <>
      <div onClick={() => { onClose() }} className='fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-xl z-10'>
        <div className='flex items-center  justify-center gap-4 mx-4 w-[1000px] h-[90vh]'>
          <button onClick={handlePrevious} className='absolute sm:static left-[6%] shrink-0 inline-flex justify-center items-center rounded-full bg-white w-10 h-10'>
            <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z' /></svg>
          </button>
          <div className='self-stretch grow flex flex-col justify-center gap-4'>
            <p className='text-center text-white'>{`${index + 1} / ${imageSet.length}`}</p>
            {images.map(img => (
              <Slide key={img.path} path={img.path} altText={img.alt} isVisible={img.isVisible} />
            ))}
          </div>
          <button onClick={handleNext} className='absolute sm:static right-[6%] shrink-0 inline-flex justify-center items-center rounded-full bg-white w-10 h-10'>
            <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z' /></svg>
          </button>
        </div>
      </div>
    </>
  )
}

function Slide ({ path, altText, isVisible }) {
  const handleClick = (e) => {
    e.stopPropagation()
  }
  return (
    <div className={`${!isVisible && 'hidden'} max-h-[calc(100%-40px)]`}>
      <div className='h-[calc(100%-40px)]'>
        <img src={path.src} alt={altText} onClick={handleClick} className='h-full mx-auto object-contain' loading='lazy' />
      </div>
      <p className='text-white text-center mt-4'>{altText}</p>
    </div>
  )
}
