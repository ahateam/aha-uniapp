<template>
	<view>
		<nav-bar :back="false">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">翻译</view>
		</nav-bar>
		<view style="margin-top: 10rpx;"></view>

		<data-input :inputHidden="inputHidden" :value="taskType" disabled hiddenIcon title="任务分类"></data-input>

		<data-input :inputHidden="inputHidden" v-model="title" hiddenIcon title="任务名称"></data-input>

		<data-input :inputHidden="inputHidden" v-model="much" hiddenIcon title="页数" type="number"></data-input>

		<view class="flex-box language-box">
			<view class="flex-box text-box" @click="chioceLanguage(0)">
				{{fromLanguage}}
				<image src="/static/image/icon/addTask/icon_gd.png" mode="aspectFit"></image>
			</view>
			<view class="change-img flex-box" @click="changeImg">
				<image src="/static/image/icon/addTask/icon_zh.png" mode="aspectFit"></image>
			</view>
			<view class="flex-box text-box" @click="chioceLanguage(1)">
				{{toLanguage}}
				<image src="/static/image/icon/addTask/icon_gd.png" mode="aspectFit"></image>
			</view>
		</view>

		<choice-input :value="aptitudes" title="任务接收者所需资质" hiddenIcon @click="openAts"></choice-input>

		<data-textarea :inputHidden="inputHidden" v-model="taskInfo" hiddenIcon title="任务描述"></data-textarea>

		<data-input :inputHidden="inputHidden" v-model="remark" hiddenIcon title="特别提醒"></data-input>

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

		<uni-popup :show="translateShow" type="center" @change="changePopup">
			<view style="background-color: #FFFFFF;padding: 1rpx;">
				<picker-view class="choice-language" :value="value" :indicator-style="indicatorStyle" @change="bindChange">
					<picker-view-column>
						<view class="choice-box" v-for="(list,idx) in languages" :key="idx">{{list.languageName}}</view>
					</picker-view-column>
				</picker-view>
				<button class="popup-btn" @click="changeLg">确定</button>
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
		name: 'translate',
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
					return this.$store.state.task.taskInfo.taskName
				},
				set(value) {
					this.$store.commit('updateTitle', value)
				}
			},

			aptitudes() {
				return this.$store.state.task.taskInfo.qualName
			},

			taskInfo: {
				get() {
					return this.$store.state.task.taskInfo.taskDescribe
				},
				set(value) {
					this.$store.commit('updateTaskDescribe', value)
				}
			},

			remark: {
				get() {
					return this.$store.state.task.taskInfo.otherDescribe
				},
				set(value) {
					this.$store.commit('updateOtherDescribe', value)
				}
			},

			much: {
				get() {
					return this.$store.state.task.taskInfo.pageNumber
				},
				set(val) {
					this.$store.commit('updatePageNumber', val)
				}
			},

			aptitudesList() {
				return this.$store.state.task.qualiList
			}
		},
		data() {
			return {
				taskType: '翻译',
				aptitudesCurr: -1,
				aptitudesStatus: false, //input是否隐藏

				fromLanguage: '英语',
				toLanguage: '韩语',

				translateShow: false,
				transChioce: 0,
				languages: [],
				inputHidden: false,
				indicatorStyle: `height: ${uni.upx2px(120)}px;`,

				value: [0],
				leftValue: [3],
				rightValue: [5],
				choiceCurr: 0,

				getNumber: 0
			}
		},
		methods: {
			nextBtn() {
				if (this.$store.state.task.taskInfo.taskName && this.$store.state.task.taskInfo.taskDescribe && this.$store.state.task
					.taskInfo.pageNumber &&
					this.$store.state.task.taskInfo.otherDescribe) {
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

			bindChange(e) {
				this.choiceCurr = e.detail.value[0]
				console.log(e)
			},

			changeLg() {
				if (this.transChioce == 0) {
					this.fromLanguage = this.languages[this.choiceCurr].languageName
					this.leftValue.splice(0, 1, this.choiceCurr)
					this.$store.commit('updateOldLanguage', this.fromLanguage)
				} else {
					this.toLanguage = this.languages[this.choiceCurr].languageName
					this.rightValue.splice(0, 1, this.choiceCurr)
					this.$store.commit('updateNewLanguage', this.toLanguage)
				}
				this.translateShow = false
				this.inputHidden = false
			},

			chioceLanguage(e) {
				if (e == 0) {
					this.value = this.leftValue
					this.choiceCurr = this.leftValue[0]
				} else {
					this.value = this.rightValue
					this.choiceCurr = this.rightValue[0]
				}
				this.inputHidden = true
				this.translateShow = true
				this.transChioce = e
			},

			colsePopup() {
				this.translateShow = false
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
					this.translateShow = false
					this.inputHidden = false
				}
			},

			openAts() {
				this.aptitudesStatus = true
				this.inputHidden = true
			},

			navBack() {
				uni.navigateBack()
			},

			changeImg() {
				let f = ''
				f = this.fromLanguage
				this.fromLanguage = this.toLanguage
				this.toLanguage = f
				this.$store.commit('updateOldLanguage', this.fromLanguage)
				this.$store.commit('updateNewLanguage', this.toLanguage)
			},

			getLanguage(cnt) {
				this.$api.getLanguage(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						this.languages = this.$util.tryParseJson(res.data.c)
					} else {
						setTimeout(() => {
							if (this.getNumber == 3) {
								uni.showToast({
									title: '服务器错误！',
									icon: 'none'
								})
								return
							}
							let cnt = {
								// languageId: languageId, // Long <选填> 语种编号
								// languageName: languageName, // String 语种名称
								count: 100, // Integer 
								offset: 0, // Integer 
							}
							this.getLanguage(cnt)
							this.getNumber += 1
						}, 500)
					}
				})
			},
		},

		onLoad() {
			let cnt = {
				// languageId: languageId, // Long <选填> 语种编号
				// languageName: languageName, // String 语种名称
				count: 100, // Integer 
				offset: 0, // Integer 
			}
			this.getLanguage(cnt)
			this.$store.commit('updateOldLanguage', '英语')
			this.$store.commit('updateNewLanguage', '韩语')
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
		border: none !important;
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

	.change-img {
		border: 1rpx solid $group-color-befor;
		border-radius: 25rpx;
		margin: 40rpx 100rpx 30rpx;
		padding: 12rpx 25rpx;

		image {
			width: 31rpx;
			height: 26rpx;
		}
	}

	.language-box {
		color: $group-color;
		font-size: 32rpx;
	}

	.text-box {
		image {
			width: 13rpx;
			height: 8rpx;
			margin-left: 10rpx;
		}
	}

	.flex-box {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.choice-language {
		height: 602rpx;
		width: 600rpx;
		border-radius: 25rpx;
		background-color: $group-color-w;
		text-align: center;
	}

	.choice-box {
		line-height: 120rpx;
		box-sizing: border-box;
		width: 100%;
		color: #666666;
		font-size: $group-font-befor;
	}

	.popup-btn {
		display: block;
		margin: 40rpx auto;
		line-height: 80rpx;
		width: 516rpx;
		background-color: #00C8BE;
		border-radius: 4rpx;
		color: $group-color-w;

		&:after {
			border: none;
		}
	}
</style>
