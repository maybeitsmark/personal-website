
// Personal website and portfolio  //
// 2026                            //
// Built by Mark Lisanti           //
// https://github.com/maybeitsmark //

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import modelUrl from '@/assets/portfolio_model.glb'

export default function MeltedHead({ playMorph, ...props }) {
  const { scene } = useGLTF(modelUrl)
  const morphMesh = useRef(null)

  // Track which morph is currently animating and its progress
  const [activeMorph, setActiveMorph] = useState(null)
  const [progress, setProgress] = useState(0)

  // Find first mesh with morph targets
  if (!morphMesh.current) {
    scene.traverse((child) => {
      if (child.isMesh && child.morphTargetInfluences) {
        morphMesh.current = child
      }
    })
  }

  // Update activeMorph when parent triggers a morph
  useEffect(() => {
    if (playMorph !== null && playMorph !== undefined) {
      setActiveMorph(playMorph)
      setProgress(0) // reset progress
    }
  }, [playMorph])

  // Animate the active morph once
  useFrame((state, delta) => {
    if (morphMesh.current && activeMorph !== null) {
      const speed = 2
      let p = progress + delta * speed
      let influence = p <= 0.5 ? p * 2 : 2 - p * 2
      morphMesh.current.morphTargetInfluences[activeMorph] = influence

      if (p >= 1) {
        setProgress(0)
        setActiveMorph(null)
      } else {
        setProgress(p)
      }
    }
  })

  return <primitive object={scene} {...props} />
}