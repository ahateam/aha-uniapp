<template>
	<view>
		<nav-bar :back="false" type="transparent" fontColor="#333333" title="个人资料">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
			<view slot="right" class="save-Btn" @click="saveData">保存</view>
		</nav-bar>
		<view :style="{'padding-top': getNavHeight()}"></view>

		<view class="head-box" @click="upLoadImg">
			<view class="head-change" v-if="headSrc == ''">
				<image src="/static/image/user/icon_xj.png" mode="aspectFit"></image>
			</view>
			<image class="head-img" :src="headSrc" mode="aspectFill" v-else></image>
			<view class="head-text">更换头像</view>
		</view>

		<view class="content-List">
			<view class="content-box" @click="showName = true">
				<view class="left-box">昵称</view>
				<view class="right-box">
					<text>{{userInfo.userName}}</text>
					<image :hidden="showName" src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showSex = true">
				<view class="left-box">性别</view>
				<view class="right-box">
					<text>{{userInfo.sex}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="timeChange">
				<view class="left-box">生日</view>
				<view class="right-box">
					<text>{{userInfo.brithday}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showSchoolBox">
				<view class="left-box">所在学校</view>
				<view class="right-box">
					<text>{{userInfo.school}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">注册手机号</view>
				<view class="right-box">
					<text>{{userInfo.phone}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<uni-popup :show="showName" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newName" placeholder="请输入昵称" />
					<button class="name-btn" @click="changeName">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showSchool" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newSchool" placeholder="请输入学校名" />
					<button class="name-btn" @click="changeSchool">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showSex" type="bottom" :mask-click="true" @change="change">
				<view class="sex-list">
					<view class="sex-border" @click="choiceSex(1)">男</view>
					<view @click="choiceSex(0)">女</view>
				</view>
			</uni-popup>

			<sen-set-picker ref="setpicker" @colseBox="quxiaobutton" :shixian="shixian" @quxiaoButton="quxiaobutton"
			 @quedingButton="quedingbutton"></sen-set-picker>
		</view>
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import senSetPicker from '@/components/sen-pickerview/picker-view-set.vue'

	export default {
		name: 'userData',
		components: {
			navBar,
			uniPopup,
			senSetPicker
		},

		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				headSrc: '',
				showName: false,
				newName: '',
				showSex: false,
				showBirth: false,
				showSchool: false,
				newSchool: '',
				showTel: false,
				inputValue: currentDate,
				shixian: false,
				userInfo: {},
			}

		},
		methods: {
			getBirthday(date) {
				let time = new Date(date)
				// console.log(time)
				if (time) {
					let y = time.getFullYear()
					let m = time.getMonth() * 1 + 1
					let d = time.getDate()
					return `${y}-${m}-${d}`
				} else {
					return date
				}

			},

			upLoadImg() {
				let tiemr = new Date()
				let address = tiemr.getFullYear() + "" + (tiemr.getMonth() + 1) + "" + tiemr.getDate()
				address = 'image/' + address + '/'
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						let imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = address + tiemr.getTime() + str
						// nameStr =  res.tempFilePaths[0]
						console.log(nameStr)
						uni.showLoading({
							title: '上传中'
						})
						this.upLoadOss(imageSrc, nameStr)
					},
					fail: (err) => {
						uni.showToast({
							title: '已取消',
							icon: 'none'
						})
					}
				})
			},

			// 上传至oss
			upLoadOss(imageSrc, nameStr) {
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
						this.headSrc = 'https://weapp-xhj.oss-cn-hangzhou.aliyuncs.com/' + nameStr
						console.log(this.headSrc)
					},
					fail: (err) => {
						console.log('uploadImage fail', err);
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						})
					}
				})
			},

			changeName() {
				this.userInfo.userName = this.newName
				this.showName = false
			},

			changeSchool() {
				this.userInfo.school = this.newSchool
				this.showSchool = false
			},

			choiceSex(e) {
				if (e == 0) {
					this.userInfo.sex = '女'
				} else {
					this.userInfo.sex = '男'
				}
				this.showSex = false
			},

			showSchoolBox() {
				this.showSchool = true
				console.log(this.$refs)
			},

			change(e) {
				if (!e.show) {
					this.showName = false
					this.showSex = false
					this.showBirth = false
					this.showSchool = false
					this.showTel = false
				}
			},

			navBack() {
				uni.navigateBack()
			},

			timeChange() {
				this.$refs.setpicker.confirm(this.inputValue)
				this.shixian = true;
			},
			quxiaobutton() {
				this.shixian = false
			},
			quedingbutton(bangdingyear, bangdingmonth, bangdingday) {
				this.shixian = false
				this.inputValue = bangdingyear + "-" + bangdingmonth + "-" + bangdingday
				this.userInfo.brithday = this.inputValue
			},
			getDate(type) {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()

				if (type === 'start') {
					year = year - 60
				} else if (type === 'end') {
					year = year + 2
				} else if (type === 'now') {
					year = year
				}
				month = month > 9 ? month : '0' + month
				day = day > 9 ? day : '0' + day

				return `${year}-${month}-${day}`
			},

			saveData() {
				if (this.userInfo.userName == '') {
					uni.showToast({
						title: '请填写你的昵称',
						icon: 'none'
					})
				} else {
					let cnt = {
						userId: this.userInfo.userId, // Long 用户编号
						userName: this.userInfo.userName, // String 用户名
						// sex: this.sex, // String 性别
						// brithday: brithday, // Date 出生年月
						// school: this.school, // String 学校
						// accountName: accountName, // String 收款账户名
						// BsbNumber: BsbNumber, // String BSB号
						// account: account, // String 收款账户号
						// email: email, // String 电子邮件
						// marnNumber: marnNumber, // String MARN号
						// fierNumber: fierNumber, // String FIER号
						// naatiNumber: naatiNumber, // String NAATI号
					}
					if (this.userInfo.brithday) {
						cnt.brithday = `${this.userInfo.brithday} 00:00:00`
					}

					if (this.userInfo.sex) {
						cnt.sex = this.userInfo.sex
					}

					if (this.userInfo.school) {
						cnt.school = this.userInfo.school
					}

					if (this.headSrc) {
						cnt.userHead = this.headSrc
					}

					this.$api.updateUser(cnt, (res) => {
						if (res.data.rc == this.$util.RC.SUCCESS) {
							this.userInfo.userHead = this.headSrc
							let userInfo = JSON.stringify(this.userInfo)
							uni.setStorageSync('userInfo', userInfo)

							uni.switchTab({
								url: '/pages/user/user'
							})
						} else {
							console.log('error')
						}
					})
				}


				// uni.switchTab({
				// 	url: '/pages/user/user'
				// })
				// uni.showToast({
				// 	title: '保存成功！'
				// })
			},

			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
			},
		},
		onLoad() {
			this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
			this.userInfo.brithday = this.getBirthday(this.userInfo.brithday)
		}
	}
</script>

<style lang="scss" scoped>
	.icon-fanhui {
		font-size: 33rpx;
		position: absolute;
		color: #587685;
		left: 29rpx;
	}

	.save-Btn {
		color: #587685;
		margin-right: 30rpx;
		font-size: 32rpx;
	}

	.head-box {
		text-align: center;
		color: $group-color;
		font-size: $group-font;
		margin-top: $group-margin-top;
	}

	.head-change {
		margin: 0 auto;
		border-radius: 50%;
		background-color: #F2F5F7;
		width: 120rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 40rpx;
			height: 40rpx;
		}
	}

	.head-text {
		margin-top: 20rpx;
	}

	.content-List {
		padding: 46rpx 40rpx 0;
	}

	.content-box {
		padding: 38rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid $group-color-border;
	}

	.left-box {
		font-size: $group-font-befor;
		color: #999999;
	}

	.right-box {
		display: flex;
		align-items: center;
		font-size: $group-font-befor;
		color: #333333;
		max-width: 375rpx;

		text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		image {
			margin-left: 20rpx;
			width: 21rpx;
			height: 21rpx;
		}
	}

	.name-input {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #F6F6F6;
		height: 110rpx;
		padding: 0 20rpx;

		input {
			background-color: #fdfdfd;
			padding: 0 20rpx;
			height: 80rpx;
			width: 580rpx;
		}
	}

	.name-btn {
		line-height: 80rpx;
		padding: 0 15rpx;
		font-size: $group-font-befor;
		color: $group-color-w;
		background-color: #00C8BE;
		border-radius: 6rpx;
		margin: 0;

		&:after {
			border: none;
		}
	}

	.sex-list {
		border-radius: 40rpx 40rpx 0 0;
		background-color: #FFF;
		color: #333333;
		font-size: 36rpx;
		text-align: center;
		line-height: 120rpx;
	}

	.sex-border {
		border-bottom: 1rpx solid $group-color-border;
	}

	.head-img {
		display: block;
		margin: 0 auto;
		border-radius: 50%;
		width: 120rpx;
		height: 120rpx;
	}
</style>
