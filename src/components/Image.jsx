import { useState } from 'preact/hooks'

export default function Image ({ imageSet }) {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => { setShowModal(true) }

  return (
    <>
      <div>
        <img src={imageSet[0].path} alt={imageSet[0].alt} onClick={handleClick} className='image w-80 rounded-2xl aspect-video object-cover border border-purple-700' />
        {imageSet.length > 1 && <div class='w-1 h-1 rounded-full bg-purple-700 mx-auto mt-2' />}
        {showModal && <Lightbox imageSet={imageSet} />}
      </div>
    </>
  )
}

function Lightbox ({ imageSet }) {
  const [index, setIndex] = useState(0)
  const iterateImage = () => {
    if (index < imageSet.length - 1) { setIndex(index + 1) } else { setIndex(0) }
  }

  console.log(imageSet)

  return (
    <>
      <div className='fixed inset-0 flex gap-4 items-center justify-center bg-black/80'>
        <Arrow direction='previous' />
        <div className='w-[1000px] border-4 border-yellow-300 overflow-hidden'>
          <p className='text-center text-white mb-4'>{`${index + 1} / ${imageSet.length}`}</p>
          {imageSet.map(img => (
            <div key={img.path}>
              <img src={img.path} className='w-full aspect-video object-contain' />
              <p className='text-white text-center mt-4'>{img.alt}</p>
            </div>
          ))}
        </div>
        <Arrow direction='next' />
      </div>
    </>
  )
}

function Arrow ({ direction }) {
  return (
    <button className='inline-flex justify-center items-center rounded-full bg-white w-10 h-10'>
      {direction === 'next'
        ? <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z' /></svg>
        : <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'><path d='M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z' /></svg>}
    </button>
  )
}
