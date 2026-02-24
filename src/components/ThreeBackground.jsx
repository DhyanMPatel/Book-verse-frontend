import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mountNode = mountRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 1, 1000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountNode.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x6666ff, 0.3, 100);
    pointLight1.position.set(15, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6666, 0.3, 100);
    pointLight2.position.set(-15, -5, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x66ff66, 0.2, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);

    const books = [];

    // Function to create a realistic book with spine and pages
    const createRealisticBook = () => {
      const bookGroup = new THREE.Group();

      // Main book body
      const bookGeometry = new THREE.BoxGeometry(1.2, 2.0, 0.15);
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.05, 0.6, 0.4); // Realistic book colors

      const bookMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.8,
        metalness: 0.1,
      });

      const bookBody = new THREE.Mesh(bookGeometry, bookMaterial);
      bookGroup.add(bookBody);

      // Book spine (slightly different color)
      const spineGeometry = new THREE.BoxGeometry(0.05, 2.0, 0.16);
      const spineColor = color.clone();
      spineColor.multiplyScalar(0.8); // Darker spine

      const spineMaterial = new THREE.MeshStandardMaterial({
        color: spineColor,
        roughness: 0.7,
        metalness: 0.05,
      });

      const spine = new THREE.Mesh(spineGeometry, spineMaterial);
      spine.position.x = -0.6; // Position on the side
      bookGroup.add(spine);

      // Pages (visible from the side)
      const pagesGeometry = new THREE.BoxGeometry(0.02, 1.9, 0.14);
      const pagesMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f5dc, // Beige paper color
        roughness: 0.9,
        metalness: 0.0,
      });

      const pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
      pages.position.x = 0.6; // Position on the opposite side
      bookGroup.add(pages);

      return bookGroup;
    };

    for (let i = 0; i < 20; i++) {
      const book = createRealisticBook();

      // Distribute books over a larger area
      book.position.x = (Math.random() - 0.5) * 50;
      book.position.y = (Math.random() - 0.5) * 30;
      book.position.z = (Math.random() - 0.5) * 25;

      book.rotation.x = Math.random() * Math.PI * 2;
      book.rotation.y = Math.random() * Math.PI * 2;
      book.rotation.z = Math.random() * Math.PI * 2;

      book.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.02 + 0.01,
        floatAmplitude: Math.random() * 2 + 1,
        initialY: book.position.y,
      };

      scene.add(book);
      books.push(book);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x8888ff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      books.forEach((book) => {
        book.rotation.x += book.userData.rotationSpeed.x;
        book.rotation.y += book.userData.rotationSpeed.y;
        book.rotation.z += book.userData.rotationSpeed.z;

        book.position.y =
          book.userData.initialY +
          Math.sin(elapsedTime * book.userData.floatSpeed) *
            book.userData.floatAmplitude;
      });

      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }

      renderer.dispose();

      books.forEach((book) => {
        // Dispose of all meshes in the book group
        book.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      });

      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeBackground;
