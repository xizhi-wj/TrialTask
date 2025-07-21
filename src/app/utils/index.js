import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export class ScrollModel {
  constructor(param) {
    this.initScene();
    this.initCamera();
    this.initRenderer(param.canvas);
    this.setModel(param.path);
    // this.initRingModel();
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
