<template>
	<view id="page">
		<view class="nav-box flex-box"><image class="back-icon" src="/static/image/icon/icon_back_w.png" @tap="navBack" mode="aspectFit"></image></view>
		<image class="view-bg" src="/static/image/bg_c.png" mode="aspectFill"></image>

		<view class="view-title flex-box">
			<view class="big-title">请告诉我们 你的技能</view>
			<view>(可多选)</view>
			<view style="margin-top: 30rpx;">考拉任务会给你推送合适你的任务</view>
		</view>

		<view class="content-box flex-box">
			<view class="auto-box" :class="{ 'no-margin': (index + 1) % 3 == 0 }" v-for="(item, index) in list" :key="index" @tap="choiceSkill(item, index)">
				<image src="/static/image/login/codeBG.png" mode="aspectFill"></image>
				<view>{{ item.name }}</view>
				<view v-if="item.status" class="mask-box flex-box"><image src="/static/image/icon/icon_xz.png" mode="aspectFit"></image></view>
			</view>
			<view v-if="!skill" class="add-box flex-box" @tap="showPopup">
				<image src="/static/image/icon/icon_add_bb.png" mode="aspectFit"></image>
				我还有一个与众不同的技能
			</view>
			<view class="auto-box" v-else @tap="showPopup">
				<view class="Pinyin-box">{{ Pinyin }}</view>
				<image src="/static/image/user/bg_tj.png" mode="aspectFill"></image>
				<view>{{ skill }}</view>
			</view>
		</view>

		<view class="bottom-btn" @tap="navNext">下一步</view>

		<uni-popup animation :show="popupShow" @change="change">
			<view class="popup-input">
				<view class="radius-popup"></view>
				<view class="input-box"><input placeholder="输入六个以内字符" type="text" v-model="text" /></view>
				<view class="popup-btn flex-box">
					<view class="black-btn" @tap="addSkill">确定</view>
					<view class="white-btn" @tap="change({ show: false })">取消</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import getPy from '@/commen/getPy.js';

export default {
	components: {
		uniPopup
	},
	data() {
		return {
			userInfo:{},
			list: [
				{
					name: '房屋维修',
					status: false
				},
				{
					name: '翻译业务',
					status: false
				},
				{
					name: '专车接送',
					status: false
				},
				{
					name: '花园维护',
					status: false
				},
				{
					name: '专业摄影',
					status: false
				},
				{
					name: '清洁保洁',
					status: false
				},
				{
					name: '签证办理',
					status: false
				},
				{
					name: '宠物寄养',
					status: false
				},
				{
					name: '搬家搬运',
					status: false
				},
				{
					name: '全能帮手',
					status: false
				}
			],
			text: '',
			skill: '',
			Pinyin: '',
			choiceList: [],
			popupShow: false
		};
	},

	methods: {
		addSkill() {
			this.skill = this.text;
			this.Pinyin = getPy.get(this.skill).substr(0, 1);
			this.popupShow = false;
		},

		change(e) {
			if (!e.show) {
				this.popupShow = false;
			}
		},

		showPopup() {
			this.popupShow = true;
		},

		choiceSkill(item, index) {
			if (item.status) {
				let findIndex = this.choiceList.findIndex(i => {
					i == item.name;
				});
				this.choiceList.splice(findIndex, 1);
				this.list[index].status = false;
			} else {
				this.choiceList.push(item.name);
				this.list[index].status = true;
			}
			console.log(this.choiceList);
		},

		navNext() {
			let list = [...this.choiceList];
			list.push(this.skill);
			this.$store.commit('updataSkillList', list);
			let cnt = {
				userId:this.userInfo.userId,
				hobbyTag: this.choiceList
			}
			this.$api.updateUser(cnt);
			uni.navigateTo({
				url: '../certificate/certificate'
			});
		},

		getTaskTags(cnt) {
			this.$api.getTaskTags(cnt, res => {
				if (res.data.rc == this.$util.RC.SUCCESS) {
					console.log(this.$util.tryParseJson(res.data.rc));
				} else {
					uni.showToast({
						title: res.data.rm,
						icon: 'none'
					});
				}
			});
		}
	},

	onLoad() {
		this.userInfo = this.$util.tryParseJson(uni.getStorageSync('userInfo'));
		let cnt = {
			groupId: 1, // Long 分类id
			count: 10, // int
			offset: 0 // int
		};
		this.getTaskTags(cnt);
	}
};
</script>

<style lang="scss" scoped>
#page {
	background-color: $group-color-bg;
	min-height: 100vh;
	padding-bottom: 30rpx;
}

.flex-box {
	display: flex;
	align-items: center;
}

.nav-box {
	position: relative;
	z-index: 1;
	padding-top: $status-height;
	height: 88rpx;
}

.view-title {
	position: relative;
	font-size: 30rpx;
	line-height: 42rpx;
	flex-wrap: wrap;
	padding: 0 40rpx;
	color: #ffffff;
}

.big-title {
	font-size: 50rpx;
	line-height: 70rpx;
	margin-right: 20rpx;
}

.back-icon {
	position: absolute;
	left: 0;
	padding: 10rpx 29rpx;
	width: 33rpx;
	height: 33rpx;
}

.view-bg {
	position: absolute;
	top: 0;
	z-index: 0;
	width: 100vw;
	height: 100vh;
}

.content-box {
	position: relative;
	flex-wrap: wrap;
	margin: 60rpx auto 0;
	border-radius: 6rpx;
	background-color: #ffffff;
	color: #666666;
	font-size: 30rpx;
	line-height: 42rpx;
	padding: 17rpx 40rpx 51rpx;
	width: 670rpx;
	box-sizing: border-box;
}

.auto-box {
	position: relative;
	margin: 60rpx 55rpx 0 0;
	text-align: center;

	image {
		border-radius: 50%;
		width: 160rpx;
		height: 160rpx;
		margin-bottom: 30rpx;
	}
}

.mask-box {
	position: absolute;
	justify-content: center;
	width: 160rpx;
	height: 160rpx;
	background-color: rgba($color: #ffcd34, $alpha: 0.7);
	border-radius: 50%;
	top: 0;
	left: 0;

	image {
		width: 50rpx;
		height: 50rpx;
	}
}

.no-margin {
	margin-right: 0;
}

.add-box {
	position: absolute;
	bottom: 133rpx;
	right: 0;
	font-size: 26rpx;
	line-height: 37rpx;
	color: #666666;
	width: 415rpx;
	box-sizing: border-box;
	height: 160rpx;
	padding: 0 31rpx 0 32rpx;
	background-color: #f1f1f1;
	border-radius: 80rpx 0 0 80rpx;

	image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 16rpx;
	}
}

.input-box {
	border: 1rpx solid #dddfde;
	border-radius: 6rpx;
	width: 100%;
	box-sizing: border-box;
	padding: 23rpx 30rpx;

	input {
		font-size: 30rpx;
		line-height: 42rpx;
	}
}

.bottom-btn {
	margin: 80rpx auto 0;
	border-radius: 6rpx;
	background-color: #0f1b07;
	box-sizing: border-box;
	line-height: 102rpx;
	width: 670rpx;
	color: #ffffff;
	text-align: center;
}

.popup-input {
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	width: 600rpx;
	height: 346rpx;
	padding: 70rpx 40rpx 50rpx;
	background-color: #ffffff;
	font-size: 30rpx;
	border-radius: 4rpx;
}

.radius-popup {
	position: absolute;
	top: -80rpx;
	left: -80rpx;
	background-color: #c4d06a;
	border-radius: 50%;
	width: 160rpx;
	height: 160rpx;
}

.popup-btn {
	margin-top: 50rpx;
	justify-content: space-between;
	line-height: 88rpx;
	text-align: center;

	view {
		width: 250rpx;
		box-sizing: border-box;
	}
}

.black-btn {
	background-color: #0f1b07;
	color: #ffffff;
}

.white-btn {
	color: #999999;
	border: 1rpx solid #dddfde;
}

.Pinyin-box {
	position: absolute;
	font-size: 50rpx;
	line-height: 70rpx;
	top: 45rpx;
	left: 50%;
	transform: translateX(-50%);
	color: #ffffff;
}
</style>
