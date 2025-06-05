'use client'

import { Typography } from '@/components/ui'
import { CompanyCard } from '../CompanyCard/CompanyCard'
import Lottie from 'lottie-react'

import { useEffect, useState } from 'react'

export const ContactVisual = () => {
  const [animationData1, setAnimationData1] = useState<any>(null)
  const [animationData2, setAnimationData2] = useState<any>(null)

  useEffect(() => {
    fetch('/assets/lottie/contact_form/contact_form_1.json')
      .then((res) => res.json())
      .then(setAnimationData1)
    fetch('/assets/lottie/contact_form/contact_form_2.json')
      .then((res) => res.json())
      .then(setAnimationData2)
  }, [])

  return (
    <div className="relative ">
      <div className="absolute inset-0 z-0 pointer-events-none  overflow-hidden rotate-180 ">
        <div
          className="
        bg-[radial-gradient(80%_60%_at_50%_70%,rgba(255,255,255,0.7)_60%,rgba(28,141,193,0.7)_85%,rgba(165,120,242,0.7)_100%)] blur-[80px]
        rounded-[inherit]
        w-full h-[755px] -translate-y-[50px]
      "
        />
      </div>
      <div className="relative z-10 min-w-[490px] p-8 gap-[120px] flex flex-col justify-between items-center overflow-hidden">
        <div className="flex flex-col gap-8 z-10 text-center">
          <Typography variant="h3" weight="medium">
            Ready When You Are
          </Typography>
          <Typography variant="body2" weight="regular">
            Take sneak peek on what Coursinity personalized training can really do
          </Typography>
        </div>
        <CompanyCard />
        <div className="relative min-w-[420px] h-[56px] bg-[#E4EDF2] p-4 rounded-full border [border-image-source:linear-gradient(68.38deg,_rgba(28,141,193,0)_11%,_#1C8DC1_50.72%,_#1C8DC1_72.35%,_rgba(14,67,92,0)_92.79%)] [border-image-slice:1] ">
          <Typography variant="body3" weight="regular">
            You’ll hear from us within 24 hours. Humans only.
          </Typography>
          <div className="absolute w-5 h-5 rounded-full bg-[#E4EDF2] bg-opacity-70 left-[-3%]"></div>
          <div className="absolute w-[10px] h-[10px] rounded-full bg-[#E4EDF2] bg-opacity-70 left-[-5%] bottom-[-30%]"></div>
        </div>
        {animationData1 && (
          <Lottie
            animationData={animationData1}
            className="absolute w-[110px] h-[100px] right-[-30px] bottom-[100px] opacity-30"
            loop
            autoplay
          />
        )}
        {animationData2 && (
          <Lottie
            animationData={animationData2}
            className="absolute w-[180px] h-[80px] left-[20px] top-[200px] rotate-[-9.75deg] opacity-30"
            loop
            autoplay
          />
        )}
      </div>
    </div>
  )
}
