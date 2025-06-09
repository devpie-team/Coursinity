import Lottie from 'lottie-react'
import animationData from '../../../../public/assets/lottie/academic/academic.json'

export const AcademySection = () => {
  return (
    <section>
      <Lottie animationData={animationData} loop={true} style={{ width: '100%', height: 900 }} />
    </section>
  )
}
