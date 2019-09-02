<template>
	<view>
		<view class="maincon choose-box">
			
			<view class="choose-item" v-for="(item,index) in orgList" :key="index" >
				<view class="title">{{item.name}}</view>
				<view class="line"></view>
				<view class="org-address"> {{item.address}} </view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offset:0,
				count:10,
				page:1,
				orgList:[],
				pageOver:false,
			}
		},
		methods: {
			getUserORGs(cnt){
				 this.$api.getUserORGs(cnt,(res)=>{
                  let data = []
                  if(res.data.rc == this.$util.RC.SUCCESS){
                      data = this.$util.tryParseJson(res.data.c)
                  }else{
                      data = []
                  }
                  this.orgList = this.orgList.concat(data)
                  if(data.length <this.count){
                      this.pageOver = true
                  }else{
					  this.pageOver = false
				  }
				  console.log('---------------')
				  console.log(this.orgList)
              })
			  
			}
		},
		onLoad() {
			console.log(uni.getStorageSync('userInfo'))
			
			let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			let cnt = {
				offset:this.offset,
                count:this.count,
                userId: userInfo.id,
                level:4
			}
			  this.getUserORGs(cnt)
			
		},
		// onReachBottom(){
		// 	console.log(this.orgList)
		// }
	}
</script>

<style>
	.choose-item{
		width: 660rpx;
		height: 200rpx;
		background-color: #0A98D5;
		border-radius: 20rpx;
	}
	.choose-item view{
		margin: 20rpx;
		color: #FFFFFF;
	}
	.title{
		padding-top: 40rpx;
		font-size: 32rpx;
	}
	.line{
		width: 60rpx;
		height: 8rpx;
		background-color: #FFFFFF;
	}
	.org-address{
		font-size: 24rpx;
	}
</style>
