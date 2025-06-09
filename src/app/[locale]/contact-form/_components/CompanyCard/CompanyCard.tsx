import { Typography } from '@/components/ui'

export const CompanyCard = () => {
  return (
    <div className="bg-white rounded-[6px] p-4 max-w-[360px]">
      <div className="relative flex flex-col gap-3 ">
        <div className=" flex flex-col gap-[6px] text-center ">
          <Typography variant="body3" weight="medium">
            Bahri company
          </Typography>
          <Typography variant="caption" weight="regular" className="text-description">
            Coursinity helped us train over 4,000 employees without disrupting daily operations. The academy reflected
            our identity and values and the results were measurable from the first month.
          </Typography>
          <div className="absolute bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] border  h-full w-[115%] left-[-7.5%] top-[14%] border-white border-opacity-20 rounded-2xl"></div>

          <div className="absolute w-[66px] h-[66px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] border border-white border-opacity-30 bottom-[-25%] left-[-15%] backdrop-blur-[10px] rounded-[7px]"></div>

          <div className="absolute w-[60px] h-[60px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] border border-white border-opacity-30 top-[-10%] right-[-20%] backdrop-blur-[10px] rounded-[8px] "></div>

          <div className="absolute w-[27px] h-[27px] bg-[linear-gradient(180deg,_rgba(255,255,255,0.06)_0%,_rgba(30,141,194,0.06)_100%)] border border-white border-opacity-30 top-[15%] right-[-22%] backdrop-blur-[10px] rounded-[8px] "></div>
        </div>
        <div className="flex gap-3   items-center justify-center">
          <img
            src="/assets/contact_form/contact_form_1.png"
            alt="contact_form_1"
            className="object-cover aspect-square rounded-[10px] h-[40px] w-[40px]"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="caption" weight="medium">
              M. Ali
            </Typography>
            <Typography variant="caption" weight="regular" className="text-description">
              Training Lead, Bahri
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
