<template>
	<view class="functionBox">
		<text class="areaCode" @click="changeCode">
			{{areaCode}}
		</text>
		<input type="number" v-model="phoneNumber" @blur="changeNumber" placeholder="输入手机号码" maxlength="11" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				areaCode: '+86',
				phoneNumber: '',
			}
		},
		methods: {
			changeNumber() {
				this.$emit('changeInput', this.phoneNumber)
			},
			changeCode() {
				if (this.areaCode == '+86') {
					this.areaCode = '+61'
				} else {
					this.areaCode = '+86'
				}
				this.$emit('changeCode',this.areaCode)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.functionBox {
		position: relative;
		margin: 70rpx 0 0 90rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		border: 1rpx solid #FFFFFF;
		width: 570rpx;
		height: 102rpx;
		font-size: 36rpx;
		line-height: 36rpx;
		color: #FFFFFF;

		input {
			position: absolute;
			left: 183rpx;
			top: 50%;
			margin-top: -0.7rem;
			display: inline-block;
		}
	}

	.areaCode {
		position: absolute;
		left: 30rpx;
		top: 50%;
		margin-top: -18rpx;
	}
</style>
