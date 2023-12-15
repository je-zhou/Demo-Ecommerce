// import { IconProp } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface BannerTileProps {
    icon: React.ReactNode
    text: string
}

export default function BannerTile({icon, text}: BannerTileProps) {
  return (
    <div className='flex flex-row gap-x-2 text-sm font-thin items-center'>
        {icon}
        <p>{text}</p>
    </div>
  )
}
