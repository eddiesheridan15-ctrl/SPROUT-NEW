"use client";

import { useEffect, useRef } from "react";

export default function Earth() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, frameId, cleanupScroll, cleanupResize, cleanupWake;
    let cancelled = false;

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
      // Opening face of the globe. 0 shows the empty Pacific/Atlantic; ~1.9
      // brings the land-rich Africa/Europe face to the camera. Nudge this one
      // number to re-aim the opening view (radians; +/- spins it round).
      const OPENING_ROTATION = 1.9;
      sphere.rotation.y = OPENING_ROTATION;
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

      // Progress is measured against the START of the "Built to be played"
      // section. The globe must be completely gone before that headline can
      // ever reach the viewport, so we fully fade it out by the time the
      // built section is one viewport-height away from the top of the screen.
      let curY = 0;
      let targetY = 0;
      const onScroll = () => {
        const builtEl = document.getElementById("built");
        // Distance at which the globe should be fully faded: a bit before the
        // built section enters view.
        const fadeEnd = builtEl
          ? builtEl.offsetTop - window.innerHeight
          : window.innerHeight;
        targetY = Math.min(1, Math.max(0, window.scrollY / (fadeEnd || 1)));
      };
      window.addEventListener("scroll", onScroll);
      onScroll();
      cleanupScroll = () => window.removeEventListener("scroll", onScroll);

      // The loop runs only while the globe is visible. Once it has fully
      // faded (behind the rising cream panel), we hide the canvas and stop
      // rendering entirely, so it costs nothing for the rest of the page.
      let running = true;
      const loop = () => {
        curY += (targetY - curY) * 0.07;
        sphere.rotation.y += 0.0024;
        sphere.position.x = 0.7 + Math.sin(curY * Math.PI * 1.2) * 0.5;
        sphere.position.y = 1.4 - curY * 4.2;
        const s = 1.25 - curY * 0.25;
        sphere.scale.setScalar(s);
        atmo.position.copy(sphere.position);
        atmo.scale.setScalar(s);
        sphere.rotation.x = curY * 0.4;
        // Fade out fully by 65% of the way to the built section, so the globe
        // is completely invisible well before that headline appears.
        const op = curY < 0.5 ? 1 : Math.max(0, 1 - (curY - 0.5) / 0.15);
        sphere.material.transparent = true;
        sphere.material.opacity = op;
        atmo.material.opacity = op;

        if (op <= 0.02) {
          // Fully faded: hide the canvas and stop the loop completely.
          canvas.style.display = "none";
          running = false;
          frameId = null;
          return; // no further frames requested
        }

        canvas.style.display = "";
        canvas.style.opacity = 1;
        renderer.render(scene, cam);
        frameId = requestAnimationFrame(loop);
      };
      loop();

      // Wake the loop back up only when the user scrolls near the top again.
      const wake = () => {
        if (!running && !cancelled && window.scrollY < window.innerHeight) {
          running = true;
          loop();
        }
      };
      window.addEventListener("scroll", wake, { passive: true });
      cleanupWake = () => window.removeEventListener("scroll", wake);
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
      if (frameId) cancelAnimationFrame(frameId);
      if (cleanupScroll) cleanupScroll();
      if (cleanupWake) cleanupWake();
      if (cleanupResize) cleanupResize();
      if (renderer) renderer.dispose();
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return <canvas id="globe" ref={canvasRef} />;
}
