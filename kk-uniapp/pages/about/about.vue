<template>
	<view class="qrimg">
		<tki-qrcode ref="qrcode" :cid="cid" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
		 :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="usingComponents"
		 :showLoading="showLoading" :loadingText="loadingText" @result="qrR" />
		 
		 <image :src="src" mode="widthFix"></image>
		 <button type="primary" @tap="creatQrcode">生成！</button>
	</view>
	
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				ifShow: true,
				val: '二维码', // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#b4e9e2', // 背景色
				foreground: '#309286', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad() {
			this.getPageUrl()
		},
		methods: {
			//获取当前页链接
			getPageUrl(){
				var pages = getCurrentPages() //获取加载的页面
				var currentPage = pages[pages.length - 1] //获取当前页面的对象
				console.log(currentPage)
				var url = currentPage.route //当前页面url
				if(url == undefined){
					url = currentPage.__route__
				}
				var options = currentPage.options //如果要获取url中所带的参数可以查看options 
				var id = 1234567890
				var id1 = '_id'
				var src = `${url}?id=${id}&id1=${id1}`
				console.log(src)
				this.val = src
			},
			sliderchange(e) {
				this.size = e.detail.value
			},
			creatQrcode() {
				console.log(this.val)
				this.$refs.qrcode._makeCode()
			},
			saveQrcode() {
				this.$refs.qrcode._saveCode()
			},
			qrR(res) {
				this.src = res
			},
			clearQrcode() {
				this.$refs.qrcode._clearCode()
				this.val = ''
			},
			ifQrcode() {
				this.ifShow = !this.ifShow
			},
			selectIcon() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.icon = res.tempFilePaths[0]
						setTimeout(() => {
							that.creatQrcode()
						}, 100);
						// console.log(res.tempFilePaths);
					}
				});
			}
		}
	}
</script>

<style>

</style>
