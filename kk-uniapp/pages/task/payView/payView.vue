<template>
	<view>
		<view class="showMoney">
			￥{{money}}元
		</view>
		<view class="bottonBox">
			<button class="payBtn" type="primary" @click="payMoney">支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'5',
			}
		},
		methods:{
			payMoney(){
				uni.switchTab({
				    url: '/pages/task/task'
				});
				uni.showToast({
					title:'支付成功',
					duration:1000
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.showMoney{
	width: 100vw;
	height: 56.25vw;
	text-align: center;
	font-size: $list-title-l;
	line-height: 56.25vw;
	background-color: #f0f0f0;
}

.bottonBox{
	margin-top: $box-margin-top;
	text-align: center;
}

.payBtn{
	width: 50vw;
}
</style>
