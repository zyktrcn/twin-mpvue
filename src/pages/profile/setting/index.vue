<template>
  <div class="container">
    <div class="item">
      允许推荐日记
      <div class="right">
        <switch class="switch" color="#2DC3A6" :checked="recommend" @change="changeRecommend"></switch>
      </div>
    </div>
    <div class="item" v-for="(item, key) in items" :key="key">
      {{item}}
      <div class="right">
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      recommend: false,
      items: {
        feedback: '反馈',
        agreement: '隐私协议',
        thanks: '鸣谢'
      }
    }
  },
  methods: {
    changeRecommend () {
      this.recommend = !this.recommend
      wx.setStorageSync('recommend', this.recommend)
    }
  },
  // 小程序生命周期
  // onShow
  onShow () {
    wx.setNavigationBarTitle({
      title: '设置'
    })
    this.recommend = wx.getStorageSync('recommend') || false
  },
  // onHide
  onHide () {
    wx.setNavigationBarTitle({
      title: '双生'
    })
  }
}
</script>

<style scoped>
.item {
  position: relative;
  height: 128rpx;
  margin: 0 48rpx;
  border-bottom: 1px solid #F1F1F1;
  line-height: 128rpx;
  font-size: 32rpx;
  color: #444444;
}

.item:first-child {
  margin-top: 34rpx;
}

.item .right {
  position: absolute;
  display: flex;
  display: -webkit-flex;
  top: 0;
  right: 0;
  bottom: 0;
  width: 108rpx;
  justify-content: flex-end;
  align-items: center;
}

.item .right .arrow {
  width: 16rpx;
  height: 16rpx;
  border-top: 2px solid #DDDDDD;
  border-right: 2px solid #DDDDDD;
  transform: rotate(45deg);
}
</style>
