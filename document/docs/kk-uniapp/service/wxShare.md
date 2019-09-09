---
title: 实现微信分享
author: 李金泉
date: 2019-9-9

---

## 功能简介
- 1. 生成朋友圈分享海报
- 2. 生成二维码

## 二维码的生成
- 使用了第三方插件[tki-qrcode](https://ext.dcloud.net.cn/plugin?id=39)，可以先熟悉插件

## 实现示例
- ### html部分代码
1. 触发
```html
<view class="action-item">
	<button type="primary" @click="createHb">
		<i class="yticon iconfont kk-friendzone centerBox"></i>
		<text>朋友圈</text>
	</button>
</view>
```

2. canvas画布
```html
<tki-qrcode class="hiddenBox" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
 :usingComponents="true" @result="qrR" />
<canvas class="hiddenBox canvasBox" canvas-id="firstCanvas"></canvas>
<canvas class="hiddenBox upHeadBox" canvas-id="upHeadCanvas"></canvas>
```

3. 海报生成页面
```html
<view class="poster" v-if="posterShow" @click="hiddenPoster">
	<view class="posterImg" @click.stop>
		<image ref="posterImg" :src="posterImg " mode="widthFix" @click="showImg"></image>
	</view>
	<view class="posterBtn">
		<view class="stopBtn" @click.stop>
			<button type="primary" @click="saveImg">保存图片至本地</button>
		</view>
	</view>
</view>
```
- ### js如下
1. 导入插件,获取canvas
```javascript
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
let context = uni.createCanvasContext('firstCanvas')
let upHead = uni.createCanvasContext('upHeadCanvas')
```

2. 定义插件所需常量
```javascript
/* 分享朋友圈 */
val: '', // 要生成的二维码值
size: 200, // 二维码大小
unit: 'px', // 单位
background: '#FFFFFF', // 背景色
foreground: '#000000', // 前景色
pdground: '#32dbc6', // 角标色
icon: '/static/logo.png', // 二维码图标
iconsize: 30, // 二维码图标大小
lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
onval: true, // val值变化时自动重新生成二维码
loadMake: true, // 组件加载完成后自动生成二维码
src: '', // 二维码生成后的图片地址或base64

posterImg: '',
posterShow: false, //控制分享页的显示
/* 分享朋友圈end */
```

3. 改变二维码的值，插件自动生成二维码
```javascript
//开始生成海报
createHb() {
	uni.showLoading({
		title: '生成中'
	})
	this.val = `https://wx.zyxhj.cn?id=${this.contentId}&id1=${this.id1}` //值改变后自动调取qrR()
},//val改变时，onval为true调用qrR()

qrR(res) { 
	this.src = res //生成二维码的图片地址
	this.createCanvas()
},
```
4. 开始在画布上画图
```javascript
// 生成背景
createCanvas() {
	//生成背景
	context.setFillStyle('#FFFFFF')
	context.fillRect(0, 0, 450, 800)
	let imgList = this.$util.tryParseJson(this.detailData.data).imgList
	let bgImg = ''
	if (imgList.length > 0) {
		uni.downloadFile({
			url: imgList[0].src,
			success: (res) => {
				context.drawImage(res.tempFilePath, 0, 0, 450, 500)
				this.getUpHead()
			}
		})
	}
},
```
5. 通过另一个canvas生成圆形头像图片再绘制到海报中
```javascript
//生成上传者圆形头像
getUpHead() {
	let img = this.$util.tryParseJson(this.upInfo.ext).userHead
	console.log(img)
	console.log('头像地址')
	let imgSrc = ''
	uni.downloadFile({
		url: img,
		success: (res) => {
			imgSrc = res.tempFilePath
			console.log(imgSrc)
			upHead.arc(50, 50, 50, 0, 2 * Math.PI)
			upHead.clip()
			upHead.drawImage(imgSrc, 0, 0, 100, 100)
			upHead.draw()
			setTimeout(() => { //延时生成图片
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 100,
					height: 100,
					destWidth: 100,
					destHeight: 100,
					canvasId: 'upHeadCanvas',
					success: (res) => {
						// 在H5平台下，tempFilePath 为 base64
						context.drawImage(res.tempFilePath, 20, 520, 50, 50)
						this.createPoster()
					},
					fail: (error) => {
						console.log(error)
					}
				})
			}, 400)
		}
	})
},
```
6. 生成海报详细图片
```javascript
//最终生成海报
createPoster() {
	// 二维码图片
	context.drawImage(this.src, 280, 520, 150, 150)
	// 文字
	context.setFillStyle('#000000')
	context.font = '18px Arial'
	context.fillText(this.upInfo.name, 80, 550)
	context.font = '20px Arial'
	context.fillText(this.detailData.title, 20, 610)
	context.font = '16px Arial'
	context.setFillStyle('#aaa')
	context.fillText('长按扫码查看详情', 20, 650)
	//生成画布
	context.draw()
	setTimeout(() => { //延时生成图片
		uni.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: 450,
			height: 690,
			destWidth: 450,
			destHeight: 690,
			canvasId: 'firstCanvas',
			success: (res) => {
				uni.hideLoading()
				// 在H5平台下，tempFilePath 为 base64
				this.posterImg = res.tempFilePath
				console.log(this.posterImg)
			}
		})
		this.showHb()
	}, 300)
},
```
7. 展示海报
```javascript
showHb() {
	this.posterShow = true
},
```


## 三方文档资料
- [uni-app](https://uniapp.dcloud.io/)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)