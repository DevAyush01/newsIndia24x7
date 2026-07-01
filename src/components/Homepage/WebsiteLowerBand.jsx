import Image from 'next/image'
import React from 'react'

export default function WebsiteLowerBand() {
  return (
    <>
        <Image
        src="/website-lower-band.png"
        alt="Advertisement"
        width={1200}
        height={50}
        className="w-full h-auto mx-auto"
      />
    </>
  )
}
