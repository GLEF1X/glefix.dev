import type { ComponentType } from 'react'
import { motion, useSpring, type SpringOptions } from 'framer-motion'
import React, { useState, useRef, useEffect } from 'react'

const spring: SpringOptions = {
  stiffness: 300,
  damping: 40,
}

export function withFlipAnimation<T extends { variant: 'front' | 'back' }>(
  WrappedComponent: ComponentType<T>
): ComponentType<T> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithFlipAnimation = (props) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
      setIsFlipped((prevState) => !prevState)
    }

    const [rotateXaxis, setRotateXaxis] = useState(0)
    const [rotateYaxis, setRotateYaxis] = useState(0)
    const ref = useRef(null)

    const handleMouseMove = (event) => {
      const element = ref.current
      const elementRect = element.getBoundingClientRect()
      const elementWidth = elementRect.width
      const elementHeight = elementRect.height
      const elementCenterX = elementWidth / 2
      const elementCenterY = elementHeight / 2
      const mouseX = event.clientY - elementRect.y - elementCenterY
      const mouseY = event.clientX - elementRect.x - elementCenterX
      const degreeX = (mouseX / elementWidth) * 20 //The number is the rotation factor
      const degreeY = (mouseY / elementHeight) * 20 //The number is the rotation factor
      setRotateXaxis(degreeX)
      setRotateYaxis(degreeY)
    }

    const handleMouseEnd = () => {
      setRotateXaxis(0)
      setRotateYaxis(0)
    }

    const dx = useSpring(0, spring)
    const dy = useSpring(0, spring)

    useEffect(() => {
      dx.set(-rotateXaxis)
      dy.set(rotateYaxis)
    }, [rotateXaxis, rotateYaxis, dx, dy])

    return (
      <motion.div
        onClick={handleClick}
        transition={spring}
        style={{
          perspective: '1200px',
          // @ts-expect-error TODO: fix this type  error
          transformStyle: 'preserve-3d',
          width: `${props.width}`,
          height: `${props.height}`,
        }}
      >
        <motion.div
          ref={ref}
          whileHover={{ scale: 1.1 }} //Change the scale of zooming in when hovering
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseEnd}
          transition={spring}
          className="w-full h-full"
          style={{
            rotateX: dx,
            rotateY: dy,
          }}
        >
          <div
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              width: '100%',
              height: '100%',
            }}
          >
            <motion.div
              animate={{ rotateY: isFlipped ? -180 : 0 }}
              transition={spring}
              className="w-full h-full"
              style={{
                // @ts-expect-error TODO: come back and fix types here later
                zIndex: isFlipped ? 0 : 1,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <WrappedComponent
                {...props}
                variant="front"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: isFlipped ? 0 : 180 }}
              transition={spring}
              style={{
                // @ts-expect-error TODO: come back and fix types here later
                width: '100%',
                height: '100%',
                zIndex: isFlipped ? 1 : 0,
                backfaceVisibility: 'hidden',
                position: 'absolute',
              }}
            >
              <WrappedComponent
                {...props}
                variant="back"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  WrappedComponent.displayName = `withFlipAnimation(${displayName})`

  return ComponentWithFlipAnimation
}
