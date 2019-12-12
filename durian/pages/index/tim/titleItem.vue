<template>
  <div>
    <div class="nav-box">
      <div class="back-btn" @click="backBtn()">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="title-box">{{name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "titleItem",
  props:{
	  name:String
  },
  methods:{
      backBtn(){
		 
		
		  console.log('1111111111111111')
      }
  }
};
</script>

<style lang="scss" scoped>
.nav-box {
  width: 100%;
  height: 88rpx;
  background: #fff;
}
.back-btn {
  float: left;
  width: 50rpx;
  height: 50rpx;
  padding: 19rpx 20rpx;
}
.back-btn i {
  width: 50rpx;
  height: 50rpx;
  font-size: 32rpx;
  line-height: 50rpx;
  text-align: center;
  color: #587685;
}
.title-box {
  float: left;
  width: 560rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  font-size: 36rpx;
  color: #333333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>