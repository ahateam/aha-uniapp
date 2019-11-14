<template>
	<view>
		<navBar :back="false" type="transparent" fontColor="#587685" title="设置新密码">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
		</navBar>
		<view style="padding-top: 64px;"></view>

		<view v-for="(item,index) in passArr" :key="index">
			<view class="auto-input auto-margin flex-box" :hidden="index == 0&&!oldPass">
				<view class="left-title">
					{{item.name}}
				</view>
				<input type="text" v-model="item.value" :placeholder="item.text" />
			</view>
		</view>
		<view class="auto-margin">
			<button class="submit-btn">提交</button>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'

	export default {
		components: {
			navBar
		},
		data() {
			return {
				passArr: [{
						name: '旧密码',
						text: '',
						value: ''
					},
					{
						name: '新密码',
						text: '密码不少于六位',
						value: ''
					},
					{
						name: '确认密码',
						text: '请再次输入密码',
						value: ''
					}
				],
				oldPass: '',
			}
		},
		methods: {
			navBack() {
				uni.navigateBack()
			}
		},
		onLoad() {
			this.oldPass = 'zxcas56d432'
		}
	}
</script>

<style lang="scss">
	.icon-fanhui {
		font-size: 33rpx;
		color: $group-color;
		position: absolute;
		left: 29rpx;
	}

	.auto-margin {
		margin: 56rpx 40rpx;
	}

	.auto-input {
		height: 102rpx;
		box-sizing: border-box;
		padding: 30rpx;
		border: 1rpx solid $group-color-border;
		border-radius: 6rpx;
		font-size: $group-font-befor;
	}

	.flex-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.left-title {
		color: #666666;
	}

	.submit-btn {
		width: 670rpx;
		background-color: #00C8BE;
		line-height: 100rpx;
		color: $group-color-w;
		font-size: 36rpx;
		border-radius: 6rpx;
		padding: 0;


		&:after {
			border: none;
		}
	}
</style>
