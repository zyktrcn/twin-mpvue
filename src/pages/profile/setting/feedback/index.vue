<template>
  <div class="container">
    <div class="section">
      <div class="option" :class="choose === item.code ? 'sel' : ''" v-for="(item, index) in options" :key="index" @click="getOption(item.code)">
        {{ item.title }}
      </div>
    </div>
    <textarea class="content" placeholder="写下你想告诉我们的吧~" v-model="content"></textarea>
    <button class="confirm" @click="confirm">提交反馈</button>
  </div>
</template>

<script>
import globalStore from '../../../../stores/global-store'

export default {
  data () {
    return {
      options: [
        {
          title: 'Bug反馈',
          code: 103
        },
        {
          title: '功能需求',
          code: 200
        },
        {
          title: '吐槽',
          code: 300
        }
      ],
      choose: 103,
      content: ''
    }
  },
  created () {},
  methods: {
    getOption (code) {
      this.choose = code
    },
    confirm () {
      if (!this.content) return
      wx.showLoading({
        title: '正在提交'
      })
      globalStore.dispatch(
        'feedback',
        {
          title: this.content.slice(0, 19),
          content: this.content,
          type: parseInt(this.choose)
        }
      ).then(res => {
        wx.hideLoading()
        wx.showToast({
          title: '提交成功'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000)
      })
    }
  },
  // 小程序zhoq
  // onShow
  onShow () {
    wx.setNavigationBarTitle({
      title: '反馈'
    })
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

.section {
  padding: 43rpx;
}

.section .option {
  display: inline-block;
  margin-top: 29rpx;
  margin-right: 43rpx;
  padding: 8rpx 22rpx;
  border-radius: 5px;
  border: 1px solid #2DC3A6;
  font-size: 29rpx;
  color: #2DC3A6;
}

.section .sel {
  border: 1px solid #2DC3A6;
  background: #2DC3A6;
  color: white;
}

.content {
  width: auto;
  margin: 29rpx 43rpx;
  padding: 29rpx;
  border: 1px solid #2DC3A6;
  border-radius: 5px;
  font-size: 29rpx;
}

.confirm {
  position: absolute;
  right: 43rpx;
  bottom: 72rpx;
  width: 202rpx;
  height: 84rpx;
  text-align: center;
  line-height: 84rpx;
  border-radius: 30px;
  font-size: 32rpx;
  background: #2DC3A6;
  color: white;
}
</style>
