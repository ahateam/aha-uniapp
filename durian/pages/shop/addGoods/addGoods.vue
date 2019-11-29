<template>
	<view class="body">
		<navBar :back="false">
			<view slot="left" class="iconfont icon-fanhui backBtn" @click="navBack"></view>
			<view class="title-box">发布商品</view>
		</navBar>
		<view class="autoTitle">
			商品名称
		</view>
		<input class="autoInput" type="text" v-model="title" placeholder="请输入商品名称" />
		<view class="tipBox">
			多放几张照片吧，会增加购买的机率哦！
			<view class="tipPou"></view>
		</view>

		<view class="imgBox">
			<view class="imgs" v-for="(item,index) in imgList" :key="index" v-if="index < 3">
				<image :src="item" mode="aspectFill" :style="index == 2?'margin-right:0':''"></image>
				<view class="iconfont icon-jia delBtn" @click="delImg(index)"></view>
			</view>
			<view class="addImgBtn" @click="addImgs" v-if="imgList.length < 3">
				<text class="iconfont icon-jia"></text>
			</view>
		</view>

		<view class="lineBox"></view>

		<view class="autoTitle" style="margin-top: 30rpx;">
			价格
		</view>
		<input class="autoInput" type="number" v-model="money" placeholder="请输入商品价格" />

		<view class="autoTitle">
			商品描述
		</view>
		<view class="autoInput areaBox">
			<textarea placeholder="请输入商品简介" v-model="info" maxlength="200" />
			<view class="infoNumber">(<text>{{info.length}}</text>/200)</view>
		</view>
		
		<button class="addBtn" type="primary" @click="addGoods">发布</button>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar,
		},
		data() {
			return {
				title: '',
				money: '',
				imgList: [],
				info: '',

			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			},

			//添加图片
			addImgs() {
				let _this = this
				let tiemr = new Date()
				let address = tiemr.getFullYear() + "" + (tiemr.getMonth() + 1) + "" + tiemr.getDate();
				address = 'image/' + address + '/'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						var imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = address + tiemr.getTime() + str
						// nameStr =  res.tempFilePaths[0]
						console.log(nameStr)
						uni.showLoading({
							title: '上传中'
						});
						uni.uploadFile({
							url: 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com',
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							formData: {
								name: nameStr,
								'key': nameStr,
								'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMi0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
								'OSSAccessKeyId': 'LTAIJ9mYIjuW54Cj',
								'success_action_status': '200',
								//让服务端返回200,不然，默认会返回204
								'signature': 'kgQ5n4s0oKpFHp35EI12CuTFvVM=',
							},
							success: (res) => {
								console.log(res)
								uni.hideLoading()
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								//只管这个变量
								this.imgList.push('https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/' + nameStr)
								console.log(this.imgList)
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						uni.showToast({
							title: '已取消',
							icon: 'none'
						})
					}
				})
			},

			delImg(index) {
				this.imgList.splice(index, 1)
			},
			
			addGoods(){
				if(this.title == ''){
					uni.showToast({
						title:'请输入商品名称',
						icon:'none'
					})
				}else if(this.imgList.length ==''){
					uni.showToast({
						title:'请上传至少一张商品图片',
						icon:'none'
					})
				}else if(this.money == ''){
					uni.showToast({
						title:'请输入商品价格',
						icon:'none'
					})
				}else if(this.info == ''){
					uni.showToast({
						title:'请输入商品简介',
						icon:'none'
					})
				}else{
					// 发布商品 **************************
					let cnt = {
						goodsName: this.title, // String 商品标题
						senderId: this.$util.tryParseJson(uni.getStorageSync('userInfo')).userId, // Long 发布者编号
						goodsType: this.$constData.goodsType[0].key, // Byte 商品类型
						goodsClassifyId: 402755506127634, // Long 商品分类
						stock: 1, // Integer 库存
						goodsPrice: this.money, // Double 商品价格
						goodsDescribe: this.info, // String 商品描述
						goodsData: JSON.stringify(this.imgList), // String 商品图片数据
						// keyword: '学生', // String 商品关键字
						// isOnline: 1, // Byte 商品是否需要发货
					}
					this.createGoods(cnt)
				}
			},
			
			createGoods(cnt){
				this.$api.createGoods(cnt,(res)=>{
					if(res.data.rc == this.$util.RC.SUCCESS){
						uni.switchTab({
							url:'/pages/shop/shop'
						})
						uni.showToast({
							title:'发布成功！'
						})
					}else{
						uni.showToast({
							title:'发布失败',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		padding-bottom: 102rpx;
	}

	.backBtn {
		position: absolute;
		left: 29rpx;
		font-size: 33rpx;
		color: $group-color
	}

	.title-box {
		font-weight: $group-title-weight;
	}

	.autoTitle {
		margin-left: 40rpx;
		margin-top: 40rpx;
		font-size: $group-font-befor;
		line-height: $group-font-befor-line;
		color: $group-color;
	}

	.autoInput {
		margin: 30rpx;
		margin-bottom: 0;
		border: 1rpx solid $group-color-befor;
		border-radius: 6rpx;
		font-size: $group-font-befor;
		height: 88rpx;
		padding: 0 30rpx;
		color: $group-color-article;
	}

	.tipBox {
		position: relative;
		margin: 20rpx 0 0 30rpx;
		display: inline-block;
		padding: 0 20rpx;
		background-color: rgba(255, 157, 10, 0.1);
		color: #FFA405;
		font-size: $group-font;
		line-height: 60rpx;
		border-radius: 6rpx;
		box-sizing: border-box;
	}

	.tipPou {
		position: absolute;
		top: 60rpx;
		left: 21rpx;
		width: 0;
		height: 0;
		border: 10rpx solid;
		border-color: rgba(255, 157, 10, 0.1) transparent transparent;
		box-sizing: border-box;
	}

	.imgBox {
		padding: 19rpx 30rpx 0;
		display: flex;
		flex-direction: row;
		// justify-content: space-between;

		image {
			width: 220rpx;
			height: 220rpx;
			margin-right: 15rpx;
			border-radius: 4rpx;
		}
	}

	.addImgBtn {
		width: 220rpx;
		height: 220rpx;
		border-radius: 4rpx;
		background-color: $group-color-search;
		color: $group-color;
		line-height: 220rpx;
		text-align: center;

		.iconfont {
			font-size: $group-font-big;
		}
	}

	.imgs {
		position: relative;
	}

	.delBtn {
		position: absolute;
		right: 25rpx;
		top: 10rpx;
		width: 38rpx;
		height: 38rpx;
		background-color: rgba($color: $group-color-curr, $alpha: 0.9);
		border-radius: 50%;
		color: $group-color-w;
		transform: rotate(45deg);
		font-size: 17rpx;
		line-height: 38rpx;
		text-align: center;
	}

	.lineBox {
		width: 100%;
		height: 20rpx;
		background-color: $group-color-search;
		margin-top: 30rpx;
	}
	
	.areaBox{
		position: relative;
		padding: 30rpx;
		padding-bottom: 55rpx;
		box-sizing: border-box;
		height: 193rpx;
		textarea{
			width: 100%;
			height: 100%;
		}
	}
	
	.infoNumber{
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
		color: $group-color-befor;
		font-size: 22rpx;
		line-height: 30rpx;
		text{
			color: $group-color;
		}
	}
	
	.addBtn{
		position: fixed;
		bottom: 0;
		height: 102rpx;
		width: 100%;
		line-height: 102rpx;
		background-color: $group-color-curr;
		color: $group-color-w;
		font-size: 36rpx;
		border-radius: 6rpx;
		
		&:after{
			border: none;
		}
	}
</style>
