import React from 'react'
import AnimatedGradientText from './GradientText'

const Logo = () => {
  return (
    <div>
      <AnimatedGradientText text="Talents Tracks" className="italic" fontSize="30px" backgroundColur="linear-gradient(90deg,rgb(243, 66, 69),rgb(107, 239, 193),rgb(175, 114, 244),rgb(214, 239, 105))" />
    </div>
  )
}

export default Logo