<template>
	<view>
		<button @tap="chooseImage()">选择图片</button>
		<image class="image" :src="path"></image>
		<kps-image-cutter @ok="onok" @cancel="oncancle" @restart="restart" :url="url" :fixed="false" :width="300" :height="300"></kps-image-cutter>
	</view>
</template>

<script>
	import kpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	export default {
		components: {
			kpsImageCutter
		},
		data() {
			return {
				url: "",
				path: ""
			}
		},
		mounted() {

		},
		methods: {
			chooseImage() {
				uni.chooseImage({
					success: (res) => {
						// 设置url的值，显示控件
						this.url = res.tempFilePaths[0];
					}
				});
			},

			restart() {
				let a = ''
				a = this.url
				this.url = ''
				setTimeout(() => {
					this.url = a
				}, 10)
			},

			onok(ev) {
				this.path = ev.path;
				this.url = "";
			},
			oncancle() {
				// url设置为空，隐藏控件
				this.url = "";
			}
		}
	}
</script>

<style scoped>
	.image {
		width: 200px;
		height: 200px;
	}
</style>
