import React, { useRef } from 'react'

import { Floater } from 'simple-react-floating-hover'
import 'simple-react-floating-hover/dist/index.css'

const App = () => {
  const ref = useRef(null)
  return (
    <div ref={ref} className='section'>
      <div>
        <Floater className='item1' speed={0.2} distance={20} />
        <Floater
          className='item2'
          wrapper={ref}
          speed={0.4}
          distance={20}
          inverted={true}
        />
        <Floater className='item3' wrapper={ref} speed={1} distance={12} />
      </div>
    </div>
  )
}

export default App
