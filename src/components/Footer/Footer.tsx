import { cn } from '@/lib/utils'
import { Button } from '../primitives/button'
import XIcon from '../icons/XIcon'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import LinkedInIcon from '../icons/LinkedInIcon'
import YouTubeIcon from '../icons/YouTubeIcon'

type FooterProps = {
  className?: string
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('w-full py-[140px] px-[150px] pb-[50px] text-white bg-primary-purple', className)}>
      <div>
        <div className="flex flex-col gap-[140px]">
          <div className="flex flex-col gap-8 text-center items-center  font-medium">
            <h2 className="text-h2 ">
              We Co-Plan the Vision &<br /> Fully Deliver it
            </h2>
            <p className="text-body2">
              Train your team. Revolutionize your culture. Create an impact worthy of your business.
            </p>
            <Button variant="secondary" size="md" className="w-[263px]">
              Start your learning journey
            </Button>
          </div>
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-4 gap-[50px] pb-20">
              <div className="flex flex-col gap-[20px] font-medium">
                <h3 className="text-base1">Coursinity</h3>
                <p className="text-button ">Elevating corporate training through customized learning solutions</p>
                <p className="text-button">The Leader in EduTech Solutions</p>
              </div>

              <div>
                <h3 className="text-body2 font-medium mb-5">Solutions</h3>
                <ul className="space-y-[6px] text-button">
                  <li>
                    <a href="#">LMS Platforms</a>
                  </li>
                  <li>
                    <a href="#">Content Development</a>
                  </li>
                  <li>
                    <a href="#">Training Calendar</a>
                  </li>
                  <li>
                    <a href="#">Learning Journeys</a>
                  </li>
                  <li>
                    <a href="#">Consultancy</a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-body2 font-medium mb-5">Academy</h3>
                <ul className="space-y-[6px] text-button">
                  <li>
                    <a href="#">Digital Academies</a>
                  </li>
                  <li>
                    <a href="#">Compliance Training</a>
                  </li>
                  <li>
                    <a href="#">Professional Certifications</a>
                  </li>
                  <li>
                    <a href="#">Health & Safety</a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-body2 font-medium mb-3">Company</h3>
                <ul className="space-y-[6px] text-button">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Contact Us</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Book a Demo</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative flex justify-between pt-5 border-t border-[#7662E833] items-center">
              <p className="text-sm font-normal">© 2025 Coursinity. All rights reserved.</p>
              <div className="absolute left-1/2 -translate-x-1/2 flex text-button gap-6">
                <a href="">Terms</a>
                <a href="">Privacy</a>
                <a href="">Cookies</a>
              </div>
              <div className="flex gap-2">
                <button className="flex w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <XIcon />
                </button>
                <button className="flex w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <FacebookIcon />
                </button>
                <button className="flex w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <InstagramIcon />
                </button>
                <button className="flex w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <LinkedInIcon />
                </button>
                <button className="flex w-14 h-14 rounded-full bg-white bg-opacity-[12%] justify-center items-center hover:bg-opacity-25 transition-all">
                  <YouTubeIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
