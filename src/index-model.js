import { useRef, useState, useEffect, useCallback } from 'react'
import { CommonUtils } from './utils'

export const useFloater = (props) => {
  const {
    wrapper,
    speed = 1,
    distance = 20,
    inverted,
    invertedX,
    invertedY
  } = props

  const ref = useRef(null)
  const [move, setMove] = useState({ x: 0, y: 0 })
  const mainRef = useRef(null)

  useEffect(() => {
    const wrap = wrapper?.current ?? wrapper
    if (wrap) mainRef.current = wrap
    else mainRef.current = document.documentElement
  }, [wrapper])

  useEffect(() => {
    const wrap = mainRef.current
    if (!wrap || CommonUtils.isMobile()) return

    wrap?.addEventListener('mouseenter', onMove)
    wrap?.addEventListener('mousemove', onMove)

    return () => {
      wrap?.removeEventListener('mouseenter', onMove)
      wrap?.removeEventListener('mousemove', onMove)
    }
  }, [mainRef])

  const onMove = (e) => {
    const wrap = mainRef.current

    if (!ref?.current || !wrap) return

    const centerX = wrap?.offsetWidth / 2
    const centerY = document.documentElement.scrollTop + wrap?.offsetHeight / 2

    const x = e?.screenX || e?.clientX
    const y = e?.screenY || e?.clientY
    const s = speed / 2
    const maxDistance = 200

    let newX = x - centerX
    const timesX = newX >= 0 ? 1 : -1
    newX = Math.abs(newX) >= centerX ? 1 * timesX : newX / maxDistance
    newX = newX * distance
    newX = newX * s

    let newY = y - centerY
    const timesY = newY >= 0 ? 1 : -1
    newY = Math.abs(newY) >= centerX ? 1 * timesY : newY / maxDistance
    newY = newY * distance
    newY = newY * s

    if (inverted) {
      newX *= -1
      newY *= -1
    } else {
      if (invertedX) {
        newX *= -1
      } else if (invertedY) {
        newY *= -1
      }
    }

    setMove({
      x: newX,
      y: newY
    })
  }

  return { ref, move }
}
