import {  useEffect, useCallback } from 'react'
import { useParams, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import viteLogo from '/vite.svg'
// import './index.css'

function Profile() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log('location', location)
  console.log('params', params)
  console.log('searchParams', searchParams)

  useEffect(() => {
    const canvas:  HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    // img.src = "https://maimai.cn/community/logo-pc.svg"
    img.src = viteLogo;
    img.onload = function () {
      console.log('img', img)
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      console.log('imageData', imageData)
      // ctx.beginPath();
      // ctx.moveTo(30, 96);
      // ctx.lineTo(70, 66);
      // ctx.lineTo(103, 76);
      // ctx.lineTo(170, 15);
      ctx.stroke();
    }
  }, [])

  const clickCanvas = useCallback(() => {
  }, [])

  return (
    <>
      Profile
      <button onClick={() => {
        navigate('/about')
      }}>跳转about</button>

      <canvas id="canvas" role="img-" height="200" onClick={() => clickCanvas()}></canvas>

      
    </>
  )
}

export default Profile
