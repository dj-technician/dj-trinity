import {
  AudioLoader,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  LoadingManager,
  TextureLoader,
  Vector3
} from "three";
import {FontLoader} from "three/addons";
import settings from "../settings/settings.json"
import BmsLoader from "./bmsLoader";

export default class ResourceLoader {
  constructor(ctx) {
    this.context = ctx
    this.manager = new LoadingManager()
    this.loadPromiseResolve = null
    this.loadPromiseReject = null
    this.loadFinished = null
    this.loadLine = null

    this.manager.onStart = (url, itemsLoaded, itemsTotal) => {
      console.log('Started loading file');
    };

    this.manager.onLoad = () => {
      this.finishLoad()
    };

    this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = itemsLoaded / itemsTotal;
      console.log('Loading progress: ' + progress * 100 + '%');
      this.loadLine.geometry.setFromPoints([
        new Vector3(settings.frustumSize * this.context.aspect / -2,
            settings.frustumSize / 2 - 5, 0),
        new Vector3(settings.frustumSize * this.context.aspect * progress
            - settings.frustumSize * this.context.aspect / -2,
            settings.frustumSize / 2 - 5, 0)
      ])
    };

    this.manager.onError = (url) => {
      this.loadPromiseReject()
    };
  }

  load = async (resources) => {
    return new Promise((resolve, reject) => {
      this.loadPromiseResolve = resolve
      this.loadPromiseReject = reject

      this.loadLine = new Line(new BufferGeometry(), new LineBasicMaterial({
        color: 0x8c8c8c,
        linewidth: 5
      }))
      this.context.scene.add(this.loadLine)

      let loadTargetCount = 0
      const fontLoader = new FontLoader(this.manager)
      Object.keys(resources.fonts).forEach(fontPath => {
        if (resources.fonts[fontPath] !== null) {
          return
        }
        loadTargetCount++
        fontLoader.load(fontPath, function (font) {
          resources.fonts[fontPath] = font
        })
      })

      const soundLoader = new AudioLoader(this.manager)
      Object.keys(resources.sounds).forEach(soundPath => {
        if (resources.sounds[soundPath] !== null) {
          return
        }
        loadTargetCount++
        soundLoader.load(soundPath, function (buffer) {
          resources.sounds[soundPath] = buffer
        })
      })

      const bmsLoader = new BmsLoader(this.manager)
      if (resources['bms-meta'] !== undefined) {
        if (resources['bms-meta'] == null || Array.isArray(
            resources['bms-meta'])) {
          loadTargetCount++
          bmsLoader.load('', function (bmsMap) {
            resources['bms-meta'] = bmsMap

            // load stage image
            console.log('bmsMap : ', bmsMap)
            Object.keys(bmsMap).forEach(bmsList => {
              bmsMap[bmsList].forEach(bms => {
                const bmsId = bms['id']
                const bmsStageTexturePath = `http://localhost:5002/download/bms/stage/${bmsId}`
                if (!resources.textures[bmsStageTexturePath]) {
                  resources.textures[bmsStageTexturePath] = null
                }
              })
            })
          })
        }
      }

      const textureLoader = new TextureLoader(this.manager)
      Object.keys(resources.textures).forEach(texturePath => {
        if (resources.textures[texturePath] !== null) {
          return
        }
        loadTargetCount++
        textureLoader.load(texturePath, function (texture) {
          resources.textures[texturePath] = texture
        })
      })

      // todo other resources

      if (loadTargetCount === 0) {
        this.finishLoad()
      }
      this.animate()
    })
  }

  finishLoad = () => {
    this.loadFinished = true
    this.context.removeObject(this.loadLine)
    this.loadPromiseResolve()
  }

  animate = () => {
    if (this.loadFinished) {
      return
    }
    requestAnimationFrame(this.animate);
    this.context.draw()
  }

}