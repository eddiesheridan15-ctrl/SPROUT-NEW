"use client";

import { useEffect, useRef } from "react";

export default function Earth() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, frameId, cleanupScroll, cleanupResize;
    let cancelled = false;

    // Load three from CDN at runtime to keep the bundle light and avoid SSR issues.
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;

    script.onload = () => {
      if (cancelled) return;
      const THREE = window.THREE;
      const canvas = canvasRef.current;
      if (!THREE || !canvas) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      cam.position.z = 6;

      const R = 1.6;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(R, 72, 72),
        new THREE.MeshPhongMaterial({
          color: 0x0c5240,
          shininess: 14,
          specular: 0x224433,
        })
      );
      sphere.rotation.z = 0.41;
      scene.add(sphere);

      const atmMat = new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: {
          c: { value: 0.55 },
          p: { value: 4.5 },
          glow: { value: new THREE.Color(0x5fd0ff) },
        },
        vertexShader:
          "varying vec3 vN;void main(){vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
        fragmentShader:
          "uniform vec3 glow;uniform float c;uniform float p;varying vec3 vN;void main(){float i=pow(c-dot(vN,vec3(0.,0.,1.)),p);gl_FragColor=vec4(glow,1.)*i;}",
      });
      const atmo = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.16, 72, 72),
        atmMat
      );
      scene.add(atmo);

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const dir = new THREE.DirectionalLight(0xffffff, 1.2);
      dir.position.set(5, 3, 5);
      scene.add(dir);

      new THREE.TextureLoader().load("/earth.jpg", (t) => {
        t.anisotropy = 8;
        sphere.material.map = t;
        sphere.material.color.set(0xffffff);
        sphere.material.needsUpdate = true;
      });

      const resize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);
      cleanupResize = () => window.removeEventListener("resize", resize);

      let curY = 0;
      let targetY = 0;
      const onScroll = () => {
        const howEl = document.getElementById("how");
        const end = howEl ? howEl.offsetTop : window.innerHeight;
        targetY = Math.min(1, window.scrollY / (end || 1));
      };
      window.addEventListener("scroll", onScroll);
      onScroll();
      cleanupScroll = () => window.removeEventListener("scroll", onScroll);

      const loop = () => {
        frameId = requestAnimationFrame(loop);
        curY += (targetY - curY) * 0.07;
        sphere.rotation.y += 0.0024;
        sphere.position.x = 0.7 + Math.sin(curY * Math.PI * 1.2) * 0.5;
        sphere.position.y = 1.4 - curY * 4.2;
        const s = 1.25 - curY * 0.25;
        sphere.scale.setScalar(s);
        atmo.position.copy(sphere.position);
        atmo.scale.setScalar(s);
        sphere.rotation.x = curY * 0.4;
        const op = curY < 0.78 ? 1 : Math.max(0, 1 - (curY - 0.78) / 0.22);
        sphere.material.transparent = true;
        sphere.material.opacity = op;
        atmo.material.opacity = op;
        canvas.style.opacity = op <= 0.02 ? 0 : 1;
        renderer.render(scene, cam);
      };
      loop();
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (cleanupScroll) cleanupScroll();
      if (cleanupResize) cleanupResize();
      if (renderer) renderer.dispose();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return <canvas id="globe" ref={canvasRef} />;
}
