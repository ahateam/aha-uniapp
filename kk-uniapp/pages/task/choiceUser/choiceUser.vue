<template>
	<view>
		<view class="userImg">
			<image :src="data.data.imgSrc" mode="scaleToFill"></image>
		</view>

		<view class="infoNav">
			个人简介：
		</view>

		<view class="userInfo">
			{{data.data.text}}
		</view>
		<view class="btnBox">
			<button class="leftBtn" type="primary" @click="navBack">返回</button>
			<button class="rightBtn" type="primary" @click="navToPay">付款</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				data:{}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getTaskApply()
		},
		methods: {
			//获取页面信息
			getTaskApply() {
				let cnt = {
					id: this.id
				}
				this.$api.getTaskApply(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let arr = this.$util.tryParseJson(res.data.c)
						arr.data = this.$util.tryParseJson(arr.data)
						console.log(arr)
						this.data = arr
					}
				})
			},

			navBack() {
				uni.navigateBack()
			},

			navToPay() {
				uni.navigateTo({
					url: `/pages/task/payView/payView?id=${this.id}&taskId=${this.data.taskId}&type=1`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.userImg {
		width: 100vw;
		height: 56.25vw;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.infoNav {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
	}

	.userInfo {
		padding: $box-margin-top $box-margin-left;
		font-size: $list-title;
		text-indent: 2em;
		color: $list-info-color;
	}

	.btnBox {
		position: fixed;
		height: 2em;
		bottom: $box-margin-top;
		width: 100vw;

		button {
			width: 29%;
			font-size: $list-title;
		}
	}

	.leftBtn {
		position: absolute;
		left: 14%;
	}

	.rightBtn {
		position: absolute;
		right: 14%;
	}
</style>
