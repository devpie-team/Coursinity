'use client'

import { BadgeIcon } from '@/components/icons/BadgeIcon'
import { Typography } from '@/components/ui'

type Position = 'top' | 'middle' | 'bottom'

const POSITIONS: Record<Position, string> = {
  top: 'top-[-30px] z-10',
  middle: 'top-[570px] z-20',
  bottom: 'top-[670px] z-30'
}

const getRelativePosition = (index: number, activeIndex: number): Position => {
  if (index === activeIndex) return 'top'
  if ((index + 2) % 3 === activeIndex) return 'middle'
  return 'bottom'
}

type StackCardsProps = {
  activeIndex: number
  setActiveIndex: (idx: number) => void
}

export const StackCards = ({ activeIndex, setActiveIndex }: StackCardsProps) => (
  <>
    {/* Картка 1 */}
    <div
      className={`
        absolute left-1/2 -translate-x-1/2 h-[770px] w-[440px]
        bg-black bg-opacity-[32%] rounded-3xl backdrop-blur-[40px]
        flex flex-col justify-between cursor-pointer transition-all duration-500 ease-in-out mb-[100px]
        ${POSITIONS[getRelativePosition(0, activeIndex)]}
        ${activeIndex === 0 ? 'rounded-t-3xl' : ''}
      `}
      onClick={() => setActiveIndex(0)}>
      <div className="flex flex-col gap-2 px-[18px] pt-12 text-center justify-center items-center">
        <Typography variant="h4" weight="medium" className="opacity-65 mb-1">
          Step 1
        </Typography>
        <Typography variant="h4" weight="medium">
          Pinpoint the Skill Gaps
        </Typography>
        <Typography variant="body3" weight="regular" className="opacity-80 w-[305px] text-center">
          We uncover your goals and the skills your team needs next.
        </Typography>
      </div>
      <div className="flex justify-center pb-[255px]">
        <img src="/assets/stack_section/stack_1.png" alt="Step 1" className="object-cover " />
      </div>
      <img
        src="/assets/stack_section/stack_4.png"
        alt="stack_4"
        className="absolute object-cover top-[350px] left-[15px]"
      />
      <img
        src="/assets/stack_section/stack_5.png"
        alt="stack_5"
        className="absolute object-cover top-[250px] right-[20px]"
      />
    </div>

    {/* Картка 2 */}
    <div
      className={`
        absolute left-1/2 -translate-x-1/2 h-[730px] w-[440px]
        bg-black bg-opacity-[32%] rounded-3xl backdrop-blur-[40px]
        flex flex-col justify-between cursor-pointer transition-all duration-500 ease-in-out
        ${POSITIONS[getRelativePosition(1, activeIndex)]}
        ${activeIndex === 1 ? 'rounded-t-3xl' : ''}
      `}
      onClick={() => setActiveIndex(1)}>
      <div className="flex flex-col gap-3 px-[18px] pt-12 text-center justify-center items-center">
        <Typography variant="h4" weight="medium" className="opacity-65 ">
          Step 2
        </Typography>
        <Typography variant="h4" weight="medium">
          We design tailored learning experiences
        </Typography>
        <button className=" h-14 rounded-full bg-black bg-opacity-[32%] text-white text-caption px-6 py-5 text-center mt-4 hover:bg-gradient-to-r  from-[#0D0D0D] to-[#3D3D3D] active:bg-none active:bg-primary-purple transition-all">
          Book a Demo Now
        </button>
      </div>
      <div className="flex justify-center">
        <img src="/assets/stack_section/stack_2.png" alt="Step 2" className="object-cover " />
      </div>

      <div className=" absolute flex justify-center items-center gap-[10px] bg-white h-14  rounded-full p-4 text-[#18233D] top-[460px] left-[65px]">
        <span className="absolute w-4 h-4 bg-white rounded-full top-[40px] left-[0px]"></span>
        <span className="absolute w-2 h-2 bg-white rounded-full top-[56px] left-[-8px]"></span>
        <BadgeIcon />
        <Typography variant="caption" weight="medium">
          Individual plan
        </Typography>
      </div>
    </div>

    {/* Картка 3 */}
    <div
      className={`
        absolute left-1/2 -translate-x-1/2 h-[770px] w-[440px]
        bg-black bg-opacity-[32%] rounded-3xl backdrop-blur-[40px]
        flex flex-col justify-between cursor-pointer transition-all duration-500 ease-in-out
        ${POSITIONS[getRelativePosition(2, activeIndex)]}
        ${activeIndex === 2 ? 'rounded-t-3xl' : ''}
      `}
      onClick={() => setActiveIndex(2)}>
      <div className="flex flex-col gap-3 px-[18px] pt-12 text-center justify-center items-center">
        <Typography variant="h4" weight="medium" className="opacity-65 ">
          Step 3
        </Typography>
        <Typography variant="h4" weight="medium">
          Maximize the Return
        </Typography>
        <button className=" h-14 rounded-full bg-black bg-opacity-[32%] text-white text-caption px-6 py-5 text-center mt-4 hover:bg-gradient-to-r  from-[#0D0D0D] to-[#3D3D3D] active:bg-none active:bg-primary-purple">
          Book a Demo Now
        </button>
      </div>
      <div className="flex justify-center pb-[195px]">
        <img src="/assets/stack_section/stack_3.png" alt="Step 3" className="object-cover " />
      </div>
    </div>
  </>
)
