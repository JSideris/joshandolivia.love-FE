


import * as THREE from 'three';
import simplex from "../../../scripts/simplex";
import React, { useEffect, useRef } from 'react';
import './RsvpSection.css';
import PageSection from '../../../components/page-section/PageSection';

let scene: any, camera: any, renderer: any;
let pillars: any[] = [];
let noise = simplex(50);

// 1. Initialization:
function initThreeScene(container: HTMLDivElement) {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = 7;
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

	renderer.domElement.style.position = "absolute";
	renderer.domElement.style.top = "0";
	renderer.domElement.style.left = "0";
	renderer.domElement.style.zIndex = "1";

    const light = new THREE.PointLight(0xffffff, 100, 500);
    light.position.set(5, 10, 10);
    scene.add(light);

    // 2. Creating Hexagonal Pillars:
    const radiusTop = 1;
    const bevel = 0.05;
    const radiusBottom = 1; 
    const height = 10; 
    const radialSegments = 6; // hexagon
    const hexGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, undefined, true);
    const surfaceGeometry = new THREE.CircleGeometry(radiusTop - bevel, radialSegments);
    const coneGeometry = new THREE.CylinderGeometry(radiusTop - bevel, radiusBottom, bevel, radialSegments, undefined, true);

    const mainMaterial = new THREE.MeshStandardMaterial({
        color: 0x707070,
        metalness: 0.7,
        roughness: 0.2,
		flatShading: true
    });

    const bevelMaterial = new THREE.MeshStandardMaterial({
        color: 0xE0C080,
        metalness: 0.7,
        roughness: 0.2
    });

    let pillarRows = 10; // adjust for desired number of pillars
    let pillarCols = 8; // adjust for desired number of pillars
    for (let i = 0; i < pillarRows; i++) {
    	for (let j = 0; j < pillarCols; j++) {
			let pillar = new THREE.Group();
			let mainPart = new THREE.Mesh(hexGeometry, mainMaterial);
			let topPart = new THREE.Mesh(coneGeometry, bevelMaterial);
			let surfacePart = new THREE.Mesh(surfaceGeometry, mainMaterial);
			pillar.add(mainPart);
			pillar.add(topPart);
			pillar.add(surfacePart);
			topPart.position.y = height / 2 + bevel / 2;
			surfacePart.position.y = height / 2 + bevel;
			surfacePart.rotation.x = -Math.PI / 2;
			surfacePart.rotation.z = -Math.PI / 2;
			// pillar.position.y = Math.random() * 0.5 - 0.25; // random offset
			pillar.position.x = (i - pillarRows / 2) * 1.7; // adjust for spacing
			pillar.position.z = (j - pillarCols / 2) * 1.8 + (i % 2 ? 1 : 0); // adjust for spacing
			pillar.rotation.y = Math.PI / 2;
			pillars.push(pillar);
			scene.add(pillar);
		}
    }
}

function onWindowResize(container: HTMLDivElement) {
    // Update camera's aspect ratio
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}

let originalNow = Date.now() / 1000;

function animate() {
    requestAnimationFrame(animate);

    // Animate pillars here if necessary
    // Example: pillars[0].position.y += 0.01;

	let now = Date.now() / 1000;

	for(let i = 0; i < pillars.length; i++){
		let p = pillars[i];
		let y = noise(p.position.x, (now - originalNow) / 1000, p.position.z);
		p.position.y = y;
	}

    renderer.render(scene, camera);
}

const RsvpSection: React.FC = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);
  
	useEffect(() => {
	  const container = containerRef.current;
	  if (!container) return;
  
	  // Initialize the 3D scene
	  initThreeScene(container);
  
	  const handleResize = () => {
		onWindowResize(container);
	  };
  
	  window.addEventListener('resize', handleResize);
  
	  // Hack for mobile devices
	  let lastWidth = container.offsetWidth;
	  const intervalId = setInterval(() => {
		const newWidth = container.offsetWidth;
		if (newWidth !== lastWidth) {
		  lastWidth = newWidth;
		  onWindowResize(container);
		}
	  }, 500);
  
	  animate();
  
	  // Cleanup function
	  return () => {
		clearInterval(intervalId); // Clear interval on unmount
		window.removeEventListener('resize', handleResize); // Remove resize event listener
	  };
	}, []);
  
	return (
	  <PageSection>
		<div className="section-container-rsvp" ref={containerRef}>
		  <div className="overlay-rsvp">
			<h1>News</h1>
			<p>
			  The wedding took place January 13 at Fantasy Farm. We'll be providing a photo and video upload link shortly.
			  <br />
			  Click <a href="https://buy.stripe.com/8wM8zL6Ja31I7oQcMM" target="_blank" rel="noopener noreferrer">here</a> to give a gift!
			</p>
		  </div>
		</div>
	  </PageSection>
	);
  };
  
  export default RsvpSection;