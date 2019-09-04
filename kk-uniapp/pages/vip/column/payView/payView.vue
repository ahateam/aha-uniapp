<template>
	<view class="body">
		<view class="titleBox">
			<image class="img" :src="src" mode="scaleToFill"></image>
			<view class="titleText">
				<view>{{title}}</view>
				<view class="money">￥{{money}}</view>
			</view>
		</view>

		<view class="offBox">
			<view>优惠券</view>
			<view class="rightBox">
				<text class="offMoney">-￥{{offMoney}}</text>
				<text class="iconfont kk-xiayibu"></text>
			</view>
		</view>

		<view class="payTitle">
			支付方式<text class="textInfo">(可以任选支付方式)</text>
		</view>

		<view class="payMethod">
			<radio-group @change="radioChange">
				<label class="payList" v-for="(item, index) in items" :key="item.value">
					<text :class="'iconfont payIcon '+item.iconName " :style="item.style"></text>
					<text class="payName">{{item.name}}</text>
					<radio class="rightBox" :value="item.value" :checked="index === current" />
				</label>
			</radio-group>
		</view>
		
		<view class="errInfo">
			<view>·您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请斟酌确认。</view>
			<view>·购买后可在“已购”区查看和使用。</view>
		</view>
		
		<view class="bottomBtn">
			<button type="primary" @click="navToPay">￥{{money-offMoney}}/立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567139311188&di=b309ce828b72d42a2c9318f26f7115c7&imgtype=0&src=http%3A%2F%2Fwww.pclady.com.cn%2Fstyle%2Fmovie%2F0509%2Fpic%2Fbb20050920_shjz_06_thumb.jpg',
				title: '这是一个标题',
				money: '233.00',
				offMoney: '5',
				items: [{
						value: '0',
						name: '余额',
						iconName:'kk-money',
						style:'color:#fb6c04'
					},
					{
						value: '1',
						name: '微信支付',
						iconName:'kk-weixinzhifu',
						style:'color:#24af41'
					},
					{
						value: '2',
						name: '支付宝支付',
						iconName:'kk-big-Pay',
						style:'color:#1296db'
					},
				],
				current:1,
				payMethod:1,
				
			};
		},
		onLoad(res) {
			console.log(res)
		},
		methods:{
			radioChange(res){
				this.payMethod = res.detail.value
				console.log(this.payMethod)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body {
		background-color: #f6f6f8;
		min-height: 100vh;
	}

	.titleBox {
		position: relative;
		padding: $box-margin-top $box-margin-left;
		display: flex;
		flex-direction: row;
		background-color: #fff;
		margin-bottom: 2px;

		.img {
			display: flex;
			width: 15vw;
			height: 18vw;
			margin-right: $box-margin-left;
		}

		.titleText {
			position: absolute;
			top: 50%;
			margin-top: -58upx;
			left: 21vw;
			font-size: $list-title;
			line-hight: $list-title-line;
			font-weight: bold;

			.money {
				margin-top: $box-margin-top;
				color: #fb6c04;
			}
		}
	}

	.offBox {
		position: relative;
		background-color: #fff;
		padding: $box-margin-top $box-margin-left;
		font-size: $list-info;
		margin-bottom: 10upx;

		.rightBox {
			color: $list-info-color;
			.offMoney{
				color: #fb6c04;
			}
		}
	}

	.rightBox {
		position: absolute;
		right: $box-margin-left;
		top: $box-margin-top;
		font-size: $list-info;
	}

	.payTitle {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		line-hight: $list-title-line;

		.textInfo {
			font-size: $list-info;
			line-hight: $list-title-line;
			color: $list-info-color;
		}
	}
	
	.payList{
		position: relative;
		padding: $box-margin-top $box-margin-left;
		background-color: #fff;
		display: block;
		margin-bottom: 1px;
	}
	
	.payName{
		margin-left: 10upx;
		font-size: $list-info;
		vertical-align: middle;
	}
	
	.payIcon{
		font-size: $list-title-l;
		vertical-align: middle;
	}
	
	.errInfo{
		padding: $box-margin-top $box-margin-left;
		font-size: $uni-font-size-sm;
		color: #aaa;
		view{
			margin-bottom: 10upx;
		}
	}
	
	.bottomBtn {
		position: fixed;
		width: 100vw;
		bottom: 0;
	
		button {
			width: 100%;
			border-radius: 0;
			font-size: $list-title;
			line-height: 100upx;
			background-color: #ec706b;
		}
		
		.button-hover {
			background-color: rgba(236, 112, 107, 0.5);
			color: rgba(255, 255, 255, 0.5)
		}
	}
</style>
