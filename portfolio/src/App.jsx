import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Text3D, Center, Float, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useState, useRef } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// 3D Gear Component
function Gear({ position, rotation, scale = 1, color = "#00d4ff" }) {
  const gearRef = useRef()
  
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Main gear body */}
      <mesh ref={gearRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.3, 8]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Gear teeth */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i * Math.PI * 2) / 8) * 1.2,
            Math.sin((i * Math.PI * 2) / 8) * 1.2,
            0
          ]}
          rotation={[Math.PI / 2, 0, -(i * Math.PI * 2) / 8]}
        >
          <boxGeometry args={[0.4, 0.6, 0.3]} />
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Center hole */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Animated Engine Piston
function Piston({ position, delay = 0 }) {
  const pistonRef = useRef()
  
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={pistonRef}>
          <cylinderGeometry args={[0.5, 0.5, 1.5, 16]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color="#ff6b6b" metalness={0.7} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  )
}

// Technical Blueprint Grid
function BlueprintGrid() {
  return (
    <group>
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[i - 10, -5, -10]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 0.05]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} />
        </mesh>
      ))}
      {[...Array(20)].map((_, i) => (
        <mesh key={i} position={[-10, i - 10, -10]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[20, 0.05]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <BlueprintGrid />
      
      {/* Central floating gear assembly */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <Gear position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.5} color="#00d4ff" />
      </Float>
      
      {/* Surrounding gears */}
      <Gear position={[-4, 2, -5]} rotation={[0, 0, 0.5]} scale={0.8} color="#ff6b6b" />
      <Gear position={[4, -2, -5]} rotation={[0, 0, -0.5]} scale={0.8} color="#00d4ff" />
      <Gear position={[-3, -3, -3]} rotation={[0, 0, 1]} scale={0.6} color="#ffd93d" />
      <Gear position={[3, 3, -3]} rotation={[0, 0, -1]} scale={0.6} color="#6bcb77" />
      
      {/* Pistons */}
      <Piston position={[-6, 0, -2]} />
      <Piston position={[6, 0, -2]} delay={0.5} />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        autoRotate 
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={20}
      />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
      </EffectComposer>
    </>
  )
}

// Loading Component
function Loader() {
  return (
    <Center>
      <Text3D font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json" size={0.5}>
        Loading...
        <Center>
          <meshStandardMaterial color="#00d4ff" />
        </Center>
      </Text3D>
    </Center>
  )
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Canvas Background */}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        backdropFilter: 'blur(10px)',
        background: 'rgba(10, 10, 10, 0.8)'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00d4ff' }}>
          Pavansai
        </div>
        <div style={{ display: 'flex', gap: '30px' }}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveSection(item.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === item.toLowerCase() ? '#00d4ff' : '#ffffff',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'color 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 50,
        pointerEvents: 'none'
      }}>
        <h1 style={{
          fontSize: '80px',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
        }}>
          PAVANSAI
        </h1>
        <p style={{
          fontSize: '32px',
          color: '#ffffff',
          margin: '0 0 10px 0',
          letterSpacing: '3px'
        }}>
          MECHANICAL ENGINEER
        </p>
        <p style={{
          fontSize: '18px',
          color: '#888888',
          maxWidth: '600px',
          margin: '20px auto'
        }}>
          Innovating solutions through precision engineering & creative design
        </p>
        
        <div style={{
          marginTop: '40px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}>
          <button style={{
            padding: '15px 40px',
            fontSize: '16px',
            background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
            border: 'none',
            borderRadius: '30px',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 5px 20px rgba(0, 212, 255, 0.4)'
          }}>
            View Projects
          </button>
          <button style={{
            padding: '15px 40px',
            fontSize: '16px',
            background: 'transparent',
            border: '2px solid #00d4ff',
            borderRadius: '30px',
            color: '#00d4ff',
            cursor: 'pointer',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s'
          }}>
            Contact Me
          </button>
        </div>
      </section>

      {/* Skills Badge */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        left: '40px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {['CAD Design', 'FEA Analysis', 'Thermodynamics', 'MATLAB', 'SolidWorks', 'AutoCAD'].map((skill, index) => (
          <div
            key={skill}
            style={{
              padding: '10px 20px',
              background: 'rgba(0, 212, 255, 0.1)',
              border: '1px solid rgba(0, 212, 255, 0.3)',
              borderRadius: '20px',
              color: '#00d4ff',
              fontSize: '14px',
              backdropFilter: 'blur(5px)',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
          >
            {skill}
          </div>
        ))}
      </div>

      {/* Stats Counter */}
      <div style={{
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        zIndex: 50,
        display: 'flex',
        gap: '40px'
      }}>
        {[
          { number: '5+', label: 'Years Experience' },
          { number: '50+', label: 'Projects Completed' },
          { number: '20+', label: 'Happy Clients' }
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#00d4ff',
              marginBottom: '5px'
            }}>
              {stat.number}
            </div>
            <div style={{
              fontSize: '14px',
              color: '#888888',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        animation: 'bounce 2s infinite'
      }}>
        <div style={{
          width: '30px',
          height: '50px',
          border: '2px solid #00d4ff',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '10px'
        }}>
          <div style={{
            width: '6px',
            height: '10px',
            background: '#00d4ff',
            borderRadius: '3px',
            animation: 'scroll 2s infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        @keyframes scroll {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(10px); }
        }
      `}</style>
    </div>
  )
}
