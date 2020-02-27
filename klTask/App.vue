<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		uni.onTabBarMidButtonTap(res => {
			uni.navigateTo({
				url: '/pages/addTask/addTask'
			});
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
.auto-placeholder {
	color: $group-color-befor;
}

/* #ifdef APP-VUE */
input {
	caret-color: #a0bf5f;
}
textarea {
	caret-color: #a0bf5f;
}
/* #endif */
</style>
