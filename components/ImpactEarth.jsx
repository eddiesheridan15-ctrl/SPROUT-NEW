"use client";
import { useEffect, useRef } from "react";

const SPOTS = [
  { lat: -6.2, lon: 35.0, label: "Reforestation \u00b7 East Africa" },
  { lat: -18.6, lon: 27.0, label: "Wildlife \u00b7 Southern Africa" },
  { lat: -2.0, lon: 117.0, label: "River cleanup \u00b7 Southeast Asia" },
];

export default function ImpactEarth() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, frameId, io, cleanupResize;
    let cancelled = false;
    let running = false;

    const init = () => {
      const THREE = window.THREE;
      const canvas = canvasRef.current;
      const stage = stageRef.current;
      if (!THREE || !canvas || !stage || cancelled) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      cam.position.z = 4.6;

      const R = 1.5;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(R, 56, 56),
        new THREE.MeshPhongMaterial({
          color: 0x0c5240,
          shininess: 14,
          specular: 0x224433,
        })
      );
      sphere.rotation.z = 0.3;
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
        new THREE.SphereGeometry(R * 1.14, 56, 56),
        atmMat
      );
      scene.add(atmo);

      scene.add(new THREE.AmbientLight(0xffffff, 0.75));
      const dir = new THREE.DirectionalLight(0xffffff, 1.1);
      dir.position.set(5, 3, 5);
      scene.add(dir);

      new THREE.TextureLoader().load("/earth.jpg", (t) => {
        t.anisotropy = 8;
        sphere.material.map = t;
        sphere.material.color.set(0xffffff);
        sphere.material.needsUpdate = true;
      });

      const pinObjs = SPOTS.map((s, idx) => {
        const phi = ((90 - s.lat) * Math.PI) / 180;
        const theta = ((s.lon + 180) * Math.PI) / 180;
        const pos = new THREE.Vector3(
          -R * Math.sin(phi) * Math.cos(theta),
          R * Math.cos(phi),
          R * Math.sin(phi) * Math.sin(theta)
        );
        const pin = new THREE.Mesh(
          new THREE.SphereGeometry(0.035, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0x3ef07f })
        );
        pin.position.copy(pos.clone().multiplyScalar(1.01));
        sphere.add(pin);
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 12, 12),
          new THREE.MeshBasicMaterial({
            color: 0x3ef07f,
            transparent: true,
            opacity: 0.3,
          })
        );
        halo.position.copy(pin.position);
        sphere.add(halo);
        return {
          pin,
          halo,
          // sphere rotation.y that brings this pin to face the camera
          focusY: Math.atan2(-pos.x, pos.z),
          el: stage.querySelector('[data-pin="' + idx + '"]'),
        };
      });

      const resize = () => {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        renderer.setSize(w, h);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);
      cleanupResize = () => window.removeEventListener("resize", resize);

      // Guided tour: hold on a pin, glide to the next, repeat.
      const TRAVEL = 2.2;
      const HOLD = 3.4;
      let mode = "hold";
      let active = 0;
      let phaseT = 0;
      let curRot = pinObjs[0].focusY;
      let curZoom = 3.15;
      sphere.rotation.y = curRot;

      const v = new THREE.Vector3();
      let t = 0;
      const loop = () => {
        if (!running || cancelled) {
          frameId = null;
          return;
        }
        t += 0.016;
        phaseT += 0.016;
        if (mode === "travel" && phaseT > TRAVEL) {
          mode = "hold";
          phaseT = 0;
        } else if (mode === "hold" && phaseT > HOLD) {
          mode = "travel";
          phaseT = 0;
          active = (active + 1) % pinObjs.length;
        }
        const targetRot = pinObjs[active].focusY;
        const targetZoom = mode === "hold" ? 3.15 : 4.4;
        curRot += (targetRot - curRot) * 0.045;
        curZoom += (targetZoom - curZoom) * 0.05;
        sphere.rotation.y = curRot;
        cam.position.z = curZoom;
        pinObjs[active].pin.getWorldPosition(v);
        cam.position.y += (v.y * 0.35 - cam.position.y) * 0.04;
        cam.lookAt(0, 0, 0);
        pinObjs.forEach((p, i) => {
          p.halo.scale.setScalar(1 + Math.sin(t * 2 + i * 1.7) * 0.35);
          p.pin.getWorldPosition(v);
          const facing = v.clone().normalize().dot(new THREE.Vector3(0, 0, 1));
          const proj = v.clone().project(cam);
          const x = (proj.x * 0.5 + 0.5) * stage.clientWidth;
          const y = (-proj.y * 0.5 + 0.5) * stage.clientHeight;
          if (p.el) {
            p.el.classList.toggle("active", i === active);
            p.el.style.transform =
              "translate(" + x + "px," + y + "px) translate(-50%,-135%)";
            p.el.style.opacity = facing > 0.18 ? 1 : 0;
          }
        });
        renderer.render(scene, cam);
        frameId = requestAnimationFrame(loop);
      };

      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            const was = running;
            running = e.isIntersecting;
            if (running && !was) loop();
          }),
        { threshold: 0.15 }
      );
      io.observe(stage);
    };

    if (window.THREE) {
      init();
    } else {
      const s = document.createElement("script");
      s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.async = true;
      s.onload = init;
      document.body.appendChild(s);
    }

    return () => {
      cancelled = true;
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      if (io) io.disconnect();
      if (cleanupResize) cleanupResize();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div className="iearth reveal" ref={stageRef}>
      <canvas ref={canvasRef} className="ie-canvas" />
      <div className="ie-eyebrow">[&nbsp;&nbsp;Where the money lands&nbsp;&nbsp;]</div>
      {SPOTS.map((s, i) => (
        <span key={i} className="ie-pin" data-pin={i}>
          {s.label}
        </span>
      ))}
      <div className="ie-cap">
        Three causes. Real places. The winning team picks one.
      </div>
    </div>
  );
}
