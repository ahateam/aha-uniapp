<template>
	<view>
		<nav-bar :back="false" fontColor="#333333" class="nav-box">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
			<view slot="right" class="save-Btn" @click="saveData">保存</view>
		</nav-bar>
		<view :style="{'padding-top': getNavHeight()}"></view>
		<!--设计有修改，废弃
		 <view class="head-box" @click="upLoadImg">
			<view class="head-change" v-if="headSrc == ''">
				<image src="/static/image/user/icon_xj.png" mode="aspectFit"></image>
			</view>
			<image class="head-img" :src="constData.oss + headSrc" mode="aspectFill" v-else></image>
			<view class="head-text">更换头像</view>
		</view> -->

		<view class="content-List">
			<view class="type-tile content-box">个人资料</view>
			<view class="content-box" @click="upLoadImg">
				<view class="left-box">头像</view>
				<view class="head-change right-head" v-if="headSrc == ''">
					<image src="/static/image/user/icon_xj.png" mode="aspectFit"></image>
				</view>
				<image class="head-img right-head" :src="constData.oss + headSrc" mode="aspectFill" v-else></image>
			</view>

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

			<view class="content-box" @click="showSchool = true">
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

			<view class="content-box" @click="showEmail = true">
				<view class="left-box">电子邮箱</view>
				<view class="right-box">
					<text>{{userInfo.email}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="type-tile content-box">
				收款账户
			</view>

			<view class="content-box" @click="showAcName = true">
				<view class="left-box">账户名</view>
				<view class="right-box">
					<text>{{userInfo.accountName}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showBsb = true">
				<view class="left-box">BSB</view>
				<view class="right-box">
					<text>{{userInfo.BsbNumber}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showAccount = true">
				<view class="left-box">账号</view>
				<view class="right-box">
					<text>{{userInfo.account}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
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

		<uni-popup :show="showEmail" type="bottom" :mask-click="true" @change="change">
			<view class="name-input">
				<input type="text" v-model="newEmail" placeholder="请输入电子邮箱" />
				<button class="name-btn" @click="changeEmail">确定</button>
			</view>
		</uni-popup>

		<uni-popup :show="showAcName" type="bottom" :mask-click="true" @change="change">
			<view class="name-input">
				<input type="text" v-model="newAcName" placeholder="请输入账户名" />
				<button class="name-btn" @click="changeAcName">确定</button>
			</view>
		</uni-popup>
		
		<uni-popup :show="showBsb" type="bottom" :mask-click="true" @change="change">
			<view class="name-input">
				<input type="text" v-model="newBsb" placeholder="请输入BSB" />
				<button class="name-btn" @click="changeBsb">确定</button>
			</view>
		</uni-popup>
		
		<uni-popup :show="showAccount" type="bottom" :mask-click="true" @change="change">
			<view class="name-input">
				<input type="text" v-model="newAccount" placeholder="请输入账户名" />
				<button class="name-btn" @click="changeAccount">确定</button>
			</view>
		</uni-popup>

		<sen-set-picker ref="setpicker" @colseBox="quxiaobutton" :shixian="shixian" @quxiaoButton="quxiaobutton"
		 @quedingButton="quedingbutton"></sen-set-picker>
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
				constData: this.$constData,
				userInfo: {},
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
				showEmail: false,
				newEmail: '',
				showAcName: false,
				newAcName: '',
				showAccount: false,
				newAccount: '',
				showBsb: false,
				newBsb: ''
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
				let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'))
				let tiemr = new Date()
				let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (res) => {
						let imageSrc = res.tempFilePaths[0]
						let str = res.tempFilePaths[0].substr(res.tempFilePaths[0].lastIndexOf('.'))
						let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str
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
					url: this.$constData.oss,
					filePath: imageSrc,
					fileType: 'image',
					name: 'file',
					formData: {
						name: nameStr,
						'key': nameStr,
						'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
						'OSSAccessKeyId': 'LTAI4FqngBZhahjCXBPUDwSu',
						'success_action_status': '200',
						//让服务端返回200,不然，默认会返回204
						'signature': '5n38HJgZyzC55khl0sPEf2oATtQ=',
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
						this.headSrc = nameStr
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
			
			changeBsb(){
				this.userInfo.BsbNumber = this.newBsb
				this.showBsb = false
			},
			
			changeAccount(){
				this.userInfo.account = this.newAccount
				this.showAccount = false
			},

			changeAcName() {
				this.userInfo.accountName = this.newAcName
				this.showAcName = false
			},

			changeEmail() {
				this.userInfo.email = this.newEmail
				this.showEmail = false
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

			change(e) {
				if (!e.show) {
					this.showName = false
					this.showSex = false
					this.showBirth = false
					this.showSchool = false
					this.showTel = false
					this.showEmail = false
					this.showAcName = false
					this.showBsb = false
					this.showAccount = false
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
			this.userInfo.phone = this.userInfo.phone.substr(2)
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		position: fixed;
		width: 100%;
		background-color: #FFFFFF;
	}

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

	.right-head {
		position: absolute;
		z-index: -1;
		right: 40rpx;
	}

	.head-change {
		border-radius: 50%;
		background-color: #F2F5F7;
		width: 100rpx;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		image {
			width: 40rpx;
			height: 33rpx;
		}
	}

	.head-text {
		margin-top: 20rpx;
	}

	.content-List {
		padding: 0 40rpx;
	}

	.content-box {
		padding: 39rpx 0 38rpx;
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
		width: 100rpx;
		height: 100rpx;
	}

	.type-tile {
		font-size: 36rpx;
		line-height: 50rpx;
		color: #333333;
		padding: 30rpx 0;
		font-weight: bold;
	}
</style>
