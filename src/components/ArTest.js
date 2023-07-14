import React from 'react'
import { Canvas } from '@react-three/fiber'

import { useGLTF } from '@react-three/drei'

function MyModel() {
  // const gltf = useGLTF('ar/dragons.gltf')

  // return <primitive object={gltf.scene} />
}

const markerOptions = {
  image: 'ar/test1.jpg',
  // Other marker options...
}

function ArTest() {
  return (<>
    {/* // <ARCanvas>
    //   <DefaultXRControllers />
    //   <ARMarker {...markerOptions}>
    //     <MyModel />
    //   </ARMarker>
    // </ARCanvas> */}
    </>
  )
}

export default ArTest