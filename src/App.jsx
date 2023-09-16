import { useRef, useState } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Plane, Stats } from '@react-three/drei'

function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if (!hovered) {
            ref.current.rotation.x += delta
        }
    })
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? props.color : randomColor()} />


        </mesh>
    )
}

// write a function to choose a color from #000000 to #FFFFFF at random
function randomColor() {
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 16).toString(16)
    }
    return color
}

function Boxes() {
    let boxes = []
    for (let i = -1; i < 30; i++) {
        boxes.push(<Box castShadow color={'blue'} position={[-i - 1.5, 0, 0]} />)
        boxes.push(<Box castShadow color={'hotpink'} position={[i + 1.5, 0, 0]} />)
    }
    return boxes
}



function App() {
    const [count, setCount] = useState(0)

    return (
        <Canvas
            colorManagement
            shadows
        >
            {/* <ambientLight intensity={3.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} /> */}

            <fog attach="fog" args={["white", 0, 40]} />
            <ambientLight castShadow intensity={0.2} />
            <Boxes />
            <OrbitControls />
            <Stats />
            <directionalLight
                intensity={0.3}
                castShadow
            // shadow-mapSize-height={512}
            // shadow-mapSize-width={512}
            />
            <Plane
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1, 0]}
                args={[10000, 10000]}
            >
                <meshStandardMaterial attach="material" color="white" />
            </Plane>
        </Canvas>
    )
}

export default App
