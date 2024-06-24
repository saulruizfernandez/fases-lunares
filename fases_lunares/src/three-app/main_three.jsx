import { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SunCalc } from "./suncalc.js";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";
import { getFlagAcceleration } from "./variables.js";
import { useAppContext } from "../AppContext.jsx";

let auxiliaryDate = new Date();

function ThreeComponent() {
  const { actualDate, setActualDate } = useAppContext();
  const ref = useRef(null);

  useEffect(() => {
    // SCENE
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // LIGHTS
    const light = new THREE.AmbientLight(0x404040, 2);
    scene.add(light);

    const pointLight = new THREE.DirectionalLight(0xffffff, 4);
    pointLight.castShadow = true;
    scene.add(pointLight);
    const textureLoader = new THREE.TextureLoader();

    const textureFlare0 = textureLoader.load("/lensflare0.png");
    const textureFlare1 = textureLoader.load("/lensflare2.png");
    const textureFlare2 = textureLoader.load("/lensflare3.png");

    const lensflare = new Lensflare();

    lensflare.addElement(new LensflareElement(textureFlare0, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare1, 512, 0));
    lensflare.addElement(new LensflareElement(textureFlare2, 60, 0.6));

    pointLight.add(lensflare);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    ref.current.appendChild(renderer.domElement);

    // CAMERA MAIN
    // 1 -> field of view in degrees
    // 2 -> aspect ratio
    // 3 and 4 -> min and max distance to the object in which it will be rendered (improve performance)
    const camera = new THREE.PerspectiveCamera(
      75,
      ref.current.clientWidth / ref.current.clientHeight,
      0.1,
      1000
    );
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 20);
    controls.update();

    // CAMERA LUNAR PHASE
    const auxCamera = new THREE.PerspectiveCamera(
      75,
      ref.current.clientWidth / ref.current.clientHeight,
      0.1,
      1000
    );
    auxCamera.position.set(0, 0, 0);
    auxCamera.zoom = 1;

    // RESIZE LISTENER
    const handleResize = () => {
      renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
      camera.aspect = ref.current.clientWidth / ref.current.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // MOON 3D MODEL
    var moon;
    const loader_moon = new GLTFLoader();
    loader_moon.load(
      "/moon.glb",
      function (object) {
        moon = object.scene;
        object.scene.scale.multiplyScalar(1);
        scene.add(object.scene);
      },
      undefined,
      function (error) {
        // Check error while loading moon model
        console.error(error);
      }
    );

    // TERRAIN MODEL
    var terrain;
    const loader_terrain = new GLTFLoader();
    loader_terrain.load(
      "/earth.glb",
      function (object) {
        terrain = object.scene;
        object.scene.scale.multiplyScalar(1);
        scene.add(object.scene);
      },
      undefined,
      function (error) {
        // Check error while loading terrain model
        console.error(error);
      }
    );

    // PLACE MOON AND SUN
    function get_position(altitude, azimuth, distance) {
      var position = new THREE.Vector3();
      position.setY(Math.sin(altitude) * distance);
      const radius = Math.sqrt(distance * distance - position.y * position.y);
      if (azimuth > Math.PI / 2 && azimuth <= Math.PI) {
        position.setX(+Math.sin(Math.PI - azimuth) * radius);
        position.setZ(+Math.cos(Math.PI - azimuth) * radius);
      } else if (azimuth > Math.PI && azimuth <= (3 * Math.PI) / 2) {
        position.setX(-Math.sin(azimuth - Math.PI) * radius);
        position.setZ(+Math.cos(azimuth - Math.PI) * radius);
      } else if (azimuth > (3 * Math.PI) / 2 && azimuth <= 2 * Math.PI) {
        position.setX(-Math.sin(2 * Math.PI - azimuth) * radius);
        position.setZ(-Math.cos(2 * Math.PI - azimuth) * radius);
      } else {
        // está comprobado -> (0º - 90º)
        position.setX(+Math.sin(azimuth) * radius);
        position.setZ(-Math.cos(azimuth) * radius);
      }
      return position;
    }

    // PLOT AXIS
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    let oneTime = true;

    const animate = () => {
      requestAnimationFrame(animate);

      // TIME ACCELERATION
      if (getFlagAcceleration()) {
        if (oneTime) {
          oneTime = false;
          auxiliaryDate = actualDate.toDate();
        }
        auxiliaryDate.setMinutes(auxiliaryDate.getMinutes() + 3);
      }

      var moon_position = SunCalc.getMoonPosition(auxiliaryDate, 89.9999, 0);
      var new_position_moon = get_position(
        moon_position.altitude,
        moon_position.azimuth,
        120.672
      );
      if (moon != undefined) {
        moon.position.set(
          new_position_moon.x,
          new_position_moon.y,
          new_position_moon.z
        );
        // moon.rotation.y += 0.01;
        moon.lookAt(new THREE.Vector3(0, 0, 0));
        auxCamera.fov = 2.5;

        if (terrain != undefined) {
          terrain.rotation.y = Math.PI / 2;
        }

        // PLACE AUXILIARY CAMERA

        // Create vector from moon to earth by substracting positions
        let vector_earth_moon = new THREE.Vector3(0, 0, 0).sub(moon.position);
        // Normalize the vector so that it has length 1
        vector_earth_moon.normalize();
        // Multiply the vector by a number (distancia of the aux camera to the moon)
        vector_earth_moon.multiplyScalar(60);
        // Calculate the new camera position
        var cameraPosition = moon.position.clone().add(vector_earth_moon);
        // Set the camera position
        auxCamera.position.copy(cameraPosition);

        auxCamera.lookAt(moon.position);
      }

      var sun_position = SunCalc.getPosition(auxiliaryDate, 89.9999, 0);
      var new_position_sun = get_position(
        sun_position.altitude,
        sun_position.azimuth,
        180
      );
      pointLight.position.set(
        new_position_sun.x,
        new_position_sun.y,
        new_position_sun.z
      );
      renderer.setViewport(
        0,
        0,
        ref.current.clientWidth,
        ref.current.clientHeight
      );
      renderer.render(scene, camera);

      const size_aux_camera = ref.current.clientWidth / 5;
      auxCamera.aspect = 1;
      auxCamera.updateProjectionMatrix();
      renderer.setScissor(
        ref.current.clientWidth - size_aux_camera,
        0,
        size_aux_camera,
        size_aux_camera
      );
      renderer.setScissorTest(true);
      renderer.setViewport(
        ref.current.clientWidth - size_aux_camera,
        0,
        size_aux_camera,
        size_aux_camera
      );
      renderer.render(scene, auxCamera);

      // Reset scissor test
      renderer.setScissorTest(false);
      renderer.setViewport(
        0,
        0,
        ref.current.clientWidth,
        ref.current.clientHeight
      );

      var moonIllumination = SunCalc.getMoonIllumination(auxiliaryDate);
      // var moonPhase = moonIllumination.phase;
      var moonFraction = moonIllumination.fraction;

      document.getElementById("moon-info").textContent = `${(
        moonFraction * 100
      ).toFixed(2)}%`;
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ref.current.removeChild(renderer.domElement);
    };
  }, [actualDate, setActualDate]);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div
        id="moon-info"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          color: "#FF0B67",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      ></div>
    </div>
  );
}
export default ThreeComponent;
export { auxiliaryDate };
