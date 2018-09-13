<template>
<div class="container">
  <swiper class="swiper" :current="current" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" @change="swiperChange">
    <block v-for="(img, index) in images" :key="index">
      <swiper-item>
        <img :src="img || '/static/images/home/upload-bg.png'" alt="" class="image" mode="aspectFill" />
        <div class="imgMask"></div>
        <div class="edit" v-if="images.length">
          <img src="/static/images/home/removePhoto.png" alt="" @click="removeImg">
          <img src="/static/images/home/addPhoto.png" alt="" @click="uploadImg" v-if="images.length < 3">
        </div>
      </swiper-item>
    </block>
    <block v-if="!images.length">
      <swiper-item>
        <img src="/static/images/home/upload-bg.png" class="image" @click='uploadImg' mode="aspectFill">
      </swiper-item>
    </block>
  </swiper>
  <div class="content">
    <div class="date">
      <div>
        {{dateStr}}
      </div>
      <div class="ocr">
        <img src="/static/images/home/ocr.png" alt="">
      </div>
    </div>
    <div class="title">
      <input placeholder="标题" :value="title" data-type="title" @input="getInputValue">
    </div>
    <div class="text">
      <textarea placeholder="请输入正文" :value="content" data-type="content" maxlength="-1" auto-height="true" @input="getInputValue"></textarea>
    </div>
  </div>
  <div class="save" @click="save">
    保存
  </div>
</div>
</template>

<script>
import globalStore from '../../../stores/global-store'
import lodash from 'lodash'

export default {
  data () {
    return {
      indicatorDots: true,
      indicatorColor: 'rgba(255, 255, 255, 0.5)',
      indicatorActiveColor: 'rgba(255, 255, 255, 1)',
      current: 0,
      id: '',
      date: '',
      images: [],
      title: '',
      content: '',
      mode: '',
      dateStr: ''
    }
  },
  created () {
    this.date = new Date().getTime()
    this.dateStr = new Date().toDateString()
  },
  methods: {
    getInputValue (e) {
      this[e.currentTarget.dataset.type] = e.mp.detail.value
    },
    swiperChange (e) {
      this.current = e.mp.detail.current
    },
    uploadImg () {
      if (this.images.length >= 3) return
      wx.chooseImage({
        count: 3 - this.images.length,
        success: (res) => {
          wx.showLoading({
            title: '正在上传',
            mask: true
          })
          let images = []
          for (let i = 0; i < res.tempFilePaths.length; i++) {
            let date = new Date().getTime() + i
            images[i] = {
              name: '2life/user/' + globalStore.state.user.id + '/img_' + date + '.png-2life_note.jpg',
              file: res.tempFilePaths[i]
            }
          }
          globalStore.dispatch('uploadImg', images).then(data => {
            wx.hideLoading()
            this.images = this.images.concat(lodash.map(data, 'imageURL'))
          }, err => {
            wx.hideLoading()
            console.log(err)
          })
        }
      })
    },
    removeImg () {
      let current = this.current
      this.images.splice(current, 1)
      this.current = current === 0 ? 0 : current - 1
    },
    save () {
      if (!this.title || !this.content) {
        wx.showToast({
          icon: 'none',
          title: '请输入标题或内容',
          mask: true
        })
        return
      }
      let images = typeof (this.images) === 'object' ? this.images.join() : this.images
      wx.showLoading({
        title: '正在上传',
        mask: true
      })
      globalStore.dispatch(
        'save',
        {
          note_id: this.id,
          date: this.date,
          title: this.title,
          content: this.content,
          images: images,
          mode: parseInt(this.mode),
          latitude: globalStore.state.location.user ? globalStore.state.location.user.latitude : globalStore.state.user.latitude,
          longitude: globalStore.state.location.user ? globalStore.state.location.user.longitude : globalStore.state.user.longitude,
          location: globalStore.state.location.user ? globalStore.state.location.user.location.join(', ') : '地球上的某个角落'
        }
      ).then(res => {
        globalStore.dispatch('getNoteList')
        wx.hideLoading()
        if (res.code !== 0) {
          wx.showToast({
            icon: 'none',
            title: '上传失败',
            mask: true
          })
          return
        }
        this.clearNote()
        globalStore.commit('clearNote')
        wx.navigateBack()
      })
    },
    clearNote () {
      this.current = 0
      this.id = ''
      this.date = ''
      this.title = ''
      this.content = ''
      this.images = []
      this.mode = ''
    }
  }
}
</script>

<style scoped>
.swiper {
  position: relative;
  height: 567rpx;
}

.swiper .image {
  width: 755rpx;
  height: 567rpx;
}

.swiper .imgMask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.1;
  z-index: 998;
}

.swiper .edit {
  display: flex;
  position: absolute;
  right: 43rpx;
  bottom: 43rpx;
  width: 133rpx;
  height: 45rpx;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
}

.edit > img {
  width: 45rpx;
  height: 45rpx;
}

.content {
  padding: 43rpx;
}

.content > .date {
  position: relative;
  height: 42rpx;
  line-height: 42rpx;
  font-size: 22rpx;
  color: #AAAAAA;
}

.date > .ocr {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.ocr > img {
  width: 42rpx;
  height: 42rpx;
}

.content > .title {
  padding: 80rpx 0;
  font-size: 43rpx;
  font-weight: bold;
  color: #444444;
}

.title > input {
  height: 70rpx;
}

.content > .text {
  line-height: 25rpx;
  font-size: 16px;
  color: #333333;
}

.save {
  position: fixed;
  right: 43rpx;
  bottom: 43rpx;
  width: 120rpx;
  height: 80rpx;
  border-radius: 30px;
  text-align: center;
  line-height: 80rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: #2DC3A6;
  background: white;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.16);
}
</style>
