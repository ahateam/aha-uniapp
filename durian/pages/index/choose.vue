<template>
  <div>
    <div class="nav-box">
      <div @click="navActive =0" class="nav-item-box nav-item-active" style="margin-left:0">咨询</div>
    </div>
    <div class="content-box">
      <div v-for="(item,index) in typeList" :key="index" @click="chooseBtn(item)">
        <div :class="activeItme==item.id?'list-item list-item-active':'list-item'" >{{item.title}}</div>
      </div>
    </div>
  </div>
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
					console.log(res.data.c)
					console.log(JSON.parse(res.data.c))
					let toUser = this.$util.tryParseJson(res.data.c)
					if(toUser.userId){
						uni.setStorageSync('toUserId',String(toUser.userId))
						uni.setStorageSync('toUserInfo',res.data.c)
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
  mounted() {}
};
</script>

<style lang="scss" scoped>
.nav-box {
  position: fixed;
  top:40rpx;
  padding: 44px 0 0 15px;
  height: 35px;
  width: 100%;
  background: #fff;
  z-index: 100;
}
.nav-item-box {
  margin-left: 25px;
  width: auto;
  height: 35px;
  line-height: 35px;
  font-size: 25px;
  color: #333;
}
.content-box {
  margin-top: 120px;
  width: auto;
  padding: 5px 15px 15px 0;
}
.list-item {
  float: left;
  margin-left: 15px;
  margin-top: 15px;
  width: 165px;
  height: 65px;
  background: #f2f5f7;
  color: #869ca7;
  font-size: 17px;
  line-height: 65px;
  text-align: center;
  border-radius: 2px;
}
.list-item-active{
    background: #00C8BE;
    color: #FFFFFF;
}
</style>