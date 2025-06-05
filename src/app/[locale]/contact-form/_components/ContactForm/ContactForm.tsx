import CustomSelect from '@/components/CustomSelect/CustomSelect'
import { Button } from '@/components/primitives/button'
import { Checkbox } from '@/components/primitives/checkbox'
import { Input } from '@/components/primitives/input'
import { Typography } from '@/components/ui'

export const ContactForm = () => {
  return (
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
                { label: '1-10', value: '1-10' },
                { label: '11-50', value: '11-50' },
                { label: '51-100', value: '51-100' },
                { label: '101-200', value: '101-200' },
                { label: '201-500', value: '201-500' },
                { label: '501-1000', value: '501-1000' },
                { label: '+1000', value: '+1000' }
              ]}
              label="Number of Employees"
              placeholder="Size of your team"
            />
          </div>
          <div className="w-1/2">
            <CustomSelect
              options={[
                { label: 'Launching Digital Academy', value: 'Launching Digital Academy' },
                { label: 'Launching Learning Journeys', value: 'Launching Learning Journeys' },
                { label: 'Building An LMS', value: 'Building An LMS' },
                { label: 'AI Transformation', value: 'AI Transformation' },
                { label: 'Executive Enablement', value: 'Executive Enablement' },
                { label: 'Compliance & Regulatory Training', value: 'Compliance & Regulatory Training' },
                { label: 'Multilingual Workforce Training', value: 'Multilingual Workforce Training' },
                { label: 'Building Customized Content', value: 'Building Customized Content' }
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
  )
}
