<template>
	<view>
		<view class="content-box">
			<view class="item-input">
				<input type="password" class="input-box" placeholder="请输入旧密码" v-model="oldPassword" />
				<input type="password" class="input-box" placeholder="请输入新密码" v-model="newPassword" />
				<input type="password" class="input-box" placeholder="再次输入新密码" v-model="newPassword1" />
			</view>
		</view>

		<view class="footer-box">
			<button type="primary" @click="editBtn()">确认修改</button>
			<button type="default" @click="toBack()">
				返回上一页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'updataPwd',
		data() {
			return {
				userInfo: '',
				oldPassword: '',
				newPassword1: '',
				newPassword: '',
			}
		},
		methods: {

			outLogin() {
				uni.clearStorageSync();
				uni.reLaunch({
					url: '../login/login'
				})
			},

			toBack() {
				uni.navigateBack();
			},
			editUserPassword(cnt) {
				this.$api.editUserPassword(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						if (res.data.c == '0') {
							uni.showToast({
								icon: 'none',
								title: '原密码输入错误'
							});
						} else {
							uni.showToast({
								icon: 'success',
								title: '修改成功，重新登录！',
								duration: 2000
							});

							this.outLogin()
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '修改失败'
						});
					}
				})
			},

			editBtn() {
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				if (this.newPassword == '' || this.newPassword1 == '' || this.oldPassword == '') {
					uni.showToast({
						icon: 'none',
						title: '请将信息输入完整',
					});
				} else {
					if (this.newPassword == this.newPassword1) {
						let cnt = {
							userId: userInfo.id,
							oldPassword: this.oldPassword,
							newPassword: this.newPassword,
						}
						console.log(cnt)
						this.editUserPassword(cnt)
					} else {
						uni.showToast({
							icon: 'none',
							title: '两次输入的新密码不一致！'
						});
					}
				}

			}
		},
		onLoad() {

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
