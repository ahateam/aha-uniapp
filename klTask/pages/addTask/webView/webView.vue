<template>
	<view><web-view :src="src" @message="getWebView"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			src: '',
			type: '',
			lat: '',
			lng: ''
		};
	},
	methods: {
		getWebView(e) {
			let addressInfo = e.detail.data[0];
			addressInfo.pos = `${addressInfo.pos.lat},${addressInfo.pos.lng}`;

			if (this.type == 'to') {
				this.$store.commit('updaTaskTo', addressInfo);
			} else {
				this.$store.commit('updaTaskFrom', addressInfo);
			}
		}
	},
	onLoad(res) {
		this.type = res.type;
		if (this.type == 'xy') {
			this.src = `/hybrid/html/local.html?type=${res.type}&lat=${res.lat}&lng=${res.lng}`;
		} else {
			this.src = `/hybrid/html/local.html?type=${res.type}`;
		}
	}
};
</script>

<style lang="scss"></style>
