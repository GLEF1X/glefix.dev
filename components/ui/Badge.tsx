import clsx from 'clsx'
import { forwardRef, type ElementRef } from 'react'
import { generateAccentColor } from '~/utils/colors'

interface BadgeOwnProps {
  title: string
  color: string
}
type BadgeElement = ElementRef<'span'>

const Badge = forwardRef<BadgeElement, BadgeOwnProps>((props, ref) => {
  return (
    <span
      ref={ref}
      className="px-1.5 pt-[0.5px] font-medium rounded-lg inline-flex items-center whitespace-nowrap h-fit shrink-0"
      style={{
        color: props.color,
        backgroundColor: generateAccentColor(props.color),
      }}
    >
      {props.title}
    </span>
  )
})
Badge.displayName = 'Badge'

export default Badge
