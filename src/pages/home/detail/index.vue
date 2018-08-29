<template>
<div class="container">
  <div v-if="imgArr.lengt > 0">
    <swiper class="swiper" :indicator-dots="indicatorDots" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" @change="swiperChange" >
      <block v-for="(item, index) in imgArr"  :key="index">
        <swiper-item>
          <img :src="item" class="image" mode="aspectFill">
        </swiper-item>
      </block>
    </swiper>
  </div>
  <div class="content">
    <div class="date">
      {{date}}
    </div>
    <div class="title">
      {{note.title}}
    </div>
    <div class="text">
      {{note.content}}
    </div>
    <div class="location">
      <img src="/static/images/home/location.png" class="image">
      <div>{{note.location}}</div>
    </div>
  </div>
  <div class="mode">
    <div class="change" v-if="change">
      <img :src="item.img" v-for="(item, index) in modeArr" :key="index" @click="changeMode(item.mode)">
    </div>
    <div class="normal">
      <img :src="modeImg" v-if="!change">
    </div>
    <div class="description">
      <div v-if="change"></div>
      <div v-if="!change">
        <span>{{note.mode}}</span>
        <span>情绪值</span>
      </div>
      <div class="edit" v-if="note.user_id === user.id" @click="setChange">
        更改
      </div>
    </div>
  </div>
  <div class="like" v-if="note.user_id !== user.id">
    <img src="/static/images/home/like.png" v-if="!note.is_liked">
    <img src="/static/images/home/liked.png" v-if="note.is_liked" @click="like">
  </div>
  <div class="edit-btn" v-if="note.user_id === user.id">
    <div @click="edit">
      <img src="/static/images/home/edit.png">
      <span>修改日记</span>
    </div>
    <div @click="del">
      <img src="/static/images/home/delete.png" alt="">
      <span>删除日记</span>
    </div>
  </div>
</div>
</template>

<script>
import globalStore from '../../../stores/global-store'

export default {
  computed: {
    imgArr () {
      if (typeof (this.note.images) === 'string') {
        return this.note.images.split(',')
      } else {
        return this.note.images
      }
    },
    date () {
      let date = this.note.date || ''
      return new Date(date).toDateString()
    },
    modeImg () {
      let mode = parseInt(this.note.mode)
      if (!mode && mode !== 0) {
        return ''
      }
      if (mode >= 0 && mode < 20) {
        return this.modeArr[0].img
      } else if (mode >= 20 && mode < 40) {
        return this.modeArr[1].img
      } else if (mode >= 40 && mode < 60) {
        return this.modeArr[2].img
      } else if (mode >= 60 && mode < 80) {
        return this.modeArr[3].img
      } else if (mode >= 80 && mode <= 100) {
        return this.modeArr[4].img
      }
    },
    user () {
      return globalStore.state.user
    },
    note () {
      return globalStore.state.detailNote
    }
  },
  data () {
    return {
      indicatorDots: true,
      indicatorColor: 'rgba(255, 255, 255, 0.5)',
      indicatorActiveColor: 'rgba(255, 255, 255, 1)',
      current: 0,
      modeArr: [
        {
          img: '/static/images/home/verySad.png',
          mode: 0
        },
        {
          img: '/static/images/home/sad.png',
          mode: 25
        },
        {
          img: '/static/images/home/normal.png',
          mode: 50
        },
        {
          img: '/static/images/home/happy.png',
          mode: 75
        },
        {
          img: '/static/images/home/veryHappy.png',
          mode: 100
        }
      ],
      change: false
    }
  },
  mounted () {
  },
  methods: {
    swiperChange (e) {
      this.current = e.mp.detail.current
    },
    changeMode (mode) {
      this.change = false
    },
    setChange () {
      this.change = true
    }
    like () {

    },
    edit () {

    },
    del () {
      
    }
  }
}
</script>

<style scoped>
.swiper {
  height: 576rpx;
}

.swiper .image {
  width: 755rpx;
  height: 100%;
}

.content {
  position: relative;
  min-height: 50%;
  margin-left: 43rpx;
}

.content > .date, .content > .location {
  font-size: 22rpx;
  color: #AAAAAA;
}

.content > .title {
  padding: 80rpx 0;
  font-size: 43rpx;
  font-weight: bold;
  color: #444444;
}

.content > .text {
  text-align: justify;
  line-height: 150%;
  word-break: break-all;
  font-size: 29rpx;
  font-weight: 300;
  color: #333333;
}

.content > .location {
  display: flex;
  margin: 43rpx 0;
}

.location > .image {
  width: 21.6rpx;
  height: 27rpx;
  margin-right: 20rpx;
}

.mode {
  position: relative;
  display: flex;
  align-items: center;
  height: 128rpx;
  margin: 48rpx 48rpx 0;
  line-height: 128rpx;
  font-size: 29rpx;
}

.mode > .normal {
  display: flex;
  align-items: center;
  width: 82rpx;
  height: 132rpx;
}

.normal > img {
  width: 50rpx;
  height: 50rpx;
}

.mode > .description {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 574rpx;
  border-bottom: 1px solid #F1F1F1;
  font-size: 32rpx;
}

.description span {
  margin-right: 16rpx;
  color: #444444;
}

.description span:last-child {
  color: #AAAAAA;
}

.description > .edit {
  color: #2DC3A6;
}

.mode > .change {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 120rpx;
  bottom: 0;
  z-index: 999;
}

.change > img {
  width: 50rpx;
  height: 50rpx;
  margin-right: 30rpx;
}

.edit-btn {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 96rpx;
  line-height: 96rpx;
  background: #fafafa;
  color: #AAAAAA;
}

.edit-btn > div {
  width: 50%;
  height: 100%;
  text-align: center;
  font-size: 29rpx;
}

.edit-btn img {
  width: 25rpx;
  height: 25rpx;
  margin: 0 10rpx;
}
</style>
