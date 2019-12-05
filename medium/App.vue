<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.onTabBarMidButtonTap((res) => {
				let data = getCurrentPages()
				if (data[0].route != 'pages/index/index') {
					uni.navigateTo({
						url: '/pages/index/index'
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.auto-placeholder {
		color: $group-color-befor;
	}

	input {
		caret-color: #00C8BE;
	}
</style>
