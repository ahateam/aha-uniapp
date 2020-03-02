<template>
	<view>
		<nav-bar :back="false" v-if="!imgUrl">
			<image slot="left" class="back-icon" src="/static/image/icon/icon_fh.png" mode="aspectFit" @click="navBack"></image>
			<view class="view-title">任务总览</view>
			<view slot="right" class="save-Btn" @click="saveData">保存</view>
		</nav-bar>

		<view class="head-box" @click="upLoadImg">
			<view class="head-change" v-if="headSrc == ''"><image src="/static/image/icon/icon_pzsc.png" mode="aspectFit"></image></view>
			<image class="head-img" :src="constData.oss + headSrc" mode="aspectFill" v-else></image>
			<view class="head-text">更换头像</view>
		</view>

		<view class="content-List">
			<view class="content-box" @click="showName = true">
				<view class="left-box">昵称</view>
				<view class="right-box">
					<text v-if="userInfo.userName">{{ userInfo.userName }}</text>
					<text class="no-data-text" v-else>请输入</text>
					<image :hidden="showName" src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showSex = true">
				<view class="left-box">性别</view>
				<view class="right-box">
					<text v-if="userInfo.sex">{{ userInfo.sex }}</text>
					<text class="no-data-text" v-else>请选择</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="timeChange">
				<view class="left-box">生日</view>
				<view class="right-box">
					<text v-if="userInfo.brithday">{{ userInfo.brithday }}</text>
					<text class="no-data-text" v-else>请选择</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showSchool = true">
				<view class="left-box">所在学校</view>
				<view class="right-box">
					<text v-if="userInfo.school">{{ userInfo.school }}</text>
					<text class="no-data-text" v-else>请输入</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showMarn = true">
				<view class="left-box">MARN号</view>
				<view class="right-box">
					<text v-if="userInfo.marnNumber">{{ userInfo.marnNumber }}</text>
					<text class="no-data-text" v-else>请输入</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showFier = true">
				<view class="left-box">FIER号</view>
				<view class="right-box">
					<text v-if="userInfo.fierNumber">{{ userInfo.fierNumber }}</text>
					<text class="no-data-text" v-else>请输入</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showNaati = true">
				<view class="left-box">NAATI</view>
				<view class="right-box">
					<text v-if="userInfo.naatiNumber">{{ userInfo.naatiNumber }}</text>
					<text class="no-data-text" v-else>请输入</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">注册手机号</view>
				<view class="right-box">
					<text>{{ tel }}</text>
					<image src="/static/image/icon/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<uni-popup :show="showName" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newName" placeholder="请输入昵称" placeholder-style="color:#B6C4D2;" />
					<button class="name-btn" @click="changeName">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showSchool" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newSchool" placeholder="请输入学校名" placeholder-style="color:#B6C4D2;" />
					<button class="name-btn" @click="changeSchool">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showMarn" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newMarn" placeholder="请输入MARN号" placeholder-style="color:#B6C4D2;" />
					<button class="name-btn" @click="changeMarn">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showFier" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newFier" placeholder="请输入Fier" placeholder-style="color:#B6C4D2;" />
					<button class="name-btn" @click="changeFier">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showNaati" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newNaati" placeholder="请输入NAATI号" placeholder-style="color:#B6C4D2;" />
					<button class="name-btn" @click="changeNaati">确定</button>
				</view>
			</uni-popup>

			<uni-popup :show="showSex" type="bottom" :mask-click="true" @change="change">
				<view class="sex-list">
					<view class="sex-border" @click="choiceSex(1)">男</view>
					<view @click="choiceSex(0)">女</view>
				</view>
			</uni-popup>

			<sen-set-picker ref="setpicker" @colseBox="quxiaobutton" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></sen-set-picker>
		</view>

		<kps-image-cutter @ok="onok" @cancel="oncancle" @restart="restart" :url="imgUrl" :fixed="false" :width="300" :height="300"></kps-image-cutter>
	</view>
</template>

<script>
import navBar from '@/components/zhouWei-navBar/index.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import senSetPicker from '@/components/sen-pickerview/picker-view-set.vue';
import KpsImageCutter from '@/components/ksp-image-cutter/ksp-image-cutter.vue';

export default {
	name: 'userData',
	components: {
		navBar,
		uniPopup,
		senSetPicker,
		KpsImageCutter
	},

	data() {
		const currentDate = this.getDate({
			format: true
		});
		return {
			constData: this.$constData,
			imgUrl: '',

			headSrc: '',
			showName: false,
			newName: '',
			showSex: false,
			showBirth: false,
			showSchool: false,
			newSchool: '',
			inputValue: currentDate,
			shixian: false,
			userInfo: {},
			tel: '',

			showMarn: false,
			newMarn: '',

			showFier: false,
			newFier: '',

			showNaati: false,
			newNaati: ''
		};
	},
	methods: {
		restart() {
			let a = '';
			a = this.imgUrl;
			this.imgUrl = '';
			setTimeout(() => {
				this.imgUrl = a;
			}, 10);
		},

		onok(ev) {
			uni.showLoading({
				title: '上传中...'
			});
			this.imgUrl = '';
			let e = ev.path;
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
			let tiemr = new Date();
			let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
			let str = e.substr(e.lastIndexOf('.'));
			let nameStr = userInfo.userId + '/' + address + tiemr.getTime() + str;
			this.upLoadOss(e, nameStr);
		},
		oncancle() {
			// url设置为空，隐藏控件
			this.imgUrl = '';
		},

		getBirthday(date) {
			let time = new Date(date);
			// console.log(time)
			if (time) {
				let y = time.getFullYear();
				let m = time.getMonth() * 1 + 1;
				let d = time.getDate();
				return `${y}-${m}-${d}`;
			} else {
				return date;
			}
		},

		upLoadImg() {
			let userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
			let tiemr = new Date();
			let address = tiemr.getFullYear() + '' + (tiemr.getMonth() + 1) + '' + tiemr.getDate() + '/';
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: res => {
					let imageSrc = res.tempFilePaths[0];
					this.imgUrl = imageSrc;
				}
			});
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
					key: nameStr,
					policy: 'eyJleHBpcmF0aW9uIjoiMjAzMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
					OSSAccessKeyId: 'LTAI4FqngBZhahjCXBPUDwSu',
					success_action_status: '200',
					//让服务端返回200,不然，默认会返回204
					signature: 'Wf9Vmi5iwd2rmEH26ERwh8qnVd4='
				},
				success: res => {
					console.log(res);
					uni.hideLoading();
					uni.showToast({
						title: '上传成功',
						icon: 'success',
						duration: 1000
					});
					//只管这个变量
					this.headSrc = nameStr;
					console.log(this.headSrc);
				},
				fail: err => {
					console.log('uploadImage fail', err);
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
				}
			});
		},

		changeName() {
			this.userInfo.userName = this.newName;
			this.showName = false;
		},

		changeSchool() {
			this.userInfo.school = this.newSchool;
			this.showSchool = false;
		},

		changeMarn() {
			this.userInfo.marnNumber = this.newMarn;
			this.showMarn = false;
		},

		changeFier() {
			this.userInfo.fierNumber = this.newFier;
			this.showFier = false;
		},

		changeNaati() {
			this.userInfo.naatiNumber = this.newNaati;
			this.showNaati = false;
		},

		choiceSex(e) {
			if (e == 0) {
				this.userInfo.sex = '女';
			} else {
				this.userInfo.sex = '男';
			}
			this.showSex = false;
		},

		change(e) {
			if (!e.show) {
				this.showName = false;
				this.showSex = false;
				this.showBirth = false;
				this.showSchool = false;
				this.showMarn = false;
				this.showFier = false;
				this.showNaati = false;
			}
		},

		navBack() {
			uni.navigateBack();
		},

		timeChange() {
			this.$refs.setpicker.confirm(this.inputValue);
			this.shixian = true;
		},
		quxiaobutton() {
			this.shixian = false;
		},
		quedingbutton(bangdingyear, bangdingmonth, bangdingday) {
			this.shixian = false;
			this.inputValue = bangdingyear + '-' + bangdingmonth + '-' + bangdingday;
			this.userInfo.brithday = this.inputValue;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			} else if (type === 'now') {
				year = year;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;

			return `${year}-${month}-${day}`;
		},

		saveData() {
			if (this.userInfo.userName == '') {
				uni.showToast({
					title: '请填写你的昵称',
					icon: 'none'
				});
			} else {
				let cnt = {
					userId: this.userInfo.userId, // Long 用户编号
					userName: this.userInfo.userName // String 用户名
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
				};
				if (this.userInfo.brithday) {
					cnt.brithday = `${this.userInfo.brithday} 00:00:00`;
				}

				if (this.userInfo.sex) {
					cnt.sex = this.userInfo.sex;
				}

				if (this.userInfo.school) {
					cnt.school = this.userInfo.school;
				}

				if (this.headSrc) {
					cnt.userHead = this.headSrc;
				}

				if (this.userInfo.fierNumber) {
					cnt.fierNumber = this.userInfo.fierNumber;
				}

				if (this.userInfo.marnNumber) {
					cnt.marnNumber = this.userInfo.marnNumber;
				}

				if (this.userInfo.naatiNumber) {
					cnt.naatiNumber = this.userInfo.naatiNumber;
				}

				this.$api.updateUser(cnt, res => {
					if (res.data.rc == this.$util.RC.SUCCESS) {
						if (this.headSrc) {
							this.userInfo.userHead = this.headSrc;
						}
						let userInfo = JSON.stringify(this.userInfo);
						uni.setStorageSync('userInfo', userInfo);

						uni.switchTab({
							url: '/pages/user/user'
						});
					} else {
						console.log('error');
					}
				});
			}

			// uni.switchTab({
			// 	url: '/pages/user/user'
			// })
			// uni.showToast({
			// 	title: '保存成功！'
			// })
		},

		getNavHeight() {
			return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px';
		}
	},
	onLoad() {
		this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		this.userInfo.brithday = this.getBirthday(this.userInfo.brithday);
		this.tel = this.userInfo.phone.substr(2);
	}
};
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
	background-color: #f2f5f7;
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
	background-color: #f6f6f6;
	height: 110rpx;
	padding: 0 20rpx;
	color: #333333;

	input {
		flex: 1;
		background-color: #fdfdfd;
		padding: 0 20rpx;
		height: 70rpx;
		line-height: 70rpx;
		font-size: $group-font-befor;
	}
}

.name-btn {
	line-height: 60rpx;
	padding: 0 15rpx;
	font-size: $group-font-befor;
	color: $group-color-w;
	background-color: #00c8be;
	border-radius: 6rpx;
	margin: 0 0 0 20rpx;

	&:after {
		border: none;
	}
}

.sex-list {
	border-radius: 40rpx 40rpx 0 0;
	background-color: #fff;
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

.no-data-text {
	color: $group-color-befor;
}
</style>
