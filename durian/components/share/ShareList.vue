<template>
	<view class="body">
		<view class="userBox">
			<image :src="constData.oss + item.posting.userHead" mode="aspectFill"></image>
			<view class="rightBox">
				<view>{{ item.posting.userName }}</view>
				<view class="time">{{ newTime(item.posting.postingCreateTime) }}</view>
			</view>
		</view>

		<view class="title">
			<view :class="{ 'tag-show': tagType }">{{ item.posting.postingTextDate }}</view>
			<image class="tag-icon" v-if="tagType" :src="tagType == 'new' ? '/static/image/find/icon_new.png' : '/static/image/icon/icon_fx_j.png'" mode="aspectFit"></image>
		</view>

		<share-box :shareInfo="getJsonObj(item.posting.postingDate)"></share-box>
	</view>
</template>

<script>
import ShareBox from '@/components/share/ShareBox.vue';

export default {
	name: 'ShareList',
	components: {
		ShareBox
	},
	props: ['item', 'tagType'],
	data() {
		return {
			constData: this.$constData
		};
	},
	methods: {
		newTime(time) {
			return this.$commen.getTimeAgo(time);
		},
		getJsonObj(data) {
			return this.$util.tryParseJson(data);
		}
	}
};
</script>

<style lang="scss" scoped>
.body {
	position: relative;
	width: 100%;
	box-sizing: border-box;
	min-height: 170rpx;
}

.title {
	position: relative;
	font-size: $group-font;
	color: $group-color;
	line-height: $group-font-line;
	margin-top: 30rpx;
	box-sizing: border-box;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2; //需要显示时文本行数
	text-overflow: ellipsis;
	overflow: hidden;
	margin-bottom: 15rpx;
}

.userBox {
	position: relative;
	font-size: $group-font;
	line-height: $group-font-line;
	color: $group-color;

	image {
		position: absolute;
		top: 50%;
		margin-top: -30rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
	}
}

.rightBox {
	margin-left: 80rpx;
	font-size: $group-font;
	line-height: $group-font-line;
}

.time {
	font-size: $group-font-info;
	line-height: $group-font-info;
	color: $group-color-befor;
	margin-top: $group-margin-s;
}

.tag-show {
	text-indent: 2em;
}

.tag-icon {
	position: absolute;
	top: 4rpx;
	left: 0;
	width: 47rpx;
	height: 28rpx;
}
</style>
