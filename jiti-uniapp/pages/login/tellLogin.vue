<template>
	<view>
		<view class="main-box">
			<view class="title-box">
				<span style="color: #f60;">{{tell}}</span> <span style="margin-left: 30rpx;">选择登录账号</span>
			</view>
			<view v-if="list.length>0">
				<view class="list" v-for="(item,index) in list" :key="index" @click="pwdBtn(item)">
					<view class="list-title">
						{{item.realName.substr(0,item.realName.length-1)}}*
					</view>
					<view class="list-card">
						{{item.idNumber.substr(0,item.idNumber.length-6)}}******
					</view>
				</view>
			</view>
			<view v-else class="text">
				该手机号没有绑定任何账号...
			</view>

		</view>
		<view class="footer-box">
			<button type="default" @click="toBack()">
				返回登录
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tellLogin',
		data() {
			return {
				list: [],
				tell: ''
			}
		},
		methods: {
			toBack(){
				uni.navigateBack()
			},
			pwdBtn(item){
				console.log(item)
				uni.navigateTo({
					url:'./tellPwd?id='+item.id
				})
			}
		},
		onLoad(option) {
			this.tell = option.tell

			let cnt = {
				mobile: option.tell, // String 手机号
				count: 40, // Integer
				offset: 0, // Integer
			};

			this.$api.getUsersByMobile(cnt, (res) => {
				this.list = this.$util.tryParseJson(res.data.c)
				console.log(this.list)
			})
		}
	}
</script>

<style scoped lang="scss">
	.title-box {
		width: auto;
		padding: 20rpx;
		color: #fff;
		font-size: 28rpx;
		background: $jiti-color-blue;
	}

	.list {
		padding: 20rpx;
		border-bottom: 1px solid #eee;
		margin-top: 20rpx;
	}

	.list-title {
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 34rpx;
		color: #666;

	}

	.list-card {
		width: auto;
		height: 50rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #666;
	}
	.text{
		width:auto;
		height: 60rpx;
		font-size:32rpx;
		color:#f60;
		line-height: 60rpx;
		padding: 40rpx;
	}
	.footer-box {
		width: auto;
		padding: 40rpx;
	
	}
</style>
