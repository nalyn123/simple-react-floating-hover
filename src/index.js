import React from 'react'
import { useFloater } from './index-model'

export const Floater = (props) => {
  const { ref, move } = useFloater(props)
  const { children, className } = props
  return (
    <div
      ref={ref}
      className={`floater ${className ?? ''}`}
      style={{
        '--floater-x': (move?.x || 0) + 'px',
        '--floater-y': (move?.y || 0) + 'px'
      }}
    >
      {children}
    </div>
  )
}
