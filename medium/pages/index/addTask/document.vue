<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">撰写文书</view>
		</nav-bar>
		<view style="margin-top: 10rpx;"></view>

		<data-input :inputHidden="aptitudesStatus" hiddenIcon disabled value="撰写文书" title="任务分类"></data-input>

		<data-input :inputHidden="aptitudesStatus" v-model="title" hiddenIcon title="任务名称"></data-input>

		<data-input :inputHidden="aptitudesStatus" v-model="formType" hiddenIcon title="文书类别"></data-input>

		<choice-input :value="aptitudes" title="任务接收者所需资质" hiddenIcon @click="openAts"></choice-input>

		<data-textarea :inputHidden="aptitudesStatus" v-model="taskInfo" hiddenIcon placeholder="请输入任务描述" title="任务描述"></data-textarea>

		<data-input :inputHidden="aptitudesStatus" v-model="remark" hiddenIcon title="特别提醒"></data-input>

		<view class="bottom-btn">
			<next-btn @click="nextBtn"></next-btn>
		</view>

		<uni-popup :show="aptitudesStatus" type="bottom" @change="changePopup">
			<view class="aptitudes-list">
				<view class="aptitudes-border" :class="[{'no-border':index == aptitudesList.length - 2},{'bottom-popup-box':index == aptitudesList.length - 1},{'curr-box':index == aptitudesCurr}]"
				 @click="choiceAptitudes(item)" v-for="(item,index) in aptitudesList" :key="index" @touchstart="changeAts(index)"
				 @touchend="aptitudesCurr = -1">{{item.qualName}}</view>
			</view>
		</uni-popup>
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
		name: 'document',
		components: {
			navBar,
			DataInput,
			ChoiceInput,
			uniPopup,
			DataTextarea,
			NextBtn
		},
		computed: {
			title: {
				get() {
					return this.$store.state.taskInfo.taskName
				},
				set(value) {
					this.$store.commit('updateTitle', value)
				}
			},

			formType: {
				get() {
					return this.$store.state.taskInfo.taskCategory
				},
				set(value) {
					this.$store.commit('updateCategory', value)
				}
			},

			aptitudes() {
				return this.$store.state.taskInfo.qualName
			},

			taskInfo: {
				get() {
					return this.$store.state.taskInfo.taskDescribe
				},
				set(value) {
					this.$store.commit('updateTaskDescribe', value)
				}
			},

			remark: {
				get() {
					return this.$store.state.taskInfo.otherDescribe
				},
				set(value) {
					this.$store.commit('updateOtherDescribe', value)
				}
			},

			aptitudesList() {
				return this.$store.state.qualiList
			}
		},
		data() {
			return {
				aptitudesCurr: -1,
				aptitudesStatus: false
			}
		},
		methods: {
			nextBtn() {
				if (this.$store.state.taskInfo.taskName && this.$store.state.taskInfo.taskDescribe &&
					this.$store.state.taskInfo.taskCategory && this.$store.state.taskInfo.otherDescribe) {
					uni.navigateTo({
						url: '../summary/summary'
					})
				} else {
					uni.showToast({
						title: '请将资料填写完整',
						icon: 'none'
					})
				}
			},

			changeAts(index) {
				this.aptitudesCurr = index
			},

			choiceAptitudes(item) {
				this.$store.commit('updateQualifications', item)
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
</style>
