<template>
	<view class="content flex-box-user">
		<view class="user-box flex-box-user">
			<image :src="userInfo.userHead" mode="aspectFill"></image>
			<view>{{userInfo.userName}}</view>
		</view>
		<button class="fllow-btn" @click="fllow">+ 关注</button>
	</view>
</template>

<script>
	export default {
		props: {
			userInfo: {
				type: Object
			}
		},
		data() {
			return {

			};
		},
		methods: {
			fllow() {
				uni.setClipboardData({
					data: this.userInfo.userNumber,
					success: () => {
						this.$emit('click')
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	button {
		cursor: pointer;
	}
	
	.flex-box-user {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.content {
		flex-direction: row;
		padding: 5px 10px 5px 15px;
		width: 100%;
		box-sizing: border-box;
	}

	.user-box {
		flex-direction: row;
		color: #333333;
		font-size: 18px;

		image {
			width: 31px;
			height: 31px;
			border-radius: 50%;
			margin-right: 8px;
		}
	}

	.fllow-btn {
		font-size: 18px;
		line-height: 35px;
		border-radius: 33px;
		background-color: #00d48c;
		margin: 0;
		color: #FFF;
		padding: 0 12px;

		&:after {
			border: none;
		}
	}
</style>
