<template>
	<view>
		<view class="content-box">
			<view class="item-input">
				<input type="password" class="input-box" placeholder="请输入密码" v-model="pwd" />
			</view>
		</view>

		<view class="footer-box">
			<button type="primary" @click="loginBtn()">确认登录</button>
			<button type="default" @click="toBack()">
				返回上一页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tellPwd',
		data() {
			return {
				userId: '',
				pwd: ''
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			loginBtn() {
				if (this.pwd == '') {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					})
				} else {
					let cnt = {
						userId: this.userId,
						pwd: this.pwd,
					};

					this.$api.loginByUserId(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							let data = this.$util.tryParseJson(res.data.c, {})
							uni.setStorageSync('userInfo', JSON.stringify(data))
							uni.showToast({
								icon: 'success',
								title: '登录成功'
							})
							uni.navigateTo({
								url: '/pages/chooseOrg/chooseOrg'
							});
						} else {
							uni.showToast({
								icon: 'icon',
								title: '登录失败'
							})

						}
					})
				}

				this.pwdShow = false

			}
		},
		onLoad(option) {
			this.userId = option.id
		}
	}
</script>

<style scoped lang="scss">
	.content-box {
		padding: 30rpx;

	}

	.input-box {
		margin-top: 30rpx;
		font-size: 28rpx;
		line-height: 40rpx;
		border: 1px solid $jiti-color-blue;
		border-radius: 5px;
		padding: 20rpx;
	}

	.footer-box {
		width: auto;
		padding: 40rpx;

	}
</style>
