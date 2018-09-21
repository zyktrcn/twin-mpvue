<template>
  <div class="container">
    <div class="team">
      <div class="title">
        心理学和美术团队
      </div>
      <div class="item" v-for="(item, index) in team1" :key="index">
        <img :src="item.avatar" />
        <div class="content">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="des">
            {{ item.des }}
          </div>
        </div>
      </div>
    </div>
    <div class="team">
      <div class="title">
        资料库整理团队
      </div>
      <div class="description">
        以下排名不分先后
      </div>
      <div class="part">
        <div v-for="(item, index) in team2" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      team1: [
        {
          avatar: 'https://airing.ursb.me/2life/user/160/img_1533133620303.png-2life_note.jpg',
          name: '张锦涛',
          des: '心理学研究指导'
        },
        {
          avatar: 'https://airing.ursb.me/2life/user/160/img_1533133769799.png-2life_note.jpg',
          name: '林诗宁',
          des: '心理学研究助理'
        },
        {
          avatar: 'https://airing.ursb.me/2life/user/160/img_1533133800043.png-2life_note.jpg',
          name: '唐肆',
          des: '插画设计'
        },
        {
          avatar: 'https://airing.ursb.me/2life/user/160/img_1533133820816.png-2life_note.jpg',
          name: '兽爷',
          des: 'Logo 设计'
        }
      ],
      team2: ['CT', 'HHH', 'Noblevil', 'Ree', 'Sunki', '丁林', '杜肯坑', '二胡', '范宏䣭', '卡比兽', '卡比兽', '梁锐成', '刘盼盼', '林少燕', '马戈', '王子昂', '吴匡伦', '叶婉颖', '叶婉颖', '卓奇林', '朱国润']
    }
  },
  created () {},
  methods: {},
  // 小程序生命周期
  // onShow
  onShow () {
    wx.setNavigationBarTitle({
      title: '鸣谢'
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
.team {
  margin: 48rpx 48rpx 0;
}

.team .title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333333;
}

.team .item {
  display: flex;
  display: -webkit-flex;
  padding: 32rpx 0;
  border-bottom: 1px solid #F1F1F1;
  align-items: center;
}

.item:first-child {
  margin-top: 16rpx;
}

.item img {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
}

.item .content {
  margin-left: 64rpx;
}

.cotnent .name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333333;
}

.content .des {
  font-size: 28rpx;
  color: #666666;
}

.team .description {
  margin-top: 12rpx;
  font-size: 28rpx;
  color: #AAAAAA;
}

.team .part {
  margin-top: 32rpx;
  padding-bottom: 40rpx;
  font-size: 32rpx;
  color: #333333;
}

.part div {
  display: inline-block;
  width: 25%;
  padding: 16rpx 0;
  text-align: center;
}
</style>
