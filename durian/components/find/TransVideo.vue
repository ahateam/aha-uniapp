<template>
	<view>
		<user-box :upName="item.posting.userName" :time="newTime(item.posting.postingCreateTime)" :upHead="item.posting.userHead"></user-box>
		<view class="textBox">
			<text v-if="item.posting.postingTextDate">
				{{item.posting.postingTextDate}}
			</text>
		</view>
		<video class="videoBox" :poster="constData.oss + item.posting.postingDate + constData.ossClip" :class="{verticalVideo:type == 0}"
		 :src="constData.oss + item.posting.postingDate" controls></video>
	</view>
</template>

<script>
	import userBox from '@/components/find/userBox.vue'

	export default {
		name: 'TransVideo',
		components: {
			userBox
		},
		props: {
			item: {
				type: Object
			}
		},
		data() {
			return {
				constData: this.$constData,
				// type:0
			}
		},
		methods: {
			newTime(time) {
				return this.$commen.getTimeAgo(time);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.textBox {
		font-size: $group-font-befor;
		color: $uni-text-color;
		margin: $group-margin-top 0;
	}

	.videoBox {
		width: 100%;
		height: 320rpx;
		display: block;
		margin-bottom: 14rpx;
	}

	.verticalVideo {
		width: 320rpx;
		height: 480rpx;
	}
</style>
