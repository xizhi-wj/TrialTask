import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const debounce = (func, wait = 500) => {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

export class ScrollModel {
  constructor(param) {
    this.initScene();
    this.initCamera();
    this.initRenderer(param.canvas);
    this.setModel(param.path);
    this.resize();
    document.addEventListener("resize", this.resize.bind(this));
    this.render();
  }

  initScene() {
    this.scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/25s.jpg", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture;
    });
    this.scene.background = new THREE.Color(0xffffff);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 100;
  }

  initRenderer(canvas) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
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
    this.loader.load(path, (gltf) => {
      this.model = gltf.scene;
      this.scene.add(gltf.scene);
    });
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

export const getVideoFrame = (video, canvas, percent) => {
  video.currentTime = percent * video.duration;
  video.oncanplay = () => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };
};

const lerp = (start, end, amt) => (1 - amt) * start + amt * end; // 对两个值进行线性插值 (0 <= amt <= 1)
const damp = (x, y, lambda, dt) => lerp(x, y, 1 - Math.exp(-lambda * dt)); // 阻尼效果
const clamp = (min, input, max) => Math.max(min, Math.min(input, max)); // 获取一个中间值

export class Silky {
  timeRecord = 0; // 回调时间记录
  targetScroll = 0; // 当前滚动位置
  animatedScroll = 0; // 动画滚动位置
  from = 0; // 记录起始位置
  to = 0; // 记录目标位置
  lerp; // 插值强度 0~1
  currentTime = 0; // 记录当前时间
  duration = 0; // 滚动动画的持续时间

  constructor({
    content,
    lerp,
    duration,
    easing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  } = {}) {
    this.lerp = isNaN(lerp) ? 0.1 : lerp;
    this.content = content || document.body;
    this.duration = duration || 1;
    this.easing = easing;
    const onWeel = (e) => {
      e.preventDefault(); // 阻止默认事件，停止滚动
      this.onVirtualScroll(this.targetScroll + e.deltaY);
    };
    this.content.addEventListener("wheel", onWeel, { passive: false });
  }
  raf(time) {
    if (!this.isRunning) return;
    const deltaTime = time - (this.timeRecord || time);
    this.timeRecord = time;
    this.advance(deltaTime * 0.001);
  }
  onVirtualScroll(target) {
    this.isRunning = true;
    this.to = target;
    this.currentTime = 0;
    this.from = this.animatedScroll;
    this.onUpdate = (value) => {
      this.animatedScroll = value; // 记录动画距离
      this.content.scrollTop = this.animatedScroll; // 设置滚动
      this.targetScroll = value; // 记录滚动后的距离
    };
  }
  advance(deltaTime) {
    let completed = false;
    let value = 0;
    if (this.lerp) {
      value = damp(this.targetScroll, this.to, this.lerp * 60, deltaTime);
      if (Math.round(this.value) === Math.round(this.to)) {
        completed = true;
      }
    } else {
      this.currentTime += deltaTime;
      const linearProgress = clamp(0, this.currentTime / this.duration, 1);
      completed = linearProgress >= 1;
      const easedProgress = completed ? 1 : this.easing(linearProgress);
      value = this.from + (this.to - this.from) * easedProgress;
    }
    this.onUpdate?.(value);
    if (completed) this.isRunning = false;
  }
}
