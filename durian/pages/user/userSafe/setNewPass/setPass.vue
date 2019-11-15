<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#587685" title="设置新密码">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
		</navBar>
		<view style="padding-top: 64px;"></view>

		<view class="auto-input auto-margin flex-box">
			<view class="left-title">密码</view>
			<input class="input-box" type="text" v-model="passData" />
		</view>

		<view class="auto-input auto-margin flex-box">
			<view class="left-title">再次输入密码</view>
			<input class="input-box" type="text" v-model="passAgin" />
		</view>

		<view class="auto-margin">
			<button class="submit-btn" @click="submitBtn">提交</button>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'setPass',
		components: {
			navBar
		},
		data() {
			return {
				tel: uni.getStorageSync('userTel'),
				code: '',
				passData: '',
				passAgin: ''
			}
		},
		methods: {
			submitBtn() {
				if (this.passData != this.passAgin) {
					uni.showToast({
						title: '两次密码不相同',
						icon: 'none'
					})
				} else if (this.passData.length < 6) {
					uni.showToast({
						title: '请至少输入6位密码',
						icon: 'none'
					})
				} else {
					let cnt = {
						phone: this.tel, // String 手机号
						pwd: this.passData, // String 密码
						code: this.code, // String 验证码
					}
					this.$api.forgetPwd(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							uni.setStorageSync('userPass', '****')
							uni.switchTab({
								url: '/pages/user/user'
							})
							uni.showToast({
								title: '设置成功！'
							})
						} else {
							uni.showToast({
								title: res.data.rm,
								icon: 'none'
							})
						}
					})
				}
			},

			navBack() {
				uni.navigateBack()
			},
			getCode() {
				this.codeTime = 60
				let cnt = {
					phone: this.tel, // String 手机号
					type: this.$constData.codeType[2].key, // String <选填> 类型
				}
				this.$api.sendSms(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.timer = setInterval(() => {
							this.codeTime--
						}, 1000)
					} else {
						this.codeTime = 0
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad(res) {
			this.code = res.code
		}
	}
</script>

<style lang="scss">
	.icon-fanhui {
		font-size: 33rpx;
		color: $group-color;
		position: absolute;
		left: 29rpx;
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
		background-color: #00C8BE;
		line-height: 100rpx;
		color: $group-color-w;
		font-size: 36rpx;
		border-radius: 6rpx;
		padding: 0;


		&:after {
			border: none;
		}
	}

	.input-box {
		text-align: right;
	}
</style>
