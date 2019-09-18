<template>
	<view>
		<view class="org-box">
			<view class="org-base" @click="toOrgInfo">组织基础信息</view>
			<view class="org-base org-assets" @click="toOrgMoney">组织资产信息</view>
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
			toOrgInfo() {
				uni.navigateTo({
					url: "./orgInfo",

				})
			},
			toOrgMoney() {
				uni.navigateTo({
					url: "./orgMoney"
				})
			},
			toHomePage() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.org-box {
		width: 90%;
		margin: 50rpx auto 100rpx;
	}

	.org-base {
		width: 100%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
		color: #fff;
		font-size: 36rpx;
		background-color: $jiti-color-blue;
		border-radius: 20rpx;
	}

	.org-assets {
		background-color: $jiti-color-purple;
		margin-top: 40rpx;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
