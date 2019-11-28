<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">发布任务</view>
		</nav-bar>
		<view style="margin-top: 10rpx;"></view>

		<data-input :inputHidden="aptitudesStatus" v-model="title" :hiddenIcon="true" title="任务名称"></data-input>

		<data-input :inputHidden="aptitudes" v-model="title" :hiddenIcon="true" title="任务接受者所需证书"></data-input>

		<data-textarea :inputHidden="aptitudesStatus" v-model="taskInfo" :hiddenIcon="true" title="和接收者共享的文件"></data-textarea>

		<view>
			<view class="uploding-img" v-if="imgList.length == 0">
				<image src="/static/image/icon/icon_pzsc.png" mode="aspectFit"></image>
			</view>
		</view>

		<data-input :inputHidden="aptitudesStatus" v-model="remark" :hiddenIcon="true" title="特别提醒"></data-input>

		<view class="bottom-btn">
			<next-btn @click="nextBtn"></next-btn>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'
	import ChoiceInput from '@/components/dataInput/ChoiceInput.vue'
	import DataTextarea from '@/components/dataInput/DataTextarea.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'

	import uniPopup from '@/components/uni-popup/uni-popup.vue'

	export default {
		name: 'summary',
		components: {
			navBar,
			DataInput,
			ChoiceInput,
			uniPopup,
			DataTextarea,
			NextBtn
		},
		data() {
			return {
				title: '',
				formType: '',
				aptitudes: '翻译证书',
				aptitudesCurr: -1,
				aptitudesStatus: false,

				remark: '',

				imgList: [],
			}
		},
		methods: {
			nextBtn() {
				console.log('下一步')
			},

			changeAts(index) {
				this.aptitudesCurr = index
			},

			choiceAptitudes(item) {
				this.aptitudes = item.name
				this.aptitudesStatus = false
			},

			changePopup(e) {
				if (!e.show) {
					this.aptitudesStatus = false
				}
			},

			openAts() {
				this.aptitudesStatus = true
			},

			navBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.back-icon {
		position: absolute;
		left: 0;
		padding: 10rpx 29rpx;
		width: 33rpx;
		height: 33rpx;
	}

	.view-title {
		color: #333333;
		font-size: 36rpx;
		font-weight: normal;
	}

	.aptitudes-list {
		border-radius: 40rpx 40rpx 0 0;
		overflow: hidden;
		background-color: #FFF;
		color: #333333;
		font-size: 36rpx;
		text-align: center;
		line-height: 120rpx;
	}

	.aptitudes-border {
		border-bottom: 1rpx solid $group-color-border;
	}

	.no-border {
		border: none;
	}

	.curr-box {
		background-color: #F2F5F7;
	}

	.bottom-popup-box {
		color: #999999;
		border-top: 20rpx solid $group-color-search;
		border-bottom: none;
	}

	.bottom-btn {
		margin-top: 80rpx;
	}

	.uploding-img {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 220rpx;
		width: 690rpx;
		background-color: $group-color-search;
		border-radius: 4rpx;
	}
</style>
