<template>
  <div class="container">
    <div class="title">
      通知
    </div>
    <div class="notification">
      <div class="item" v-for="(item, index) in list" :key="index">
        <img :src="icon + item.type + '.png'" class="icon">
        <div class="content">
          <div class="text">
            {{item.title}}
          </div>
          <div class="date">
            {{item.date}}
          </div>
        </div>
      </div>
    </div>
    <div class="nomore" v-if="list.length === 0">
      <div>
        <div>这里没有通知</div>
        <div>空空如也~</div>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from '../../stores/global-store'

export default {
  computed: {
    list () {
      return globalStore.getters.notificationList
    }
  },
  data () {
    return {
      icon: '/static/images/notification/'
    }
  },
  mounted () {
    globalStore.dispatch('getNotification')
  },
  methods: {
  }
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: flex-end;
  height: 130rpx;
  margin-left: 130rpx;
  font-size: 61rpx;
  font-weight: bold;
}

.notification {
  padding: 40rpx;
}

.notification > .item {
  display: flex;
  justify-content: space-between;
}

.item > .icon {
  display: block;
  width: 45rpx;
  height: 45rpx;
  margin: 35rpx 0;
}

.item > .content {
  width: 550rpx;
  padding: 29rpx 29rpx 29rpx 0;
  border-bottom: 1px solid #F1F1F1;
}

.content > div {
  font-size: 36rpx;
}

.content > .date {
  margin-top: 45rpx;
  font-size: 22rpx;
  color: #AAAAAA;
}

.container > .nomore {
  display: flex;
  height: 70%;
  align-items: center;
  font-size: 35rpx;
  color: #AAAAAA;
}

.nomore > div {
  width: 100%;
  text-align: center;
}
</style>
