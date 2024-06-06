import { useRef, useEffect } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SunCalc } from "./suncalc.js";
import {
  Lensflare,
  LensflareElement,
} from "three/examples/jsm/objects/Lensflare";

function ThreeComponent() {
  const ref = useRef(null);

  useEffect(() => {
    // SCENE
    const scene = new THREE.Scene();

    // LIGHTS
    const light = new THREE.AmbientLight( 0x404040, 3 ); // soft white light
    scene.add( light );
    
    const pointLight = new THREE.DirectionalLight(0xffffff, 10); // color blanco, intensidad 1, distancia 100
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
    const renderer = new THREE.WebGLRenderer({ alpha: true });
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

    // SKYBOX
    new RGBELoader().load(
      "/stars.hdr",
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      }
    );

    // RESIZE LISTENER
    const handleResize = () => {
      renderer.setSize(ref.current.clientWidth, ref.current.clientHeight);
      camera.aspect = ref.current.clientWidth / ref.current.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // MOON 3D MODEL
    var moon;
    const loader_moon = new FBXLoader();
    loader_moon.load(
      "/moon.FBX",
      function (object) {
        moon = object;
        object.scale.multiplyScalar(0.0088);
        scene.add(object);
      },
      undefined,
      function (error) {
        // Check error while loading moon model
        console.error(error);
      }
    );

// TERRAIN MODEL
var terrain;
const loader_terrain = new FBXLoader();
loader_terrain.load('/earth.fbx', function (object) {
  terrain = object;
  object.scale.multiplyScalar(0.01);
  scene.add(object);
  terrain.receiveShadow = true;
}, undefined, function (error) { // Check error while loading terrain model
  console.error(error);
});

    // PLACE MOON AND SUN
    function get_position(altitude, azimuth, distance) {
      var position = new THREE.Vector3();
      position.setY(Math.sin(altitude) * distance);
      const radius = Math.sqrt(distance * distance - position.y * position.y);
      if (azimuth > Math.PI / 2 && azimuth <= Math.PI) {
        position.setX(-Math.cos(Math.PI - azimuth) * radius);
        position.setZ(Math.sin(Math.PI - azimuth) * radius);
      } else if (azimuth > Math.PI && azimuth <= (3 * Math.PI) / 2) {
        position.setX(-Math.cos(azimuth - Math.PI) * radius);
        position.setZ(-Math.sin(azimuth - Math.PI) * radius);
      } else if (azimuth > (3 * Math.PI) / 2 && azimuth <= 2 * Math.PI) {
        position.setX(Math.cos(2 * Math.PI - azimuth) * radius);
        position.setZ(-Math.sin(2 * Math.PI - azimuth) * radius);
      } else {
        position.setX(Math.cos(azimuth) * radius);
        position.setZ(Math.sin(azimuth) * radius);
      }
      return position;
    }

    //ASK FOR USER CURRENT LOCATION
    let latitude = 0;
    let longitude = 0;

    // Get user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });

    // PLOT AXIS
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    function animate() {
      requestAnimationFrame(animate);

      const date = new Date();
      var moon_position = SunCalc.getMoonPosition(date, latitude, longitude);
      var new_position_moon = get_position(
        moon_position.altitude,
        moon_position.azimuth,
        moon_position.distance / 15000
      );
      if (moon != undefined) {
        moon.position.set(
          new_position_moon.x,
          new_position_moon.y,
          new_position_moon.z
        );
        moon.lookAt(new THREE.Vector3(0, 0, 0));
        auxCamera.fov = 2.5;
        auxCamera.lookAt(moon.position);
      }

      var sun_position = SunCalc.getPosition(date, latitude, longitude);
      var new_position_sun = get_position(
        sun_position.altitude,
        sun_position.azimuth,
        100
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
    }
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ref.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}

export default ThreeComponent;
