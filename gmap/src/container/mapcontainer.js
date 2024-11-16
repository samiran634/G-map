import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import worldmap from "../assets/worldmap2.png";
const MapContainer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mount.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(worldmap, (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
        });

        const geometry = new THREE.SphereGeometry(5, 64, 64);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        camera.position.z = 15;

        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y += 0.01; // Rotate the globe
            renderer.render(scene, camera);
        };

        animate();

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            globe.rotation.x = (clientY / height) * Math.PI;
            globe.rotation.y = (clientX / width) * Math.PI;
        };

        mount.addEventListener('mousemove', handleMouseMove);

        return () => {
            mount.removeChild(renderer.domElement);
            mount.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapContainer;