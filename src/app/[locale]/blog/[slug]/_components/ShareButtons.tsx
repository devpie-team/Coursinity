// app/[locale]/blog/[slug]/ShareButtons.tsx
'use client'

import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share'
import copy from 'copy-to-clipboard'
import TwitterIcon from '@/components/icons/TwitterIcon'
import FacebookIcon from '@/components/icons/FacebookIcon'
import InstagramIcon from '@/components/icons/InstagramIcon'
import LinkedInIcon from '@/components/icons/LinkedInIcon'

export default function ShareButtons({ url, title, content }: { url: string; title: string; content?: string }) {
  const handleInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {}
    }
    copy(url)
    // replace with your toast if you have one
    alert('Link copied! Open Instagram and paste it.')
  }

  return (
    <div className="flex gap-2">
      <TwitterShareButton
        className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100"
        url={url}
        title={title}
        content={content}
        hashtags={['yourTag']}>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100">
          <TwitterIcon />
        </div>
      </TwitterShareButton>

      <FacebookShareButton
        className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100"
        url={url}
        content={content}>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100">
          <FacebookIcon fill />
        </div>
      </FacebookShareButton>

      <button
        className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100"
        onClick={handleInstagram}
        type="button">
        <InstagramIcon fill />
      </button>

      <LinkedinShareButton
        className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100"
        url={url}
        title={title}
        summary={content}
        source={url}
        content={content}>
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary-100">
          <LinkedInIcon fill />
        </div>
      </LinkedinShareButton>
    </div>
  )
}
