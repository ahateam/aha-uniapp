<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">设置新密码</view>
		</nav-bar>

		<view class="top-text">为保证账户安全，需要验证已绑定手机</view>


		<view class="auto-input auto-margin flex-box">
			<view class="left-title">手机号</view>
			<view class="tell-text">{{phone}}</view>
		</view>

		<view class="auto-input auto-margin flex-box">
			<view class="left-title">验证码</view>
			<!-- <view class="tell-text"></view> -->
			<input class="left-title code-input input-right" type="text" v-model="code" maxlength="6" />
		</view>

		<view class="code-btn" v-if="codeTime < 1" @click="getCode">获取验证码</view>
		<view class="code-time" v-else>{{codeTime}}s后重新发送</view>

		<view class="auto-margin">
			<button class="submit-btn" @click="submitBtn">提交</button>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		name: 'noPass',
		components: {
			navBar
		},
		watch: {
			codeTime(newValue, oldValue) {
				if (newValue == 0) {
					clearInterval(this.timer)
				}
			}
		},
		data() {
			return {
				phone: '',
				tel: '',
				code: '',
				codeTime: 0,
				timer: ''
			}
		},
		methods: {
			submitBtn() {
				if (this.code.length < 4) {
					uni.showToast({
						title: '请输入正确验证码',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: `./setPass?code=${this.code}`
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
		onLoad() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			let tel = userInfo.phone
			if (tel.length == 13) {
				this.phone = tel.substr(2, tel.length - 9) + '****' + tel.substr(tel.length - 3)
			} else {
				this.phone = tel.substr(2, tel.length - 10) + '****' + tel.substr(tel.length - 3)
			}
			this.tel = tel
		}
	}
</script>

<style lang="scss">
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

	.top-text {
		margin: 50rpx 51rpx 50rpx 155rpx;
		color: #999999;
		font-size: 28rpx;
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

	.code-btn {
		text-align: center;
		margin: 60rpx 0 100rpx;
		color: #24D4D0;
		font-size: 30rpx;



		&:after {
			border: none;
		}
	}

	.code-input {
		font-size: $group-font-befor;
	}

	.input-right {
		flex: 1;
		text-align: right;
		margin-left: 30rpx;
	}

	.code-time {
		margin: 60rpx 281rpx 100rpx;
		width: 244rpx;
		line-height: 42rpx;
		border-radius: 6rpx;
		color: $group-color-befor;

		&:after {
			border: none;
		}
	}

	.tell-text {
		color: $group-color-befor;
		font-size: 30rpx;
	}
</style>
