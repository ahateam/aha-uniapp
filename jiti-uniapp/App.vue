<template>
	<view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				provider: '',
				show: false,
				versionObj: {}
			}
		},
		methods: {
			loadBtn() {
				if (this.platform == 'android') {

					plus.runtime.openURL(this.versionObj.android);
				} else if (this.platform == 'ios') {
					plus.runtime.openURL(this.versionObj.ios);
				}
			},

			getVersion() {




				this.$api.getVersion({}, (res) => {
					let resData = JSON.parse(res.data.c)
					let platform = uni.getSystemInfoSync().platform
					if (Number(resData.version) > this.$constData.version) {
						this.show = true
						this.versionObj = resData
						this.platform = platform
						uni.showLoading({
						    title: '版本更新，已跳转下载...'
						});
						setTimeout(() => {
							this.loadBtn()
						}, 1500)
					}

				})
			}

		},
		onLaunch: function() {
			console.log('111')
			this.getVersion()
			// 	uni.getProvider({
			// 		service: 'oauth',
			// 		success: (res) => {
			// 			this.provider = res.provider

			// 			uni.showToast({
			// 				icon: 'none',
			// 				title: '111111',
			// 			})



			// 		},
			// 	})
		},
		onShow: function() {



		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	.maincon {
		width: 90%;
		margin: 50rpx auto;
	}

	button {
		margin: 40rpx auto 40rpx;
	}
</style>
