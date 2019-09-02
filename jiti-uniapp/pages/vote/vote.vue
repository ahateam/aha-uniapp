<template>
	<view>
		<view class="maincon">
			<button class="create-vote" @click="toCreateChoose">我要发起投票</button>
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
			toCreateChoose(){
				uni.navigateTo({
					url:"createVoteChoose"
				})
			}
		}
	}
</script>

<style>
	.create-vote{
		background-color: #40C9C6;
		height: 100rpx;
		color: #FFFFFF;
		line-height: 100rpx;
	}
</style>
