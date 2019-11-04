<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.getVersion()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getVersion() {
				this.$api.getVersion({}, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let resData = JSON.parse(res.data.c)
						let platform = uni.getSystemInfoSync().platform
						if (Number(resData.version) > this.$constData.version) {
							this.show = true
							this.versionObj = resData
							this.platform = platform
							uni.showLoading({
								title: '版本更新，已跳转下载...'
							})
							setTimeout(() => {
								this.loadBtn()
							}, 1500)
						}
			
					} else {
						uni.showToast({
							title: '获取版本更新失败！',
							icon: 'none'
						})
					}
				})
			},
			
			loadBtn() {
				if (this.platform == 'android') {
					plus.runtime.openURL(this.versionObj.android)
					uni.hideLoading()
				} else if (this.platform == 'ios') {
					plus.runtime.openURL(this.versionObj.ios)
					uni.hideLoading()
				}
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
