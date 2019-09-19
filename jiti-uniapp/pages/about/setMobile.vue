<template>
	<view>
		<view class="content-box">
			<view class="item-input">
				<input type="text" class="input-box" placeholder="请输入要绑定的手机号码" v-model="mobile" v-if="key=='1'" />
				<input type="password" class="input-box" placeholder="请输入用户密码完成验证" v-model="password" />

			</view>
		</view>

		<view class="footer-box">
			<button type="primary" @click="delMobile()" v-if="key=='0'">确认解绑</button>
			<button type="primary" @click="addMobile()" v-else>确认绑定新手机号</button>
			<button type="default" @click="toBack()">
				返回上一页
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'setMoblie',
		data() {
			return {
				userId: '',
				key: '',
				password: '',
				mobile: null,
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


			//变更手机号
			editUserMobile(cnt) {
				this.$api.editUserMobile(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {

						if (res.data.c == '0') { //密码输入错误
							uni.showToast({
								icon: 'none',
								title: '密码验证错误'
							})
						} else { //完成解绑或者绑定的操作
							uni.showToast({
								icon: 'success',
								title: '变更成功'
							})

							let userInfo = JSON.parse(res.data.c)
							let orgInfo = JSON.parse(uni.getStorageSync('orgInfo'))
							let orgUserInfo = JSON.parse(uni.getStorageSync('orgUserInfo'))
							
					
							orgInfo.mobile=this.mobile
							orgUserInfo.mobile = this.mobile

							uni.setStorageSync('userInfo', JSON.stringify(userInfo))
							uni.setStorageSync('orgInfo', JSON.stringify(orgInfo))
							uni.setStorageSync('orgUserInfo', JSON.stringify(orgUserInfo))
							uni.switchTab({
								url: '/pages/index/index'
							});

						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '操作失败'
						})
					}
				})
			},
			//解绑
			delMobile() {
				if (this.password) {
					let cnt = {
						userId: this.userId,
						mobile: null,
						password: this.password
					}
					this.editUserMobile(cnt)
				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入密码进行验证'
					})
				}
			},
			//绑定
			addMobile() {
				if (this.password) {

					if ((/^1[23456789]\d{9}$/.test(this.mobile))) {
						let cnt = {
							userId: this.userId,
							mobile: this.mobile,
							password: this.password
						}
						this.editUserMobile(cnt)
					} else {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的手机号码'
						})
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入密码进行验证'
					})
				}
			}



		},
		onLoad(option) {
			this.userId = option.userId
			this.key = option.key


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
