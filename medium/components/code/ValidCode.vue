<!-- 
自定义验证码输入、密码输入使用
 
使用方法：
maxlength：输入最大长度
isPwd：是否是密码模式
@finish：回调函数
 <validcode :maxlength="4" :isPwd="false" @finish="finish"></validcode>
 -->
<template>
	<view class="code-area">
		<view class="flex-box">
			<input type="number" focus :maxlength="maxlength" class="hide-input" @input="getVal" />
			<view v-bind:class="['item', { active: codeIndex == 1 }]">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 1">
					<text class="dot">.</text>
				</block>
				<block v-if="codeArr[0]==undefined?fasle:true"> {{ codeArr[0] }}</block>
			</view>
			<view v-bind:class="['item', { active: codeIndex == 2 }]">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 2">
					<text class="dot">.</text>
				</block>
				<block v-if="codeArr[1]==undefined?fasle:true"> {{ codeArr[1] }}</block>
			</view>

			<view v-bind:class="['item', { active: codeIndex == 3 }]">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 3">
					<text class="dot">.</text>
				</block>
				<block v-if="codeArr[2]==undefined?fasle:true"> {{ codeArr[2] }}</block>
			</view>
			<view v-bind:class="['item', { active: codeIndex == 4 }]">
				<view class="line"></view>
				<block v-if="isPwd && codeArr.length >= 4">
					<text class="dot">.</text>
				</block>
				<block v-if="codeArr[3]==undefined?fasle:true"> {{ codeArr[3] }}</block>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		name: 'ValidCode',
		props: {
			//最大长度 值为4或者6
			maxlength: {
				type: Number,
				default: 4
			},
			//是否是密码
			isPwd: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				codeIndex: 1, //下标
				codeArr: []
			};
		},
		methods: {
			//取值
			getVal(e) {
				let {
					value
				} = e.detail;
				// console.log('验证码:', value);
				let arr = value.split('');
				this.codeIndex = arr.length + 1;
				this.codeArr = arr;
				// console.log(this.codeIndex, this.pwdArr);
				if (this.codeIndex > Number(this.maxlength)) {
					//输入完成
					this.$emit('finish', this.codeArr.join(''));
				}
			}
		}
	};
</script>

<style lang="scss">
	.code-area {
		text-align: center;

		.flex-box {
			display: flex;
			flex-wrap: wrap;
			position: relative;
			justify-content: center;
		}

		.item {
			position: relative;
			width: 100rpx;
			height: 100rpx;
			margin-right: 54rpx;
			font-size: 36rpx;

			color: #fff;
			line-height: 100rpx;
			box-sizing: border-box;
			border: 1rpx solid #fff;
			border-radius: 6rpx;
		}

		.item:last-child {
			margin-right: 0;
		}

		// .active {
		// 	border-color: #ff4b4b;
		// }
		.active .line {
			display: block;
		}

		.line {
			display: none;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 3rpx;
			height: 60rpx;
			background: #64BCCC;
			animation: twinkling 1s infinite ease;
		}

		.hide-input {
			position: absolute;
			top: 0;
			left: -100%;
			width: 200%;
			height: 100%;
			text-align: left;
			z-index: 9;
			opacity: 1;

		}

		@keyframes twinkling {
			0% {
				opacity: 0.2;
			}

			50% {
				opacity: 1;
			}

			100% {
				opacity: 0.2;
			}
		}

		.dot {
			font-size: 80rpx;
			line-height: 40rpx;
		}
	}
</style>
