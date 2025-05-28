import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Button } from '@/components/primitives/button'
import { Checkbox } from '@/components/primitives/checkbox'
import { Input } from '@/components/primitives/input'
import { Typography } from '@/components/ui'

export default function ContactFormPage() {
  return (
    <main className="px-[116px] py-[101px] pb-[148px] bg-white">
      <div className="flex border border-black border-opacity-10 rounded-3xl">
        <div className="w-[490px] h-[755px] bg-primary-blue"></div>
        <div className="p-8 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <Input label="First Name" placeholder="What should we call you?" className="w-full" />
              </div>
              <div className="w-1/2">
                <Input label="Last Name" placeholder="Your last name, please" className="w-full" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Input label="Business Email" placeholder="Where can we reach you?" className="w-full" />
              </div>
              <div className="w-1/2">
                <Input
                  label="Phone Number"
                  placeholder="+966"
                  className="w-full"
                  type="tel"
                  inputMode="tel"
                  pattern="^\+?[0-9]*$"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Input label="Company Name" placeholder="Your organization’s name" className="w-full" />
              </div>
              <div className="w-1/2">
                <Input label="Job Title" placeholder="Your role or position" className="w-full" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <CustomSelect
                  options={[
                    { label: 'Option A', value: 'a' },
                    { label: 'Option B', value: 'b' }
                  ]}
                  label="Number of Employees"
                  placeholder="Size of your team"
                />
              </div>
              <div className="w-1/2">
                <CustomSelect
                  options={[
                    { label: 'Option A', value: 'a' },
                    { label: 'Option B', value: 'b' }
                  ]}
                  label="Areas of Interest"
                  placeholder="What you'd like to focus on"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <Typography className="text-sm" weight="medium">
                Additional Information
              </Typography>
              <textarea
                className="p-5 text-md font-normal h-[120px] border border-secondary-400 rounded-2xl active:border-description  hover:border-description outline-none focus:border-description"
                placeholder="Anything specific we should know?"></textarea>
            </div>
            <div className="flex gap-3 mt-1">
              <Checkbox />
              <Typography variant="caption">
                I agree to the{' '}
                <a href="/terms" className="underline  ">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="underline  ">
                  Privacy Policy
                </a>
              </Typography>
            </div>
            <Button variant="purple" className="w-[190px]">
              Let's Talk
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
