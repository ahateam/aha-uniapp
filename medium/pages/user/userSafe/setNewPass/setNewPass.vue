<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">设置新密码</view>
		</nav-bar>

		<view v-for="(item,index) in passArr" :key="index">
			<view class="auto-input auto-margin flex-box">
				<view class="left-title">
					{{item.name}}
				</view>
				<input type="text" v-model="item.value" :placeholder="item.text" password placeholder-style="text-align: right;"
				 :focus="index == 0" />
			</view>
		</view>
		<view class="auto-margin">
			<button class="submit-btn" @click="changePass">提交</button>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'setNewPass',
		components: {
			navBar
		},
		data() {
			return {
				passArr: [{
						name: '旧密码',
						text: '',
						value: ''
					},
					{
						name: '新密码',
						text: '密码不少于六位',
						value: ''
					},
					{
						name: '确认密码',
						text: '请再次输入密码',
						value: ''
					}
				]
			}
		},
		methods: {


			changePass() {
				if (this.passArr[1].value == '' || this.passArr[2].value == '') {
					uni.showToast({
						title: '请输入密码'
					})
				} else if (this.passArr[1].value.length < 6) {
					uni.showToast({
						title: '请至少输入六位密码',
						icon: 'none'
					})
				} else if (this.passArr[1].value != this.passArr[2].value) {
					uni.showToast({
						title: '两次密码不相同'
					})
				} else {
					let cnt = {
						userId: uni.getStorageSync('userId'), // Long 用户编号
						pwd: this.passArr[1].value, // String 密码
						oldPwd: this.passArr[0].value, // String 原密码
					}
					this.setPwd(cnt)
				}
			},

			navBack() {
				uni.navigateBack()
			},

			setPwd(cnt) {
				this.$api.setPwd(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.switchTab({
							url: '/pages/user/user'
						})
						uni.showToast({
							title: '修改密码成功'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},
		},
		onLoad() {

		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.auto-margin {
		margin: 56rpx 40rpx;
	}

	.auto-input {
		height: 102rpx;
		box-sizing: border-box;
		padding: 30rpx;
		border: 1rpx solid $group-color-border;
		border-radius: 6rpx;
		font-size: $group-font-befor;
	}

	.flex-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.left-title {
		color: #666666;
	}

	.submit-btn {
		width: 670rpx;
		background-color: #182F45;
		line-height: 100rpx;
		color: $group-color-w;
		font-size: 36rpx;
		border-radius: 6rpx;
		padding: 0;


		&:after {
			border: none;
		}
	}
</style>
