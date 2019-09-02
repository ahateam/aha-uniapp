<template>
	<view>
		<view>
			<view>
				<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
				 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
				 :usingComponents="true" @result="qrR" />
			</view>
		</view>
		<canvas style="width: 300px; height: 200px;" canvas-id="firstCanvas"></canvas>
		<button type="primary" @tap="createHb">生成海报</button>
	</view>
</template>
<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	let context = uni.createCanvasContext('firstCanvas')
	export default {
		data() {
			return {
				ifShow: true,
				val: '二维码', // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#fff', // 背景色
				foreground: '#000', // 前景色
				pdground: '#32dbc6', // 角标色
				icon: '/static/logo.png', // 二维码图标
				iconsize: 30, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			}
		},
		onLoad: function() {

		},
		methods: {
			createHb() {
				this.createCanvas()
			},
			createCanvas() {
				context.setFillStyle('#fff')
				context.fillRect(0, 0, 300, 200)
				context.drawImage(this.src, 75, 25, 150, 150)
				let color = context.createLinearGradient(0, 0, context.width, 0)
				color.addColorStop("0", "magenta")
				color.addColorStop("0.5", "blue")
				color.addColorStop("1.0", "red")
				// context.strokeStyle = color
				context.font = "30px Arial"
				console.log(color)
				context.setFillStyle('#fff')
				context.fillText("小程序生成img测试", 10, 50)
				context.draw()
				let that = this
				setTimeout(function() {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 300,
						height: 200,
						destWidth: 300,
						destHeight: 200,
						canvasId: 'firstCanvas',
						success: function(res) {
							// 在H5平台下，tempFilePath 为 base64
							console.log(res.tempFilePath)
						}
					})
				}, 300);
			},
			qrR(res) {
				this.src = res
			},
		},
		components: {
			tkiQrcode
		},

	}
</script>

<style>

</style>
