<template>
	<view class="progress_box">
		<canvas class="progress_bg" canvas-id="cpbg"></canvas>
		<canvas class="progress_bar" canvas-id="cpbar"></canvas>
		<view class="progress_txt">
			<view class="progress_info">{{ progress_txt }}%</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			progress_txt: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				width: '',
			}
		},
		onReady: function() {
			this.getWitdth()
		},
		methods: {
			getWitdth() {
				uni.getSystemInfo({
					success: (res) => {
						this.width = res.screenWidth
						this.drawProgressbg();
						this.drawCircle(this.progress_txt); //参数为1-100
					}
				})
			},
			drawProgressbg() {
				let canvasWidth = this.width / 750 * 45
				// 自定义组件实例 this ，表示在这个自定义组件下查找拥有 canvas-id 的 <canvas/>
				let ctx = uni.createCanvasContext('cpbg', this)
				let lineWidth = this.width / 750 * 6
				let width = this.width / 750 * 40
				console.log(width)
				ctx.setLineWidth(lineWidth) // 设置圆环的宽度
				ctx.setStrokeStyle('#E9E9E9') // 设置圆环的颜色
				ctx.setLineCap('round') // 设置圆环端点的形状
				ctx.beginPath(); //开始一个新的路径
				ctx.arc(canvasWidth, canvasWidth, width, 0, 2 * Math.PI, false)
				//设置一个原点(110,110)，半径为100的圆的路径到当前路径
				ctx.stroke() //对当前路径进行描边
				ctx.draw()
			},
			drawCircle(step) {
				let canvasWidth = this.width / 750 * 45
				let ctx = uni.createCanvasContext('cpbar', this);
				let lineWidth = this.width / 750 * 6
				// 进度条的渐变(中心x坐标-半径-边宽，中心Y坐标，中心x坐标+半径+边宽，中心Y坐标)
				let gradient = ctx.createCircularGradient(this.width / 750 * 45, this.width / 750 * 45,this.width / 750 * 10 );
				gradient.addColorStop('0', '#FAD961');
				gradient.addColorStop('1.0', '#FFA405');
				ctx.setLineWidth(lineWidth);
				ctx.setStrokeStyle(gradient);
				ctx.setLineCap('round');
				ctx.beginPath();
				// 参数step 为绘制的百分比
				step = 0.02 * step;
				if (step > 2) {
					step = 2
				}
				ctx.arc(canvasWidth, canvasWidth, this.width / 750 * 40, 0, step * Math.PI, false);
				ctx.stroke();
				ctx.draw();
			}
		}
	};
</script>

<style>
	.progress_box {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.progress_bg {
		position: absolute;
		width: 90rpx;
		height: 90rpx;
	}

	.progress_bar {
		width: 90rpx;
		height: 90rpx;
	}

	.progress_txt {
		position: absolute;
		font-size: 28rpx;
		color: #999999;
	}

	.progress_info {
		font-size: 26rpx;
		letter-spacing: 2rpx;
		color: #FFA405;
	}
</style>
