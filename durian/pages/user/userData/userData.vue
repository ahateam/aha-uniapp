<template>
	<view>
		<nav-bar :back="false" type="transparent" fontColor="#333333" title="个人资料">
			<view slot="left" class="iconfont icon-fanhui" @click="navBack"></view>
			<view slot="right" class="save-Btn" @click="saveData">保存</view>
		</nav-bar>
		<view style="padding-top: 64px;"></view>

		<view class="head-box">
			<view class="head-change">
				<image src="/static/image/user/icon_xj.png" mode="aspectFit"></image>
			</view>
			<view class="head-text">更换头像</view>
		</view>

		<view class="content-List">

			<view class="content-box" @click="showName = true">
				<view class="left-box">昵称</view>
				<view class="right-box">
					<text>{{name}}</text>
					<image :hidden="showName" src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="showSex = true">
				<view class="left-box">性别</view>
				<view class="right-box">
					<text>{{sex}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box" @click="timeChange">
				<view class="left-box">生日</view>
				<view class="right-box">
					<text>{{birthday}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">所在学校</view>
				<view class="right-box">
					<text>{{school}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<view class="content-box">
				<view class="left-box">注册手机号</view>
				<view class="right-box">
					<text>{{tel}}</text>
					<image src="/static/image/user/icon_enter.png" mode="aspectFit"></image>
				</view>
			</view>

			<uni-popup :show="showName" type="bottom" :mask-click="true" @change="change">
				<view class="name-input">
					<input type="text" v-model="newName" />
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
	</view>
</template>

<script>
	import navBar from '@/components/zhouWei-navBar/index.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import senSetPicker from '@/components/sen-pickerview/picker-view-set.vue'

	export default {
		name:'userData',
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
				name: '墨尔本来的鱼',
				showName: false,
				newName: '',

				sex: '男',
				showSex: false,

				birthday: '1999-10-10',
				showBirth: false,

				school: '北大青鸟',
				showSchool: false,

				tel: '13426885478',
				showTel: false,

				inputValue: currentDate,
				shixian: false
			}

		},
		methods: {
			choiceSex(e){
				if(e == 0){
					this.sex = '女'
				}else{
					this.sex = '男'
				}
				this.showSex = false
			},
			
			change(e) {
				if (!e.show) {
					this.showName = false
					this.showSex = false
				}
			},

			navBack() {
				uni.navigateBack()
			},
			
			timeChange: function () {
					this.$refs.setpicker.confirm(this.inputValue)
					this.shixian = true;			
			},
			quxiaobutton: function() {
				this.shixian = false
			},
			quedingbutton: function(bangdingyear, bangdingmonth, bangdingday) {
				this.shixian = false
				this.inputValue = bangdingyear + "-" + bangdingmonth + "-" + bangdingday
				this.birthday = this.inputValue
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
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			},
			
			saveData(){
				uni.switchTab({
					url:'/pages/user/user'
				})
				uni.showToast({
					title:'保存成功！'
				})
			}
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
		background-color: #FFFFFF;
	}
	
	.sex-list{
		border-radius: 40rpx 40rpx 0 0;
		background-color: #FFF;
		color: #333333;
		font-size: 36rpx;
		text-align: center;
		line-height: 120rpx;
	}
	
	.sex-border{
		border-bottom: 1rpx solid $group-color-border;
	}
</style>
