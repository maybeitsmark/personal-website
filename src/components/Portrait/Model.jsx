import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import modelUrl from '@/assets/portfolio_model.glb'

export default function MeltedHead(props) {
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

  // Keyboard listener
  useEffect(() => {
    const handleKey = (e) => {
      if (!morphMesh.current) return

      if (e.key === '1') setActiveMorph(0)
      if (e.key === '2') setActiveMorph(1)
      if (e.key === '3') setActiveMorph(2)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Animate the active morph once
  useFrame((state, delta) => {
    if (morphMesh.current && activeMorph !== null) {
      const speed = 2 // adjust how fast it plays
      let p = progress + delta * speed

      // Oscillate 0 → 1 → 0 over the duration
      let influence = p <= 0.5 ? p * 2 : 2 - p * 2
      morphMesh.current.morphTargetInfluences[activeMorph] = influence

      if (p >= 1) {
        // animation done
        setProgress(0)
        setActiveMorph(null)
      } else {
        setProgress(p)
      }
    }
  })

  return <primitive object={scene} {...props} />
}