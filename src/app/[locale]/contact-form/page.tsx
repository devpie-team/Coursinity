import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Button } from '@/components/primitives/button'
import { Checkbox } from '@/components/primitives/checkbox'
import { Input } from '@/components/primitives/input'
import { Typography } from '@/components/ui'
import { ContactForm } from './_components/ContactForm/ContactForm'
import { ContactVisual } from './_components/ContactVisual/ContactVisual'

export default function ContactFormPage() {
  return (
    <main className="flex px-[116px] py-[101px] pb-[148px] bg-white justify-center items-center max-[1100px]:px-6 max-lg:py-20 ">
      <div className="flex border border-black border-opacity-10 rounded-3xl max-md:flex-col ">
        <ContactVisual className="relative z-10  p-8 gap-[120px] flex flex-col justify-between items-center overflow-hidden max-lg:p-4  max-md:gap-12 max-md:pb-8" />

        <ContactForm className="p-8 min-w-[466px] max-lg:p-5 max-md:min-w-[343px] order-2 max-md:order-1" />
      </div>
    </main>
  )
}
