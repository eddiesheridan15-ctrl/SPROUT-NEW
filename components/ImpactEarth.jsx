"use client";
import { useEffect, useRef, useState } from "react";

const SPOTS = [
  {
    lat: 54.0,
    lon: -2.5,
    label: "Reforestation \u00b7 United Kingdom",
    pill: "Land",
    title: "Land \u00b7 Reforestation",
    img: "/impact/land.jpg",
    imgAlt: "Hands cradling a young tree seedling in soil",
    points: [
      "Native seedlings planted and protected",
      "Degraded land brought back to life",
      "Local growers paid to care for it",
    ],
  },
  {
    lat: -18.6,
    lon: 27.0,
    label: "Wildlife \u00b7 Southern Africa",
    pill: "Wildlife",
    title: "Wildlife \u00b7 Conservation",
    img: "/impact/wildlife.jpg",
    imgAlt: "A cheetah watching over open savanna grassland",
    points: [
      "Ranger patrols kept in the field",
      "Snares found and removed",
      "Habitats protected year round",
    ],
  },
  {
    lat: -2.0,
    lon: 117.0,
    label: "River cleanup \u00b7 Southeast Asia",
    pill: "Water",
    title: "Water \u00b7 River cleanup",
    img: "/impact/water.jpg",
    imgAlt: "Plastic bottles and waste gathered for removal",
    points: [
      "River plastic intercepted at source",
      "Every tonne weighed and reported",
      "Waterways restored for communities",
    ],
  },
];

export default function ImpactEarth() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const controlRef = useRef(null);
  const [uiActive, setUiActive] = useState(0);

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
      cam.position.set(0, 0, 4.6);

      const R = 1.5;
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(R, 56, 56),
        new THREE.MeshPhongMaterial({
          color: 0x0c5240,
          shininess: 14,
          specular: 0x224433,
        })
      );
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
          dir: pos.clone().normalize(),
          el: stage.querySelector('[data-pin="' + idx + '"]'),
        };
      });

      const resize = () => {
        const w = canvas.clientWidth || stage.clientWidth;
        const h = canvas.clientHeight || stage.clientHeight;
        renderer.setSize(w, h, false);
        cam.aspect = w / h;
        cam.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);
      cleanupResize = () => window.removeEventListener("resize", resize);

      // Guided tour with manual override from the cause pills.
      const TRAVEL = 1.5;
      const HOLD = 5.0;
      const MANUAL_HOLD = 9;
      const tour = { mode: "intro", active: 0, phaseT: 0, dwell: HOLD };
      // Camera orbits to sit directly outside the active pin, looking at centre.
      // This centres any pin regardless of latitude (no Euler skew).
      // Opening view: aimed at central Asia (lon ~80, lat ~30) so the globe
      // opens on land, holds briefly, then journeys to the pins.
      const asiaPhi = ((90 - 30) * Math.PI) / 180;
      const asiaTheta = ((80 + 180) * Math.PI) / 180;
      const asiaDir = new THREE.Vector3(
        -Math.sin(asiaPhi) * Math.cos(asiaTheta),
        Math.cos(asiaPhi),
        Math.sin(asiaPhi) * Math.sin(asiaTheta)
      ).normalize();
      const camDir = asiaDir.clone();
      let curZoom = 4.6;

      controlRef.current = (i) => {
        if (i === tour.active) {
          tour.dwell = MANUAL_HOLD;
          tour.phaseT = 0;
          return;
        }
        tour.active = i;
        tour.mode = "travel";
        tour.phaseT = 0;
        tour.dwell = MANUAL_HOLD;
        setUiActive(i);
      };

      const v = new THREE.Vector3();
      let t = 0;
      const loop = () => {
        if (!running || cancelled) {
          frameId = null;
          return;
        }
        t += 0.016;
        tour.phaseT += 0.016;
        const INTRO = 1.2;
        if (tour.mode === "intro" && tour.phaseT > INTRO) {
          tour.mode = "travel";
          tour.phaseT = 0;
          tour.active = 0;
          setUiActive(0);
        } else if (tour.mode === "travel" && tour.phaseT > TRAVEL) {
          tour.mode = "hold";
          tour.phaseT = 0;
        } else if (tour.mode === "hold" && tour.phaseT > tour.dwell) {
          tour.mode = "travel";
          tour.phaseT = 0;
          tour.dwell = HOLD;
          tour.active = (tour.active + 1) % pinObjs.length;
          setUiActive(tour.active);
        }
        const targetDir = tour.mode === "intro" ? asiaDir : pinObjs[tour.active].dir;
        // Stay zoomed out while travelling and for the first ~0.4s of the hold,
        // then zoom in. Quick pan to the pin, brief pause, then zoom.
        const arrived = tour.mode === "hold" && tour.phaseT > 0.4;
        const targetZoom = arrived ? 2.85 : 4.6;
        // Pan fast while travelling, settle quickly once holding.
        const dirLerp = tour.mode === "travel" ? 0.11 : 0.08;
        camDir.lerp(targetDir, dirLerp).normalize();
        curZoom += (targetZoom - curZoom) * 0.14;
        cam.position.copy(camDir).multiplyScalar(curZoom);
        cam.up.set(0, 1, 0);
        cam.lookAt(0, 0, 0);

        pinObjs.forEach((p, i) => {
          p.halo.scale.setScalar(1 + Math.sin(t * 2 + i * 1.7) * 0.35);
          p.pin.getWorldPosition(v);
          const facing = v.clone().normalize().dot(new THREE.Vector3(0, 0, 1));
          const proj = v.clone().project(cam);
          const cw = canvas.clientWidth || stage.clientWidth;
          const ch = canvas.clientHeight || stage.clientHeight;
          const x = (proj.x * 0.5 + 0.5) * cw;
          const y = (-proj.y * 0.5 + 0.5) * ch;
          if (p.el) {
            p.el.classList.toggle("active", i === tour.active);
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
      <div className="ie-info" key={uiActive}>
        <img className="ie-img" src={SPOTS[uiActive].img} alt={SPOTS[uiActive].imgAlt} />
        <div className="ie-txt">
          <h4>{SPOTS[uiActive].title}</h4>
          {SPOTS[uiActive].points.map((p) => (
            <div className="ie-li" key={p}>
              <b>&#10003;</b>
              {p}
            </div>
          ))}
          <div className="ie-note">The winning team sends the donation here.</div>
        </div>
      </div>
      <div className="ie-pills">
        {SPOTS.map((s, i) => (
          <button
            key={s.pill}
            className={"ie-pillbtn" + (i === uiActive ? " on" : "")}
            onClick={() => controlRef.current && controlRef.current(i)}
          >
            {s.pill}
          </button>
        ))}
      </div>
    </div>
  );
}
