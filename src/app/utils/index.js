import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import * as dat from "dat.gui";
gsap.registerPlugin(ScrollTrigger);

const gui = new dat.GUI();
gui.domElement.style.position = "fixed";
gui.domElement.style.right = "0";
gui.domElement.style.top = "0";
gui.domElement.style.zIndex = "9999";
export class ScrollModel {
  constructor(param) {
    this.initScene();
    this.initCamera();
    this.initRenderer(param.canvas);
    // this.setModel(param.path);
    this.initRingModel();
    this.resize();
    this.initLight();
    this.render();
  }

  initScene() {
    this.scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    // textureLoader.load("/bg.jpg", (texture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   this.scene.background = texture;
    //   this.scene.environment = texture;
    // });
    // this.scene.background = new THREE.Color(0xffffff);
    this.scene.background = new THREE.Color("#aaa");
    this.scene.environment = new THREE.Color("#aaa");
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 10;
  }

  initRenderer(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      // 抗锯齿
      antialias: true,
      //是否使用对数深度缓存，用于处理场景中巨大的比例差异
      logarithmicDepthBuffer: true,
      //物理上的正确光照模式,默认为false，提高渲染的性能
      physicallyCorrectLights: true,
    });
    this.renderer.shadowMap.enabled = true;
    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // this.renderer.toneMappingExposure = 1.5;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement = this.renderer.domElement;
    this.domElement.style.position = "fixed";
    this.domElement.style.top = "0";
    this.domElement.style.left = "0";
    this.domElement.style.zIndex = "-99";
    this.domElement.style.pointerEvents = "none";
    this.domElement.style.width = "100vw";
    this.domElement.style.height = "100vh";
    document.body.appendChild(this.domElement);
  }

  setModel(path) {
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("/draco/");
    this.loader.setDRACOLoader(this.dracoLoader);
    this.loader.load(path, (gltf) => {
      this.model = gltf.scene;
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xefefef,
        transmission: 0.9, // 透光率 (0-1)
        opacity: 0.8, // 透明度 (0-1)
        metalness: 0.0, // 金属感 (0-1)
        roughness: 0.1, // 粗糙度 (0-1)
        ior: 1.5, // 折射率 (1-2.333)
        thickness: 0.5, // 材质厚度
        specularIntensity: 1, // 镜面反射强度
        envMapIntensity: 1, // 环境贴图强度
        clearcoat: 0.5, // 清漆层
        clearcoatRoughness: 0.1, // 清漆层粗糙度
      });

      this.model.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
        }
      });
      this.initPosition();
      this.scene.add(gltf.scene);
    });
  }

  async initRingModel() {
    this.ringModels = [];
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("/draco/");
    this.loader.setDRACOLoader(this.dracoLoader);
    for (let i = 1; i <= 5; i++) {
      const gltf = await this.loader.loadAsync(`/model/ring_${i}.glb`);
      this.ringModels.push(gltf.scene);
      this.scene.add(gltf.scene);
    }
  }

  initScrollAnimation() {}

  initPosition() {
    this.model.position.set(0, -40, -120);
    this.model.scale.set(0.8, 0.8, 0.8);
    this.model.rotation.z = Math.PI;
  }

  initLight() {
    // 添加光源
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);
  }

  scroll(percent) {
    this.model.position.y = -40 + percent * 20;
    this.model.rotation.y = percent * Math.PI * 2;
  }

  resize() {
    // 更新摄像头
    this.camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix();
    //   更新渲染器
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比例
    this.renderer.setPixelRatio(window.devicePixelRatio);
    window.addEventListener("resize", this.resize.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

// export const getVideoFrame = (video, canvas, percent) => {
//   video.currentTime = percent * video.duration;
//   video.oncanplay = () => {
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//   };
// };

export class RingModel {
  constructor(param) {
    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initModel();
    this.resize();
    this.initLight();
    this.render();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("rgb(0, 0, 0)");
    this.scene.environment = new THREE.Color("rgb(0, 0, 0)");
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0.5, 5.5);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: true,
      // 抗锯齿
      antialias: true,
      //是否使用对数深度缓存，用于处理场景中巨大的比例差异
      logarithmicDepthBuffer: true,
      //物理上的正确光照模式,默认为false，提高渲染的性能
      physicallyCorrectLights: true,
    });
    this.renderer.shadowMap.enabled = true;
    // this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // this.renderer.toneMappingExposure = 1.5;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.domElement = this.renderer.domElement;
    this.domElement.style.position = "fixed";
    this.domElement.style.top = "0";
    this.domElement.style.left = "0";
    this.domElement.style.zIndex = "-99";
    this.domElement.style.pointerEvents = "none";
    this.domElement.style.width = "100vw";
    this.domElement.style.height = "100vh";
    document.body.appendChild(this.domElement);
  }

  async initModel() {
    this.ringModels = [];
    this.loader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("/draco/");
    this.loader.setDRACOLoader(this.dracoLoader);
    const sphereGeometry = new THREE.SphereGeometry(0.38, 64, 64);
    const sphereMaterial = new THREE.MeshBasicMaterial();
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.sphere.scale.set(0, 0, 0);
    this.scene.add(this.sphere);
    const ring_1 = await this.loader.loadAsync("/model/ring_1.glb");
    ring_1.scene.scale.set(6, 6, 6);
    ring_1.scene.rotation.x = Math.PI / 4;
    ring_1.scene.rotation.y = 0;
    ring_1.scene.rotation.z = Math.PI / 4;
    const ring_2 = await this.loader.loadAsync("/model/ring_2.glb");
    const ring_3 = await this.loader.loadAsync("/model/ring_3.glb");
    const ring_4 = await this.loader.loadAsync("/model/ring_4.glb");
    const ring_5 = await this.loader.loadAsync("/model/ring_5.glb");
    ring_2.scene.scale.set(0, 0, 0);
    ring_3.scene.scale.set(0, 0, 0);
    ring_4.scene.scale.set(0, 0, 0);
    ring_5.scene.scale.set(0, 0, 0);
    this.ringModels.push(
      ring_1.scene,
      ring_2.scene,
      ring_3.scene,
      ring_4.scene,
      ring_5.scene
    );
    this.initMaterial();
    this.scene.add(
      ring_1.scene,
      ring_2.scene,
      ring_3.scene,
      ring_4.scene,
      ring_5.scene
    );
  }

  initLight() {
    // 添加光源
    const lightColorControl = {
      ambientLightColor: 0xffffff,
      directionalLightColor: 0xffffff,
      pointLightColor: 0xffffff,
      hemisphereLightColor: 0xffffff,
      spotLightColor: 0xffffff,
    };
    const light = new THREE.AmbientLight(0xffffff, 2);
    gui.add(light, "intensity", 0, 10, 0.01);
    gui.addColor(lightColorControl, "ambientLightColor").onChange((value) => {
      light.color.set(value);
    });
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.castShadow = true;
    directionalLight.position.set(-50, 50, 50);
    gui.add(directionalLight, "intensity", 0, 10, 0.01);
    gui
      .addColor(lightColorControl, "directionalLightColor")
      .onChange((value) => {
        directionalLight.color.set(value);
      });
    const pointLight = new THREE.PointLight(0xffffff, 4, 1000);
    gui.add(pointLight, "intensity", 0, 10, 0.01);
    gui.addColor(lightColorControl, "pointLightColor").onChange((value) => {
      pointLight.color.set(value);
    });
    pointLight.position.set(0, 0, 0);
    this.scene.add(light);
    this.scene.add(pointLight);
    this.scene.add(directionalLight);
  }

  initMaterial() {
    // 添加材质
    const material = new THREE.MeshPhysicalMaterial({
      color: "rgb(166, 165, 157)",
      metalness: 0.1,
      roughness: 0.6,
      reflectivity: 1,
      ior: 0.12,
      specularIntensity: 1,
    });
    gui.add(material, "roughness", 0, 1, 0.01);
    gui.add(material, "metalness", 0, 1, 0.01);
    gui.add(material, "ior", 0, 2.3333, 0.01);
    gui.add(material, "reflectivity", 0, 1, 0.01);
    gui.add(material, "specularIntensity", 0, 1, 0.01);

    // 颜色控制对象
    const colorControls = {
      materialColor: "rgb(73, 85, 187)", // 初始颜色与材质颜色一致
      emissive: "rgb(0, 0, 0)",
      specularColor: "rgb(255, 255, 255)",
    };

    gui.addColor(colorControls, "materialColor").onChange((value) => {
      material.color.set(value);
    });
    gui.addColor(colorControls, "emissive").onChange((value) => {
      material.emissive.set(value);
    });
    gui.addColor(colorControls, "specularColor").onChange((value) => {
      material.specularColor.set(value);
    });
    this.sphere.material = material;
    this.sphere.castShadow = true;
    this.sphere.receiveShadow = true;
    this.ringModels.forEach((ring) => {
      ring.castShadow = true;
      ring.receiveShadow = true;
      ring.traverse((child) => {
        if (child.isMesh) {
          child.material = material;
        }
      });
    });
  }

  resize() {
    // 更新摄像头
    this.camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix();
    //   更新渲染器
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //   设置渲染器的像素比例
    this.renderer.setPixelRatio(window.devicePixelRatio);
    window.addEventListener("resize", this.resize.bind(this));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }

  scroll(percent) {
    this.camera.position.y = 0.5 - percent * 0.5;
    this.setScale(percent);
    this.setRotation(percent);
  }

  setRotation(percent) {
    this.ringModels[0].rotation.set(
      Math.PI / 4 + (percent * Math.PI) / 3,
      (percent * Math.PI) / 2,
      Math.PI / 4 + (percent * Math.PI) / 2.5
    );
    this.ringModels[1].rotation.set(
      Math.PI / 4 + percent * Math.PI,
      percent * Math.PI,
      Math.PI / 4 + percent * Math.PI
    );
    this.ringModels[2].rotation.set(
      percent * Math.PI,
      Math.PI / 4 + (percent * Math.PI) / 3,
      Math.PI / 4 + (percent * Math.PI) / 3
    );
    this.ringModels[3].rotation.set(
      (percent * Math.PI) / 2,
      Math.PI / 4 + percent * Math.PI,
      Math.PI / 4 + percent * Math.PI
    );
    this.ringModels[4].rotation.set(
      (percent * Math.PI) / 3,
      Math.PI / 4 + (percent * Math.PI) / 2,
      Math.PI / 4 - (percent * Math.PI) / 2
    );
  }

  setScale(percent) {
    const clamped = [
      Math.min(percent, 0.2) * 24, // ringModels[1]
      Math.max(0, Math.min(percent - 0.2, 0.4)) * 10, // ringModels[2]
      Math.max(0, Math.min(percent - 0.4, 0.2)) * 16, // ringModels[3]
      Math.max(0, Math.min(percent - 0.6, 0.2)) * 13.5, // ringModels[4]
    ];
    for (let i = 0; i < 4; i++) {
      this.ringModels[i + 1].scale.set(
        clamped[i],
        clamped[i] + 1.5,
        clamped[i]
      );
    }
    const sphereScale = percent > 0.6 ? Math.min((percent - 0.6) * 5, 1) : 0;
    this.sphere.scale.set(sphereScale, sphereScale, sphereScale);
  }
}
