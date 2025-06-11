import { ContactForm } from './_components/ContactForm/ContactForm'
import { ContactVisual } from './_components/ContactVisual/ContactForm'

export default function ContactFormPage() {
  return (
    <main className="px-[116px] py-[101px] pb-[148px] bg-white">
      <div className="flex border border-black border-opacity-10 rounded-3xl">
        <ContactVisual />
        <ContactForm />
      </div>
    </main>
  )
}
