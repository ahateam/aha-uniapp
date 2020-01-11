<template>
	<view>
		<nav-bar :back="false" v-if="!imgUrl">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">创建合同</view>
		</nav-bar>

		<data-input :inputHidden="onshoreShow" title="客户姓名" hiddenIcon v-model="clientName" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="副申请人姓名" hiddenIcon v-model="deputyApplicantName" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="客户家庭住址" hiddenIcon v-model="address" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="客户电话" hiddenIcon v-model="phone" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="学生的E-Mail地址" hiddenIcon v-model="interEmail" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="申请签证类别" hiddenIcon v-model="visasType" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="合同金额" hiddenIcon v-model="contractMoney" type="number" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="第一次金额" hiddenIcon v-model="oneMoney" type="number" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="第二次金额" hiddenIcon v-model="twoMoney" type="number" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="行政管理费" hiddenIcon v-model="adminMoney" type="number" placeholder="输入内容"></data-input>
		<data-input :inputHidden="onshoreShow" title="申请人所在地" hiddenIcon v-model="onAddress" placeholder="输入内容"></data-input>
		<choice-input :value="onshore" title="是否境外" :hiddenIcon="true" @click="onshoreShow = true"></choice-input>

		<view class="center-box">
			<image src="/static/image/icon/icon_zjqt.png" mode="aspectFit" @click="addCollectionItems"></image>增加其他代收项目
		</view>
		<view style="margin-bottom: 30rpx;">
			<view v-for="(item,index) in collectionItems" :key="index">
				<data-input :inputHidden="onshoreShow" title="项目名称" hiddenIcon v-model="item.name" placeholder="输入内容"></data-input>
				<data-input :inputHidden="onshoreShow" title="金额(AUD)" hiddenIcon v-model="item.price" placeholder="输入内容"></data-input>
			</view>
		</view>

		<next-btn title="确认" @click="createContract"></next-btn>

		<uni-popup :show="onshoreShow" type="bottom" @change="changePopup">
			<view class="aptitudes-list">
				<view class="aptitudes-border" :class="[{'no-border':index == shoreList.length - 2},{'bottom-popup-box':index == shoreList.length - 1},{'curr-box':index == aptitudesCurr}]"
				 @click="choiceAptitudes(item,index)" v-for="(item,index) in shoreList" :key="index" @touchstart="changeAts(index)"
				 @touchend="aptitudesCurr = -1">{{item.name}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import DataInput from '@/components/dataInput/DataInput.vue'
	import NextBtn from '@/components/NextBtn/NextBtn.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import ChoiceInput from '@/components/dataInput/ChoiceInput.vue'

	export default {
		components: {
			navBar,
			DataInput,
			NextBtn,
			uniPopup,
			ChoiceInput
		},
		data() {
			return {
				userInfo: {},
				toUserId: '',

				clientName: '',
				deputyApplicantName: '',
				address: '',
				interEmail: '',
				visasType: '',
				contractMoney: '',
				onAddress: '',
				oneMoney: '',
				twoMoney: '',
				phone: '',
				onshore: '境内',

				shoreList: [{
						name: '境内'
					},
					{
						name: '澳洲境外'
					},
					{
						name: '取消'
					}
				],
				onshoreShow: false,
				aptitudesCurr: -1,

				collectionItems: [{
					name: '',
					price: ''
				}]
			}
		},
		methods: {
			changePopup(e) {
				if (!e.show) {
					this.onshoreShow = false
				}
			},

			choiceAptitudes(item, index) {
				if (index != this.shoreList.length - 1) {
					this.onshore = item.name
				}
				this.onshoreShow = false
			},

			changeAts(index) {
				this.aptitudesCurr = index
			},

			createContract() {
				// &&this.
				if (this.clientName && this.address && this.phone && this.onAddress && this.visasType && this.contractMoney &&
					this.onshore && this.oneMoney && this.adminMoney && this.twoMoney && this.interEmail && this.onAddress) {
					let cnt = {
						intermediaryId: this.userInfo.userId, // Long 中介编号
						studentId: this.toUserId, // Long 学生编号
						clientName: this.clientName, // String 当事人姓名
						// deputyApplicantName: deputyApplicantName, // String <选填> 副申请人姓名
						intermediary: this.userInfo.accountName, // String 中介姓名
						address: this.address, // String 家庭住址
						phone: this.phone, // String 手机号
						Email: this.userInfo.email, // String Email地址
						interEmail: this.interEmail, // String <选填> 学生Email地址
						onAddress: this.onAddress, // String onAddress 申请时申请人所在地（？？？？）
						onshore: this.onshore, // String 境内/澳洲境外
						visasType: this.visasType, // String 申请签证类型
						contractMoney: this.contractMoney, // Double 合同金额
						oneMoney: this.oneMoney, // Double 第一次金额
						adminMoney: this.adminMoney, // Double 行政管理金额
						twoMoney: this.twoMoney, // Double 第二次金额
						contractType: this.$constData.contractType[0].key, // Byte 合同分类
						// fileUrl: fileUrl, // String <选填> 文件地址
						// collectionItems: this.collectionItems, // JSONArray <选填> 代收项目
						// pier: pier, // String <选填> 咨询师号 PIER
					}

					if (this.deputyApplicantName) {
						cnt.deputyApplicantName = this.deputyApplicantName
					}
					if (this.userInfo.fierNumber) {
						cnt.pier = this.userInfo.fierNumber
					}

					if (this.collectionItems[0].name && this.collectionItems[0].price) {
						for (let i = 0; i < this.collectionItems.length; i++) {
							if (!this.collectionItems[i].name || !this.collectionItems[i].price) {
								this.collectionItems.splice(i, 1)
							}
						}
						cnt.collectionItems = this.collectionItems
					}
					this.updateContract(cnt)
					// this.createContractApi(cnt)
				} else {
					uni.showToast({
						title: '请将信息输入完整',
						icon: 'none'
					})
				}

			},

			updateContract(cnt) {
				this.$store.commit('updateContract', cnt)
				uni.navigateTo({
					url: './toAtutograph'
				})
			},

			createContractApi(cnt) {
				this.$api.createContract(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						let id = this.$util.tryParseJson(res.data.c).conId
						let cnt1 = {
							id: id, // Long 编号
							interautoImg: 'http://durian-file.oss-ap-southeast-2.aliyuncs.com/403022498109672/autograph/test.png', // String <选填> 中介签名图片地址
							// studentautoImg: studentautoImg, // String <选填> 学生签名图片地址
						}
						this.setpPDF(cnt1)
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			setpPDF(cnt) {
				this.$api.setpPDF(cnt, (res) => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						uni.navigateBack()
						uni.showToast({
							title: '合同生成后会自动发送',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: res.data.rm,
							icon: 'none'
						})
					}
				})
			},

			addCollectionItems() {
				this.collectionItems.push({
					name: '',
					price: ''
				})
			},
			navBack() {
				uni.navigateBack()
			}
		},
		onLoad() {
			this.toUserId = uni.getStorageSync('toUserId')
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
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

	.center-box {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #00C8BE;
		font-size: 30rpx;
		line-height: 42rpx;
		padding-top: 30rpx;
		margin-top: 30rpx;
		border-top: 20rpx solid #f9f9f9;

		image {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
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
