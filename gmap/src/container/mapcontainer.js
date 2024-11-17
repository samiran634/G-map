import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import vertexShader from '../components/shaders/vertex.glsl';
import fragmentShader from '../components/shaders/fragment.glsl';
import worldmap from '../assets/worldmap3.jpg';

const MapContainer = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        // Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Load texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(worldmap);
        
        // Create sphere
        const geometry = new THREE.SphereGeometry(8, 50, 50);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
        });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        camera.position.z = 20;

        // Mouse interaction variables
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        // Mouse down event
        const onMouseDown = (event) => {
            isDragging = true;
            previousMousePosition.x = event.clientX;
            previousMousePosition.y = event.clientY;
        };

        // Mouse move event
        const onMouseMove = (event) => {
            if (!isDragging) return;

            const deltaX = event.clientX - previousMousePosition.x;
            const deltaY = event.clientY - previousMousePosition.y;

            // Rotate the globe
            globe.rotation.y += deltaX * 0.005; // Horizontal rotation
            globe.rotation.x += deltaY * 0.005; // Vertical rotation (limit it if needed)

            previousMousePosition.x = event.clientX;
            previousMousePosition.y = event.clientY;
        };

        // Mouse up event
        const onMouseUp = () => {
            isDragging = false;
        };

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Event listeners
        mount.addEventListener('mousedown', onMouseDown);
        mount.addEventListener('mousemove', onMouseMove);
        mount.addEventListener('mouseup', onMouseUp);

        // Cleanup on unmount
        return () => {
            mount.removeChild(renderer.domElement);
            mount.removeEventListener('mousedown', onMouseDown);
            mount.removeEventListener('mousemove', onMouseMove);
            mount.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh', cursor: 'grab' }} />;
};

export default MapContainer;
