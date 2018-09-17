<template>
  <div class="container">
    <div class="hasLogin" v-if="hasLogin">
      <div class="title">
        关于我
      </div>
      <div class="profile">
        <div class="info">
          <div class="intro">
            <div class="name">
              {{user.name}}
            </div>
            <div class="edit">
              查看资料
            </div>
          </div>
          <img :src="user.face" class="avatar" mode="aspectFill" />
        </div>
        <div class="msg">
          <div class="part">
            <img :src="domain + smile + icon[user.sex] + '.png'" />
            <span class="count">{{user.mode}}</span>
            <span>平局情绪值</span>
          </div>
          <div class="part">
            <img :src="domain + book + icon[user.sex] + '.png'" />
            <span class="count">{{user.total_notes}}</span>
            <span>日记数量</span>
          </div>
        </div>
      </div>
      <div class="profile" v-if="user.user_other_id !== -1">
        <div class="info matched">
          <div class="intro">
            <div class="name">
              {{partner.name}}
            </div>
            <div class="edit">
              <img src="/static/images/profile/matched.png" />
              <span>你的匹配对象</span>
            </div>
          </div>
          <img :src="partner.face" class="avatar" mode="aspectFill" />
        </div>
        <div class="msg">
          <div class="part">
            <img :src="domain + smile + icon[partner.sex] + '.png'" />
            <span class="count">{{partner.mode}}</span>
            <span>平均情绪值</span>
          </div>
          <div class="part">
            <img :src="domain + book + icon[partner.sex] + '.png'" />
            <span class="count">{{partner.total_notes}}</span>
            <span>日记数量</span>
          </div>
        </div>
      </div>
      <div class="profile">
        <div class="item" v-for="(item, key) in items" :key="key" :class="key" @click="goTo(key)">
          <img :src="domain + key + '.png'" />
          <div class="text">
            {{item}}
          </div>
          <div class="right">
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="noLogin" :class="showAgreement ? 'filter' : ''" v-if="!hasLogin">
      <div class="title">
        未登录
      </div>
      <div class="tips">
        登录后可享受情绪管理、匹配日记对象等更多好玩功能！赶紧登录吧！
      </div>
      <div class="login">
        现在登录
      </div>
      <div class="mask" v-if="showAgreement && !hasLogin"></div>
      <div class="agreement" v-if="showAgreement && !hasLogin">
        <div class="content">
        </div>
        <div class="agree">
          <button open-type="getUserInfo">同意该隐私条款</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store'

export default {
  computed: {
    user () {
      return globalStore.state.user
    },
    partner () {
      return globalStore.state.partner
    }
  },
  data () {
    return {
      hasLogin: true,
      domain: '/static/images/profile/',
      smile: 'smile_',
      book: 'book_',
      icon: ['female', 'male'],
      items: {
        chart: '情绪管理',
        match: '匹配',
        analysis: '人格测试',
        setting: '设置'
      }
    }
  },
  created () {},
  methods: {
    goTo (key) {
      globalStore.commit('navigateTo', key)
    }
  },
  // 小程序生命周期 onShow
  onShow () {
    globalStore.dispatch('getUserInfo')
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.title {
  display: flex;
  display: -webkit-flex;
  height: 130rpx;
  margin-left: 130rpx;
  align-items: flex-end;
  font-size: 61rpx;
  font-weight: bold;
}

.profile {
  padding: 43rpx 43rpx 0 43rpx;
}

.profile img {
  margin: 0;
}

.profile .info {
  display: flex;
  display: -webkit-flex;
  position: relative;
  margin-left: 87rpx;
  justify-content: space-between;
}

.info .name {
  display: flex;
  display: -webkit-flex;
  font-size: 43rpx;
}

.info .edit {
  font-size: 22rpx;
  color: #AAAAAA;
}

.info .avatar {
  width: 86rpx;
  height: 86rpx;
  border-radius: 50%;
}

.info .gender {
  position: absolute;
  right: 10rpx;
  bottom: 0;
  width: 27rpx;
  height: 27rpx;
}

.profile .msg {
  margin: 25rpx 0;
}

.msg .part {
  display: flex;
  display: -webkit-flex;
  height: 79.2rpx;
  justify-content: flex-start;
  align-items: center;
}

.msg .part img {
  width: 45rpx;
  height: 45rpx;
  margin-right: 30rpx;
}

.msg .part .count {
  width: 30rpx;
  margin-right: 15rpx;
  font-weight: bold;
}

.msg .part span {
  margin: 0 10rpx;
  font-size: 32rpx;
}

.msg .part span:last-child {
  color: #AAAAAA;
}

.profile .item {
  position: relative;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}

.profile .item img {
  width: 45rpx;
  height: 45rpx;
  padding: 43rpx 0;
}

.profile .item .text {
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(228, 228, 228, 0.5);
  width: 88%;
}

.profile .item .text .name {
  height: 122rpx;
  line-height: 122rpx;
  font-size: 36rpx;
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

.match .text .description {
  padding: 29rpx 0;
  font-size: 22rpx;
  color: #AAAAAA;
}

.profile .sync {
  display: flex;
  display: -webkit-flex;
  height: 115rpx;
  justify-content: space-between;
  align-items: center;
}

.sync .image {
  width: 45rpx;
  height: 28.5rpx;
}

.sync .text {
  display: flex;
  display: -webkit-flex;
  width: 88%;
  height: 100%;
  border-bottom: 1px solid rgba(228, 228, 228, 0.5);
  justify-content: space-between;
  align-items: center;
}

.sync .text .name {
  font-size: 36rpx;
}

.sync .text .time {
  font-size: 29rpx;
  color: #AAAAAA;
}

.profile .matched {
  padding-top: 43rpx;
  border-top: 1px solid rgba(228, 228, 228, 0.5);
}

.profile .matched .intro .edit {
  color: #F83AC1;
}

.profile .matched .intro .edit img {
  width: 36rpx;
  height: 18rpx;
  margin-right: 15rpx;
}

.nld {
  position: relative;
  width: 100%;
  height: 100%;
}

.tips {
  margin: 43rpx 30rpx 0 130rpx;
  line-height: 150%;
  font-size: 32rpx;
  color: #AAAAAA;
}

.login {
  position: absolute;
  right: 43rpx;
  bottom: 72rpx;
  width: 202rpx;
  height: 86rpx;
  text-align: center;
  line-height: 86rpx;
  border-radius: 30px;
  font-size: 36rpx;
  background: #2DC3A6;
  color: white;
}

.filter {
  -webkit-filter: blur(1px);
}

.nld .mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.56);
}

.agreement {
  position: absolute;
  top: 130rpx;
  left: 60rpx;
  right: 60rpx;
  height: 844rpx;
  border-radius: 10rpx;
  background: white;
  z-index: 999;
}

.agreement .content {
  height: 748rpx;
  overflow-y: scroll;
}

.agreement .content::-webkit-scrollbar {
  display: none;
}

.agreement .agree, .agreement .agree button {
  height: 100rpx;
  border: 0;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
  text-align: center;
  line-height: 100rpx;
  font-size: 36rpx;
  background: #2DC3A6;
  color: white;
}
</style>
