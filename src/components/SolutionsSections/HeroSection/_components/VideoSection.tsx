'use client'
import './VideoSection.style.css'
export const VideoSection = () => {
  return (
    <section className="relative flex items-center justify-center ] mt-[60px] h-[650px] overflow-hidden">
      <div className=" absolute bg-white/20 rounded-t-[20px] w-[850px] h-[600px] backdrop-blur-[72px] z-30  bottom-0 custom-shadow"></div>
      <div className="absolute bg-gradient-to-b from-white/10 to-white/0 rounded-t-[20px] w-[880px] h-[505px] backdrop-blur-[40px]  z-20  bottom-[40px]"></div>
      <div className="absolute bg-gradient-to-b from-white/5 to-white/0 rounded-t-[20px] w-[910px] h-[540px]   bottom-[-40px] z-10 shadow-[0_4px_80px_16px_rgba(9,19,21,0.16)]"></div>
    </section>
  )
}
