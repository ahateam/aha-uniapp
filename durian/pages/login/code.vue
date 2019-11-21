<template>
	<view>
		<view class="box">
			<image class="bg-img" src="/static/image/login/codeBG.png" mode="aspectFill"></image>
			<view class="content-box">
				<view class="title-box">
					输入验证码
				</view>
				<view class="title-tell">
					<view class="code-text">
						已发送4位验证码至
					</view>
					<view class="tell-text">
						+{{tell}}
					</view>
				</view>
				<view class="code-box">
					<valid-code :maxlength="4" :isPwd="false" @finish="finish"></valid-code>
				</view>
				<view class="code-btn" @click="submitBtn">
					确定
				</view>
				<view class="send-btn-num" v-if="num>0">
					重发验证码({{num}}s)
				</view>

				<view class="send-btn" v-else @click="sendBtn">
					重发验证码
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import ValidCode from '../../components/code/ValidCode.vue'

	export default {
		name: 'code',
		data() {
			return {
				boxBg: "",
				code: '',
				tell: '',
				moblie: '',
				num: 60,
				timer: ''
			}
		},
		components: {
			ValidCode
		},
		watch: {
			num(newValue, oldValue) {
				if (newValue == 0) {
					clearInterval(this.timer)
				}
			}
		},
		methods: {
			sendSms(cnt) {
				this.$api.sendSms(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.showToast({
							title: '验证码已发送'
						})
						this.timer = setInterval(() => {
							this.num--
						}, 1000)
					} else {
						this.num = 0
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},
			submitBtn() {
				let cnt = {
					phone: this.moblie, // String 手机号
					code: this.code, // String 验证码
				}
				this.$api.loginByCode(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let userInfo = this.$util.tryParseJson(res.data.c)
						console.log(userInfo)
						uni.setStorageSync('userId', userInfo.userId)
						uni.setStorageSync('userHead', userInfo.userHead)
						uni.setStorageSync('userName', userInfo.userName)
						uni.setStorageSync('userSex', userInfo.sex)
						uni.setStorageSync('userTel', this.moblie)
						uni.redirectTo({
							url: '/pages/login/interest/interest'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},
			finish(res) {
				this.code = res
			},
			sendBtn() {
				let cnt = {
					phone: this.moblie, // String 手机号
					type: this.$constData.codeType[0].key, // String <选填> 类型
				}
				this.sendSms(cnt)
				this.num = 60
			}
		},
		onLoad(option) {
			// this.boxBg = 'background:url(' + this.$constData.oss + '/image/codeBG.png)'

			let tell = option.tell
			this.moblie = tell
			this.tell = tell.substr(0, tell.length - 6) + '****' + tell.substr(tell.length - 2)

			this.sendBtn()
		}

	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
		height: 100vh;
		background-size: cover;
		background-position: center;
	}

	.content-box {
		width: 572rpx;
		margin: 0 auto;
		padding-top: 184rpx;

	}

	.title-box {
		width: 100%;
		height: 78rpx;
		font-size: 56rpx;
		color: #fff;
	}

	.title-tell {
		margin-top: 10rpx;
		height: 48rpx;
		width: 100%;
		opacity: .5;
		color: #fff;
		font-size: 34rpx;
	}

	.code-text {
		float: left;
		height: 48rpx;
		line-height: 48rpx;
	}

	.tell-text {
		float: left;
		margin-left: 12rpx;
		height: 48rpx;
		line-height: 48rpx;
	}

	.code-box {
		width: 100%;
		height: 102rpx;
		margin-top: 67rpx;
	}

	.code-btn {
		width: 100%;
		height: 100rpx;
		opacity: .8;
		border-radius: 6rpx;
		background: #fff;
		margin-top: 56rpx;
		text-align: center;
		font-szie: 36rpx;
		line-height: 100rpx;
		color: #587685;
	}

	.send-btn {
		width: 100%;
		height: 33rpx;
		font-size: 24rpx;
		line-height: 33rpx;
		text-align: center;
		color: #fff;
		margin-top: 52rpx;
	}

	.send-btn-num {
		width: 100%;
		height: 33rpx;
		font-size: 24rpx;
		line-height: 33rpx;
		text-align: center;
		color: #fff;
		margin-top: 52rpx;
		opacity: .5;
	}

	.bg-img {
		position: absolute;
		width: 100%;
		height: 100vh;
	}
</style>
