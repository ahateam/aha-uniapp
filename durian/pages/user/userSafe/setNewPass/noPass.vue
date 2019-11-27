<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#587685" title="设置新密码">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
		</navBar>
		<view :style="{'padding-top': getNavHeight()}"></view>

		<view class="auto-input auto-margin flex-box">
			<view class="left-title">手机号</view>
			<view class="tell-text">{{phone}}</view>
		</view>

		<view class="auto-input auto-margin flex-box">
			<input class="left-title code-input" type="text" v-model="code" /><button class="code-btn" v-if="codeTime < 1"
			 @click="getCode">验证码</button><button class="code-time" v-else>{{codeTime}}s</button>
		</view>

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
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},
		onLoad() {
			let tel = uni.getStorageSync('userTel')
			this.phone = tel.substr(2, tel.length - 9) + '****' + tel.substr(tel.length - 3)
			this.tel = tel
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

	.code-btn {
		margin: 0;
		line-height: 66rpx;
		width: 150rpx;
		background-color: #00C8BE;
		color: $group-color-w;
		border-radius: 6rpx;
		font-size: $group-font-befor;

		&:after {
			border: none;
		}
	}

	.code-input {
		font-size: $group-font-befor;
	}

	.code-time {
		margin: 0;
		width: 150rpx;
		line-height: 66rpx;
		background-color: $group-color-search;
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
