<template>
  <view>
    <view class="nav-box">
      <view @click="navActive =0" class="nav-item-box nav-item-active" style="margin-left:0">咨询</view>
    </view>
    <view class="content-box">
      <view v-for="(item,index) in typeList" :key="index" @click="chooseBtn(item)">
        <view :class="activeItme==item.id?'list-item list-item-active':'list-item'" >{{item.title}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "choose",
  data() {
    return {
      typeList: this.$constData.consultType,
      activeItme:1
    };
  },
  methods: {
		chooseBtn(item){
			this.activeItme = item.id 
			let cnt = {}
			this.$api.getUserInter(cnt,(res)=>{
				if(res.data.rc== this.$util.RC.SUCCESS){
					let toUser = this.$util.tryParseJson(res.data.c)
					if(toUser.userId){
						uni.setStorageSync('toUserId',String(toUser.userId))
						uni.navigateTo({
							url:'./message'
						})
					}else{
						uni.showToast({
							icon:'none',
							title:'暂无中介在线...'
						})
					}
				}else{
					uni.showToast({
						icon:'none',
						title:'暂无中介在线...'
					})
				}
			})
		}
  },
  mounted() {
	  
  }
};
</script>

<style lang="scss" scoped>
.nav-box {
  position: fixed;
  top:40rpx;
  padding: 88rpx 0 0 30rpx;
  height: 70rpx;
  width: 100%;
  background: #fff;
  z-index: 100;
}
.nav-item-box {
  margin-left: 50rpx;
  width: auto;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 50rpx;
  color: #333;
}
.content-box {
  margin-top: 240rpx;
  width: auto;
  padding: 10rpx 30rpx 30rpx 0;
}
.list-item {
  float: left;
  margin-left: 30rpx;
  margin-top: 30rpx;
  width: 330rpx;
  height: 130rpx;
  background: #f2f5f7;
  color: #869ca7;
  font-size: 34rpx;
  line-height:130rpx;
  text-align: center;
  border-radius: 4rpx;
}
.list-item-active{
    background: #00C8BE;
    color: #FFFFFF;
}
</style>