<template>
	<view>
		<view class="main-box">
			<view class="box" @click="addBtn(1)">
				<view class="box-img">
					<view class="img-title">
						<i class="iconfont icon-paimingbiaoqian"></i>
					</view>
				</view>
				<view class="box-text">
					<view class="text-title">
						普通投票表决
					</view>
					<view class="text">
						创建普通投票表决事件入口
					</view>
				</view>
			</view>

			<view class="box1" @click="addBtn(0)">
				<view class="box-img">
					<view class="img-title">
						<i class="iconfont icon-user-list"></i>
					</view>
				</view>
				<view class="box-text">
					<view class="text-title">
						选举表决事件
					</view>
					<view class="text">
						创建选举表决事件的入口
					</view>
				</view>
			</view>
		</view>
		<view class="footer-box">
			<button type="default" @click="toHomePage()">
				返回首页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			addBtn(key) {
				uni.navigateTo({
					url: './createVoteInfo?key='+key
				});
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		},
		onShow(){
			uni.setStorageSync('vote','')
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 88%;
		height: 160rpx;
		padding: 30rpx 0; 
		margin: 0 auto;
		margin-top:60rpx;
		border-radius: 25rpx;
		background: $jiti-color-blue;
	}

	.box1 {
		width: 88%;
		height: 160rpx;
		padding: 30rpx 0; 
		margin: 0 auto;
		margin-top: 60rpx;
		border-radius: 25rpx;
		background: $jiti-color-purple;
	}

	.box-img {
		float: left;
		margin-left: 20rpx;
		width: 160rpx;
		height: 160rpx;

	}

	.box-text {
		width: auto;
		height: 160rpx;
		margin-left: 200rpx;

	}

	.img-title {
		width: 120rpx;
		height: 120rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.img-title i {
		font-size: 100rpx;
		text-align: center;
		line-height: 120rpx;
		color: #fff;
	}

	.text-title {
		width: auto;
		height: 80rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		color: #fff;
		font-weight: 600;
		text-align: left;
		padding-right: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text {
		width: auto;
		height: 80rpx;
		text-align: left;
		padding-right: 20rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #fff;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;

	}

	.btn {
		width: 100%;
		height: 80rpx;
		margin-top: 40rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.create-btn {
		width: 90%;
		height: 60rpx;
		margin: 0 auto;
		margin-top: 60rpx;
		border-radius: 25px;
		background: rgb(125, 177, 253);
		text-align: center;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #fff;
	}



	.vote-title {
		width: 100%;
		height: 60rpx;
		border-left: 4px solid #63a35c;
		padding-left: 20rpx;
		font-size: 28rpx;
		color: #666;
		font-weight: 600;
		line-height: 60rpx;
	}

	.vote-item {
		width: 80%;
		margin: 20rpx auto;
		height: 80rpx;
		border-radius: 5px;
		border: 1px solid #ddd;
		padding: 0px 15px;
		margin-top: 40rpx;
	}

	.item-title {
		float: left;
		width: 80%;
		height: 80rpx;
		line-height: 80px;
		padding-left: 20rpx;
		font-size: 28rpx;
		color: #444;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.vote-btn {
		float: left;
		width: auto;
		height: 80px;
		line-height: 80rpx;
		text-align: center;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;
	}
</style>
