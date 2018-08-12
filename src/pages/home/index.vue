<template>
  <div class="container">
    <div class="header">
      <div class="date">
        <div class="month">
          {{today.month}}
        </div>
        <div class="year">
          {{today.year}}
        </div>
        <div class="arrow">
          <img src="/static/images/home/arrow.png" alt="">
        </div>
      </div>
      <div class="day">
        <img src="/static/images/home/day.png" alt="">
        <div class="number">
          {{today.day}}
        </div>
      </div>
    </div>
    <div class="calendar">

    </div>
    <div class="exhibition">
      <div class="weather item" v-if="!modeChange" @click="changeMode">
        <div class="user" v-if="!userChange">
          <div class="icon">
            <img src="/static/images/home/sunny.png" alt="">
          </div>
          <div class="number">
            <div>19℃</div>
            <div>晴</div>
          </div>
        </div>
        <div class="partner" v-if="userChange">
          <div class="icon">
            <img src="/static/images/home/sunny.png" alt="">
          </div>
          <div class="number">
            <div>29℃</div>
            <div>晴</div>
          </div>
        </div>
      </div>
      <div class="mode item" v-if="modeChange" @click="changeMode">
        <div class="user" v-if="!userChange">
          <div class="icon">
            <img src="/static/images/home/normal_grey.png" alt="">
          </div>
          <div class="number">
            <div>78</div>
            <div>情绪值</div>
          </div>
        </div>
        <div class="partner" v-if="userChange">
          <div class="icon">
            <img src="/static/images/home/normal_grey.png" alt="">
          </div>
          <div class="number">
            <div>88</div>
            <div>情绪值</div>
          </div>
        </div>
      </div>
      <div class="change"  @click="changeUser">
        <img src="/static/images/home/exchange.png" :class="changeAnimation ? 'changeAnimation' : ''" alt="" v-if="!userChange">
        <img src="/static/images/home/exchange_male.png" :class="changeAnimation ? 'changeAnimation' : ''" alt="" v-if="userChange">
        <img src="/static/images/home/exchange_female.png" alt="" v-if="false">
      </div>
    </div>
    <div class="notes">
      <div class="item">
        <div class="date">
          <div>12</div>
          <div>周日</div>
        </div>
        <div class="note">
          <div class="info">
            <div>
              <div class="title">
                邓国雄是大傻逼
              </div>
              <div class="content">
                猴哥猴哥你真了不得
              </div>
            </div>
            <img src="" alt="" v-if="false">
          </div>
          <div class="addition">
            <div class="time">
              15:00
            </div>
            <div class="location">
              <img src="/static/images/home/location.png" alt="">
              <div>广州市, 广东省, 中国</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      today: {},
      monthsArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      userChange: false,
      modeChange: false,
      changeAnimation: false
    }
  },
  created () {
    this.getToday()
  },
  methods: {
    getToday () {
      let date = new Date()
      this.today = {
        year: date.getFullYear(),
        month: this.monthsArr[date.getMonth()],
        day: date.getDate()
      }
    },
    changeMode () {
      this.modeChange = !this.modeChange
    },
    changeUser () {
      this.changeAnimation = !this.changeAnimation
      setTimeout(() => {
        this.userChange = !this.userChange
      }, 1000)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  height: 130rpx;
  justify-content: space-between;
  align-items: flex-end;
}

.header > .date {
  display: flex;
  height: 78rpx;
  margin-left: 20%;
  line-height: 78rpx;
  font-size: 61rpx;
  font-weight: bold;
  align-items: center;
}

.date > .month {
  color:  #444444;
}

.date > .year {
  color: #AAAAAA;
}

.date > .arrow {
  width: 40rpx;
  height: 40rpx;
  margin: 0 20rpx;
}

.date > .arrow > img {
  display: block;
  width: 100%;
  height: 100%;
}

.header > .day {
  position: relative;
  width: 100rpx;
  height: 78rpx;
  margin-right: 48rpx;
}

.day > img {
  display: block;
  width: 45rpx;
  height: 45rpx;
  margin: 15rpx auto;
}

.day > .number {
  display: flex;
  position: absolute;
  top: 8rpx;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  font-size: 18rpx;
  font-weight: bold;
  justify-content: center;
  align-items: center;
}

.exhibition {
  display: flex;
  height: 146rpx;
  margin: 0 48rpx;
  justify-content: space-between;
  align-items: center;
}

.exhibition > .item {
  width: 80%;
}

.exhibition > .item > .user, .exhibition > .item > .partner {
  display: flex;
}

.item .icon {
  width: 20%;
}

.icon > img {
  width: 45rpx;
  height: 45rpx;
}

.item .number {
  display: flex;
  align-items: center;
}

.item .number > div {
  margin-right: 5rpx;
  font-size: 25rpx;
  font-weight: bold;
  color: #AAAAAA;
}

.exhibition > .change > img {
  width: 50rpx;
  height: 50rpx;
  transition: all 1s;
}

.exhibition > .change > .changeAnimation {
  transform: rotate(180deg);
}

.notes {
  margin: 0 43rpx;
}

.notes > .item {
  display: flex;
  padding: 0 0 29rpx;
  justify-content: space-between;
}

.item > .date {
  padding-top: 43rpx;
  font-size: 25rpx;
  font-weight: bold;
  color: #AAAAAA;
}

.item > .note {
  width: 85%;
  border-top: 1px solid #F1F1F1;
  padding-top: 43rpx;
  color: #AAAAAA;
}

.note > .info {
  display: flex;
  justify-content: space-between;;
  word-break: break-all;
  overflow: hidden;
}

.info .title {
  height: 60rpx;
  font-size: 36rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #444444;
}

.info .male {
  color: #7cbeff;
}

.info .female {
  color: #4590F8;
}

.info .content {
  height: 28px;
  margin-top: 15rpx;
  line-height: 14px;
  font-size: 12px;
  font-weight: 300;
  overflow: hidden;
}

.info > .max-len {
  width: 400rpx;
}

.info > img {
  width: 13rpx;
  height: 130rpx;
  margin-left: 29rpx;
  border-radius: 18rpx;
}

.note > .addition {
  display: flex;
  margin-top: 43rpx;
  font-size: 21rpx;
  justify-content: space-between;
}

.addition > .location {
  display: flex;
}

.location > img {
  width: 21.6rpx;
  height: 27rpx;
  margin: 0 20rpx;
}
</style>
