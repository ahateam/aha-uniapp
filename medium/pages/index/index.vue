<template>
	<view>
		<view class="nav-bar" :style="{'height':navHeight}"></view>
		<view :style="{'padding-top':navHeight}"></view>
		<view class="view-title">发布任务</view>

		<view class="content-list">
			<view class="list-box" :class="{'curr-box':currIndex == index}" v-for="(item,index) in taskList" :key="index"
			 @touchstart="changeCurr(index)" @touchend="resetStyle()" @click="navToAdd(item)">
				<image :src="item.img" mode="aspectFit"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		name: 'index',

		data() {
			return {
				navHeight: this.getNavHeight(),
				taskList: this.$constData.taskType,
				currIndex: -1,
				userInfo: ''
			}
		},
		watch:{
			isSDKReady(newVal){
				if(newVal){
					this.getUserProfile()
				}
			}
		},
		...mapState({
			isLogin: state => state.user.isLogin,
			isSDKReady: state => state.user.isSDKReady,
		}),
		methods: {
			getNavHeight() {
				return 44 + uni.getSystemInfoSync()['statusBarHeight'] + 'px'
				uni.getStorageSync('userInfo')
			},

			changeCurr(index) {
				this.currIndex = index
			},

			resetStyle() {
				this.currIndex = -1
			},

			navToAdd(item) {
				if (item.src) {
					uni.navigateTo({
						url: item.src,
						success: () => {
							this.$store.commit('reSetStore')
							let icon = plus.nativeObj.View.getViewById("icon");
							setTimeout(function() {
								icon.hide();
							}, 100);
						}
					})
				}
				this.$store.commit('updataType', item.key)
			},
			//获取tim个人信息--并初次更新用户信息
			getUserProfile() {
				let promise = this.tim.getMyProfile();
				promise.then((res) => {
					if (res.data.nick == '') {
						let promise = this.tim.updateMyProfile({
							nick: this.userInfo.userName,
							avatar: this.userInfo.userHead,
							gender: this.TIM.TYPES.GENDER_MALE,
							selfSignature: '这个人很懒...',
							allowType: this.TIM.TYPES.ALLOW_TYPE_ALLOW_ANY,
							role: this.userInfo.userType
						});
						promise.then((res1) => {
							console.log('11111111')
							this.$store.commit("updateCurrentUserProfile", res1.data);
						}).catch((err1) => {
						
							console.warn('updateMyProfile error:', err1); // 更新资料失败的相关信息
						});
					} else {
						this.$store.commit("updateCurrentUserProfile", res.data);
					}
				}).catch((err) => {
					console.warn('getMyProfile error:', err); // 获取个人资料失败的相关信息
				});
			},
			//登录tim
			loginTim() {
				this.tim
					.login({
						userID: String(this.userInfo.userId),
						userSig: this.userInfo.userSig
					})
					.then(res => {
						this.$store.commit("toggleIsLogin", true);
						this.$store.commit("startComputeCurrent");
						this.getUserProfile()
					})
					.catch(error => {
						if (!this.$store.state.user.isLogin) {
							setTimeout(() => {
								this.loginTim()
							}, 500)
						}
					});
			},


		},
		onShow() {
			this.$commen.showTabIcon()
		},
		onLoad() {
			this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			let timeOut = Number(this.userInfo.userSigCreateTime) + 604800000
			let timeNow =new Date();
			 timeNow = timeNow.getTime()
			console.log(timeNow)
			if (this.userInfo.userSig && (timeNow < timeOut)) {
				if (!this.$store.state.user.isLogin) {
					this.loginTim();
				}else{
					
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '用户身份失效，请重新登录'
				})
				uni.reLaunch({
					url: '../login/mobilePassword'
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.view-title {
		color: #333333;
		font-size: 50rpx;
		margin-left: 30rpx;
	}

	.nav-bar {
		position: fixed;
		z-index: 1;
		width: 100%;
		background-color: #FFFFFF;
	}

	.list-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: all .3s;
		width: 330rpx;
		height: 250rpx;
		margin: 0 30rpx 30rpx 0;
		background-color: $group-color-search;
		border-radius: 4rpx;
		font-size: $group-font-befor;
		color: $group-color;
		line-height: 42rpx;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 18rpx;
		}
	}

	.content-list {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 40rpx 0 0 30rpx;
	}

	.curr-box {
		background-color: rgba($color: #182F45, $alpha: .2);
	}
</style>
