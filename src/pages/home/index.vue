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
  </div>
</template>

<script>
export default {
  data () {
    return {
      today: {},
      monthsArr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    }
  },
  created () {
    let date = new Date()
    this.today = {
      year: date.getFullYear(),
      month: this.monthsArr[date.getMonth()],
      day: date.getDate()
    }
    console.log(this.today)
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
</style>
