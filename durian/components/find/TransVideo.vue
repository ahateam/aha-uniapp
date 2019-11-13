<template>
	<view>
		<user-box :upName="item.posting.userName" :time="newTime(item.posting.postingCreateTime)" :upHead="item.posting.userHead"></user-box>
		<view class="textBox">
			<text v-if="item.posting.postingTextDate">
				{{item.posting.postingTextDate}}
			</text>
		</view>
		<video class="videoBox" :class="{verticalVideo:type == 0}" :src="JSON.parse(item.posting.postingDate)[0]" controls></video>
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
				// type:0
			}
		},
		methods: {
			newTime(time) {
				return this.$commen.getNewDate(time)
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
	
	.verticalVideo{
		width: 320rpx;
		height: 480rpx;
	}
</style>
