import {Group, Mesh, MeshBasicMaterial, PlaneGeometry} from "three";
import {TextGeometry} from "three/addons";
import vs from "./lobbySceneViewSettings.json";

export default class LobbySceneView {

  constructor(manager) {
    this.manager = manager
    this.info = this.manager.context.info
  }

  init = () => {
    const commonResources = this.manager.context.commonResources

    // my profile
    this.profile = new Group()
    const profileIdG = new TextGeometry(`[  ${this.info.user.id}  ]`, {
      font: commonResources.fonts[vs.profile.profileId.font],
      size: vs.profile.profileId.size,
    })
    this.profileId = new Mesh(profileIdG, new MeshBasicMaterial({
      color: vs.profile.profileId.color
    }))
    this.profileId.position.set(vs.profile.profileId.x, vs.profile.profileId.y)
    const profileNicknameG = new TextGeometry(`${this.info.user.nickname}`, {
      font: commonResources.fonts[vs.profile.profileNickname.font],
      size: vs.profile.profileNickname.size,
    })
    this.profileNickname = new Mesh(profileNicknameG, new MeshBasicMaterial({
      color: vs.profile.profileNickname.color
    }))
    this.profileNickname.position.set(vs.profile.profileNickname.x,
        vs.profile.profileNickname.y)
    const profileImageG = new PlaneGeometry(vs.profile.profileImage.width,
        vs.profile.profileImage.height)
    const profileImageM = new MeshBasicMaterial({
      map: this.manager.resources.textures[this.info.user.profile]
    })
    this.profileImage = new Mesh(profileImageG, profileImageM)
    this.profileImage.position.set(vs.profile.profileImage.x,
        vs.profile.profileImage.y)
    this.profile.add(this.profileId)
    this.profile.add(this.profileNickname)
    this.profile.add(this.profileImage)
    this.profile.position.set(vs.profile.x, vs.profile.y)

    // current channel
    const channelIdG = new TextGeometry(`# ${this.info.channel.id}`, {
      font: commonResources.fonts[vs.channelId.font],
      size: vs.channelId.size,
    })
    this.channelId = new Mesh(channelIdG, new MeshBasicMaterial({
      color: vs.channelId.color
    }))
    this.channelId.position.set(vs.channelId.x, vs.channelId.y)

    // channel with users
    this.userProfiles = new Group()
    this.userProfileList = new Group()
    this.userProfileEmpty = new Mesh(
        new TextGeometry(vs.userProfileList.userProfileEmpty.text, {
          font: commonResources.fonts[vs.userProfileList.userProfileEmpty.font],
          size: vs.userProfileList.userProfileEmpty.size,
        }), new MeshBasicMaterial({
          color: vs.userProfileList.userProfileEmpty.color
        }))
    this.userProfileEmpty.position.set(vs.userProfileList.userProfileEmpty.x,
        vs.userProfileList.userProfileEmpty.y)
    const userProfileBoxG = new PlaneGeometry(
        vs.userProfileList.profileBox.width,
        vs.userProfileList.profileBox.height)
    this.userProfileBox = new Mesh(userProfileBoxG,
        new MeshBasicMaterial(vs.userProfileList.profileBox.material))
    this.userProfileBox.position.set(vs.userProfileList.profileBox.x,
        vs.userProfileList.profileBox.y, -1)
    this.userProfiles.add(this.userProfileList)
    this.userProfiles.add(this.userProfileEmpty)
    this.userProfiles.add(this.userProfileBox)
    this.userProfiles.position.set(vs.userProfileList.x, vs.userProfileList.y)

    // chat box
    this.chatBox = new Group()
    this.chatText = new Group()
    const chatListG = new PlaneGeometry(vs.chatBox.list.width,
        vs.chatBox.list.height)
    const chatListM = new MeshBasicMaterial(vs.chatBox.list.material)
    const chatList = new Mesh(chatListG, chatListM)
    chatList.position.set(vs.chatBox.list.x, vs.chatBox.list.y)
    this.chatText.position.set(vs.chatBox.text.x, vs.chatBox.text.y)
    this.chatBox.add(chatList)
    this.chatBox.add(this.chatText)
    this.chatBox.position.set(vs.chatBox.x, vs.chatBox.y, 0)

    // chat input
    this.chatInput = new Group()
    const chatInputBoxG = new PlaneGeometry(vs.chatInput.box.width,
        vs.chatInput.box.height)
    const chatInputBoxM = new MeshBasicMaterial(vs.chatInput.box.material)
    const chatInputBox = new Mesh(chatInputBoxG, chatInputBoxM)
    const chatInputSenderG = new TextGeometry(`${this.info.user.nickname} : `, {
      font: commonResources.fonts[vs.chatInput.sender.font],
      size: vs.chatInput.sender.size,
    })
    const chatInputSender = new Mesh(chatInputSenderG, new MeshBasicMaterial({
      color: vs.chatInput.sender.color
    }))
    chatInputSender.geometry.computeBoundingBox()
    chatInputSender.position.set(vs.chatInput.sender.x, vs.chatInput.sender.y)
    const chatInputTextG = new TextGeometry(this.manager.chatInputText, {
      font: commonResources.fonts[vs.chatInput.text.font],
      size: vs.chatInput.text.size,
    })
    this.chatInputText = new Mesh(chatInputTextG, new MeshBasicMaterial({
      color: vs.chatInput.text.color
    }))
    this.chatInputText.position.set(
        chatInputSender.position.x + chatInputSender.geometry.boundingBox.max.x
        + 10,
        vs.chatInput.text.y)
    this.chatInputText.geometry.computeBoundingBox()
    const cursorG = new TextGeometry("|", {
      font: commonResources.fonts[vs.chatInput.text.font],
      size: vs.chatInput.text.size,
    })
    this.chatInputCursor = new Mesh(cursorG, new MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 1,
    }))
    this.chatInputCursor.position.set(
        this.chatInputText.position.x
        + this.chatInputText.geometry.boundingBox.max.x + 5,
        vs.chatInput.text.y)
    this.chatInput.add(chatInputBox)
    this.chatInput.add(chatInputSender)
    this.chatInput.add(this.chatInputText)
    this.chatInput.add(this.chatInputCursor)

    // bms select list
    this.bmsSelectList = new Group()
    this.bmsSelectItems = new Group()
    const bmsSelectListBoxG = new PlaneGeometry(vs.bmsSelectList.box.width,
        vs.bmsSelectList.box.height)
    const bmsSelectListBoxM = new MeshBasicMaterial(
        vs.bmsSelectList.box.material)
    const bmsSelectListBox = new Mesh(bmsSelectListBoxG, bmsSelectListBoxM)
    bmsSelectListBox.position.set(vs.bmsSelectList.box.x,
        vs.bmsSelectList.box.y)
    const bmsSelectListCursorG = new PlaneGeometry(
        vs.bmsSelectList.cursor.width, vs.bmsSelectList.cursor.height)
    const bmsSelectListCursorM = new MeshBasicMaterial(
        vs.bmsSelectList.cursor.material)
    const bmsSelectListCursor = new Mesh(bmsSelectListCursorG,
        bmsSelectListCursorM)
    bmsSelectListCursor.position.set(vs.bmsSelectList.cursor.x,
        vs.bmsSelectList.cursor.y)
    this.bmsSelectList.add(bmsSelectListBox)
    this.bmsSelectList.add(bmsSelectListCursor)
    this.bmsSelectList.add(this.bmsSelectItems)
    this.bmsSelectList.position.set(vs.bmsSelectList.item.x,
        vs.bmsSelectList.item.y)

    // bms detail
    this.bmsDetail = new Group()
    const bmsDetailBoxG = new PlaneGeometry(vs.bmsDetail.box.width,
        vs.bmsDetail.box.height)
    const bmsDetailBoxM = new MeshBasicMaterial(vs.bmsDetail.box.material)
    const bmsDetailBox = new Mesh(bmsDetailBoxG, bmsDetailBoxM)
    bmsDetailBox.position.set(vs.bmsDetail.box.x, vs.bmsDetail.box.y)
    const bmsDetailTextBoxG = new PlaneGeometry(vs.bmsDetail.textBox.width,
        vs.bmsDetail.textBox.height)
    const bmsDetailTextBoxM = new MeshBasicMaterial(
        vs.bmsDetail.textBox.material)
    const bmsDetailTextBox = new Mesh(bmsDetailTextBoxG, bmsDetailTextBoxM)
    bmsDetailTextBox.position.set(vs.bmsDetail.textBox.x,
        vs.bmsDetail.textBox.y)
    const bmsDetailTitleG = new TextGeometry(
        this.manager.currentBms.bmsHeader.title, {
          font: commonResources.fonts[vs.bmsDetail.text.title.font],
          size: vs.bmsDetail.text.title.size
        })
    this.bmsDetailTitle = new Mesh(bmsDetailTitleG,
        new MeshBasicMaterial(vs.bmsDetail.text.material))
    this.bmsDetailTitle.position.set(vs.bmsDetail.text.x, vs.bmsDetail.text.y)
    this.bmsDetailText = new Mesh(new TextGeometry(
        `artist : ${this.manager.currentBms.bmsHeader.artist}\n`,
        {
          font: commonResources.fonts[vs.bmsDetail.text.desc.font],
          size: vs.bmsDetail.text.desc.size
        }
    ), new MeshBasicMaterial(vs.bmsDetail.text.desc.material))
    this.bmsDetailText.position.set(vs.bmsDetail.text.x,
        vs.bmsDetail.text.y - 20)
    const bmsDetailStageImageG = new PlaneGeometry(vs.bmsDetail.stage.width,
        vs.bmsDetail.stage.height)
    const bmsDetailStageImageM = new MeshBasicMaterial({
      map: this.manager.resources.textures[`http://localhost:5002/download/bms/stage/${this.manager.currentBms.id}`]
    })
    this.bmsDetailStageImage = new Mesh(bmsDetailStageImageG,
        bmsDetailStageImageM)
    this.bmsDetail.add(bmsDetailBox)
    this.bmsDetail.add(bmsDetailTextBox)
    this.bmsDetail.add(this.bmsDetailTitle)
    this.bmsDetail.add(this.bmsDetailText)
    this.bmsDetail.add(this.bmsDetailStageImage)
    this.bmsDetail.position.set(vs.bmsDetail.x, vs.bmsDetail.y)
  }

  clearCanvas = () => {
    this.manager.context.scene.remove(this.profile)
    this.manager.context.scene.remove(this.userProfiles)
    this.manager.context.scene.remove(this.channelId)
    this.manager.context.scene.remove(this.chatBox)
    this.manager.context.scene.remove(this.chatInput)
    this.manager.context.scene.remove(this.bmsSelectList)
    this.manager.context.scene.remove(this.bmsDetail)

  }

  drawChatRoom = () => {
    this.manager.context.scene.add(this.profile)
    this.manager.context.scene.add(this.userProfiles)
    this.manager.context.scene.add(this.channelId)
    this.manager.context.scene.add(this.chatBox)
    this.manager.context.scene.add(this.bmsSelectList)
    this.manager.context.scene.add(this.bmsDetail)

    this.updateTextGeometries()
  }

  toggleChatInput = () => {
    if (this.isChatInputOpen()) {
      this.manager.context.scene.remove(this.chatInput)
      return
    }
    this.manager.context.scene.add(this.chatInput)
  }

  isChatInputOpen = () => {
    return this.manager.context.scene.children.includes(this.chatInput)
  }

  updateTextGeometries = () => {
    const commonResources = this.manager.context.commonResources
    // channel id
    this.channelId.geometry.dispose()
    this.channelId.geometry = new TextGeometry(`# ${this.info.channel.id}`, {
      font: commonResources.fonts["font/Tektur_Regular.json"],
      size: 15,
    })

    // users
    this.manager.context.removeGroup(this.userProfileList)
    this.userProfiles.remove(this.userProfileEmpty)
    for (let i = 0; i < this.manager.showUsers.length; i++) {
      const user = this.manager.showUsers[i]

      const userProfile = new Group()
      const profileIdG = new TextGeometry(`[  ${user.id}  ]`, {
        font: commonResources.fonts[vs.userProfileList.profileId.font],
        size: vs.userProfileList.profileId.size,
      })
      const profileId = new Mesh(profileIdG, new MeshBasicMaterial({
        color: vs.userProfileList.profileId.color
      }))
      profileId.position.set(vs.userProfileList.profileId.x,
          vs.userProfileList.profileId.y)
      const nickNameG = new TextGeometry(`${user.nickname}`, {
        font: commonResources.fonts[vs.userProfileList.profileNickname.font],
        size: vs.userProfileList.profileNickname.size,
      })
      const nickName = new Mesh(nickNameG, new MeshBasicMaterial({
        color: vs.userProfileList.profileNickname.color
      }))
      nickName.position.set(vs.userProfileList.profileNickname.x,
          vs.userProfileList.profileNickname.y)
      const imageG = new PlaneGeometry(vs.userProfileList.profileImage.width,
          vs.userProfileList.profileImage.height)
      const imageM = new MeshBasicMaterial({
        map: this.manager.resources.textures[user.profile]
      })
      const image = new Mesh(imageG, imageM)
      image.position.set(vs.userProfileList.profileImage.x,
          vs.userProfileList.profileImage.y)

      userProfile.add(profileId)
      userProfile.add(nickName)
      userProfile.add(image)
      userProfile.position.set(0,
          -i * vs.userProfileList.yOffset, 0)
      this.userProfileList.add(userProfile)
    }
    if (this.userProfileList.children.length === 0) {
      this.userProfiles.add(this.userProfileEmpty)
    }

    // chats
    this.manager.context.removeGroup(this.chatText)
    for (let i = 0; i < this.manager.showChats.length; i++) {
      const chat = this.manager.showChats[i]

      if (chat.chatType === "SYSTEM") {
        const chatG = new TextGeometry(
            `[SYSTEM : ${chat.sendTime.split('T')[1].split(
                '.')[0]}] ${chat.message}`, {
              font: commonResources.fonts[vs.chatBox.text.font],
              size: vs.chatBox.text.size,
            })
        const chatObj = new Mesh(chatG, new MeshBasicMaterial({
          color: vs.chatBox.text.systemColor
        }))
        chatObj.position.set(0, -i * vs.chatBox.text.yOffset)
        this.chatText.add(chatObj)
        continue
      }

      if (chat.chatType === "NORMAL") {
        let color = vs.chatBox.text.normalColor
        if (chat.userId === this.manager.context.info.user.id) {
          color = vs.chatBox.text.userColor
        }
        const chatG = new TextGeometry(
            `[${chat.nickname} : ${chat.sendTime.split('T')[1].split(
                '.')[0]}] ${chat.message}`, {
              font: commonResources.fonts[vs.chatBox.text.font],
              size: vs.chatBox.text.size,
            })
        const chatObj = new Mesh(chatG, new MeshBasicMaterial({
          color: color
        }))
        chatObj.position.set(0, -i * vs.chatBox.text.yOffset)
        this.chatText.add(chatObj)
        continue
      }
    }

    // chat input
    this.chatInputText.geometry.dispose()
    this.chatInputText.geometry = new TextGeometry(this.manager.chatInputText, {
      font: commonResources.fonts[vs.chatInput.text.font],
      size: vs.chatInput.text.size,
    })
    this.chatInputText.geometry.computeBoundingBox()
    let boundingBoxMaxX = this.chatInputText.geometry.boundingBox.max.x
    if (boundingBoxMaxX === -Infinity) {
      boundingBoxMaxX = 0
    }
    let lastIndex = this.manager.chatInputText.length - 1;
    // 뒤에서부터 첫 번째 비공백 문자를 찾기
    while (lastIndex >= 0 && this.manager.chatInputText[lastIndex] === ' ') {
      lastIndex--;
    }
    // 마지막 공백부터 텍스트 끝까지의 길이 계산
    const numTrailingSpaces = this.manager.chatInputText.length - lastIndex - 1;
    boundingBoxMaxX += numTrailingSpaces * 3
    this.chatInputCursor.position.x = this.chatInputText.position.x
        + boundingBoxMaxX + 5

    // bms select list
    this.manager.context.removeGroup(this.bmsSelectItems)
    Object.keys(this.manager.showBms).forEach((bmsTitle, i) => {
      const bmsSelectItem = new Group()
      const bmsSelectItemTextG = new TextGeometry(bmsTitle, {
        font: commonResources.fonts[vs.bmsSelectList.item.font],
        size: vs.bmsSelectList.item.size,
      })
      const bmsSelectItemText = new Mesh(bmsSelectItemTextG,
          new MeshBasicMaterial({
            color: vs.bmsSelectList.item.color
          }))
      bmsSelectItem.add(bmsSelectItemText)
      bmsSelectItem.position.set(0, i * vs.bmsSelectList.item.heightInterval)
      this.bmsSelectItems.add(bmsSelectItem)
    })

    // bms detail
    this.bmsDetailTitle.geometry.dispose()
    this.bmsDetail.remove(this.bmsDetailTitle)
    const bmsDetailTitleG = new TextGeometry(
        this.manager.currentBms.bmsHeader.title, {
          font: commonResources.fonts[vs.bmsDetail.text.title.font],
          size: vs.bmsDetail.text.title.size
        })
    this.bmsDetailTitle = new Mesh(bmsDetailTitleG,
        new MeshBasicMaterial(vs.bmsDetail.text.material))
    this.bmsDetailTitle.position.set(vs.bmsDetail.text.x, vs.bmsDetail.text.y)
    this.bmsDetailText.geometry.dispose()
    this.bmsDetail.remove(this.bmsDetailText)
    this.bmsDetailText = new Mesh(new TextGeometry(
        `artist : ${this.manager.currentBms.bmsHeader.artist}\ngenre : ${this.manager.currentBms.bmsHeader.genre}\nlevel : ${this.manager.currentBms.bmsHeader.playLevel}\ntotal : ${this.manager.currentBms.bmsHeader.total}\nbpm : ${this.manager.currentBms.bmsHeader.startBpm}\n`,
        {
          font: commonResources.fonts[vs.bmsDetail.text.desc.font],
          size: vs.bmsDetail.text.desc.size
        }
    ), new MeshBasicMaterial(vs.bmsDetail.text.desc.material))
    this.bmsDetailText.position.set(vs.bmsDetail.text.x,
        vs.bmsDetail.text.y - 20)
    this.bmsDetailStageImage.geometry.dispose()
    this.bmsDetail.remove(this.bmsDetailStageImage)
    const bmsDetailStageImageG = new PlaneGeometry(vs.bmsDetail.stage.width,
        vs.bmsDetail.stage.height)
    const bmsDetailStageImageM = new MeshBasicMaterial({
      map: this.manager.resources.textures[`http://localhost:5002/download/bms/stage/${this.manager.currentBms.id}`]
    })
    this.bmsDetailStageImage = new Mesh(bmsDetailStageImageG,
        bmsDetailStageImageM)
    this.bmsDetail.add(this.bmsDetailTitle)
    this.bmsDetail.add(this.bmsDetailText)
    this.bmsDetail.add(this.bmsDetailStageImage)
    console.log(this.manager.currentBms)
  }

  destroy = () => {

  }
}