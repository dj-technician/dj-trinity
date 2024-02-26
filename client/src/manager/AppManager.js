import {Color, Mesh, PerspectiveCamera, Scene, WebGLRenderer} from "three";
import settings from "../options/canvas/settings.json";
import IntroCanvas from "@/scene/intro/IntroCanvas";
import {gsap} from 'gsap'
import LobbyCanvas from "@/scene/lobby/LobbyCanvas";

export default class AppManager {

  constructor() {
    this.init()
  }

  init() {
    this.scene = new Scene()
    this.scene.background = new Color(settings.common.background.color)
    this.camera = new PerspectiveCamera(45,
        window.innerWidth / window.innerHeight, 0.1, 500)
    this.camera.position.z = 10

    this.renderer = new WebGLRenderer({})
    this.renderer.setPixelRatio(window.devicePixelRatio) // 고해상도 디스플레이 대응
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.insertBefore(this.renderer.domElement,
        document.body.firstChild)

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }, false)

    this.draw = this.draw.bind(this)
    this.draw()
  }

  async changeScene(scene) {
    await this.removeScene()
    console.log('remove finished!!!')
    if (scene === 'introScene') {
      this.currentScene = new IntroCanvas(this)
    } else if (scene === 'lobbyScene') {
      this.currentScene = new LobbyCanvas(this)
    }

    if (this.currentScene) {
      await this.currentScene.init()
      gsap.to('#overlay', {
        duration: 0.5,
        opacity: 0,
        ease: "power2.in",
      })
    }
  }

  async removeScene() {
    if (!this.currentScene) {
      return Promise.resolve()
    }

    return new Promise(resolve => {
      gsap.to('#overlay', {
        duration: 0.5,
        opacity: 1,
        ease: "power2.out",
        onComplete: () => {
          // canvas 이외에 js 관련 세팅한 것이 있다면 해제한다.
          this.currentScene.destroy()
          this.disposeAll()
          this.currentScene = null;
          resolve()
        }
      })
    })
  }

  disposeAll() {
    while (this.scene.children.length > 0) {
      const object = this.scene.children[0];
      this.disposeTraversal(object);
      this.scene.remove(object);
    }
  }

  disposeTraversal(node) {
    if (!node) {
      return
    }

    for (let i = node.children.length - 1; i >= 0; i--) {
      const child = node.children[i];
      this.disposeTraversal(child);
      this.disposeSingle(child)
    }
  }

  disposeSingle(node) {
    if (node instanceof Mesh) {
      if (node.geometry) {
        node.geometry.dispose();
      }
      if (node.material) {
        if (Array.isArray(node.material)) {
          node.material.forEach(material => material.dispose());
        } else {
          node.material.dispose();
        }
        if (node.material.map) {
          node.material.map.dispose();
        } // 텍스처 해제
      }
    }
  }

  draw() {
    requestAnimationFrame(this.draw)
    this.renderer.render(this.scene, this.camera)
  }

}