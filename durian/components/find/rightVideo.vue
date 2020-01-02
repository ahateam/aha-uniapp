<template>
	<view class="body">
		<view class="userBox">
			<image :src="constData.oss + item.posting.userHead" mode="aspectFill"></image>
			<view class="rightBox">
				<view>{{item.posting.userName}}</view>
				<view class="time">{{newTime(item.posting.postingCreateTime)}}</view>
			</view>
		</view>

		<view class="title">
			<view :class="{'tag-show':tagType}">{{item.posting.postingTextDate}}</view>
			<image class="tag-icon" v-if="tagType" :src="tagType == 'new'?'/static/image/find/icon_new.png':'/static/image/icon/icon_fx_j.png'"
			 mode="aspectFit"></image>
		</view>

		<view class="img">
			<image :src="src" mode="aspectFill" v-if="item.posting.postingType == constData.groupType[1].key"></image>
			<view class="imgNum" v-if="item.posting.postingType == constData.groupType[1].key">
				<text class="iconfont kk-tupianx"></text>
				<text>{{listLength}}</text>
			</view>

			<video :src="src" v-if="item.posting.postingType == constData.groupType[3].key" :controls="false"></video>
			<view class="videoBtn" v-if="item.posting.postingType == constData.groupType[3].key">
				<image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAEC0lEQVRoQ+2ajVEVMRDHdzuwA6ACpQKxArECtQKxAqECoQKhAqECoQKxAqEDrWCdn7Nx8vJy+bp3T4YhM2+O8S7J/rO7//2IKo9k6CPBIU9Acpo0s10ReSkiPA8mtH0tIncicqOqPDcyZmvEhX8rIu8cQI9gtyJyKSIXc0ENA3EAnxxAj/BT356LyEdV/TWyWDcQM3smIgA4mtjwXkQ4aX4Mngj3QkSYy5PfTmb+laoeLg7EzBDga8aEEB4TOVfVAKAoj2sUc+QXQC0PxMzY8Esi3W8ROVbV05FTDHPMDC1AEBzEcqY1AeLMQQxtXANuZvjMa/cb/i6Oqo9kQKCFI1WtLl7bfOq9mUHd3/w9ND1F5f+WKAJxn/gebQiIg1Y/mAEEUsDX8J0zVZ0iljoQZydAYLuMrYCIwXOQrYc2qREzw4E/RAu/X9KcRrUX5mWBODX+jBY/UdXjuZuNznd5PnscepNjtikgODJpRzCp3VFaHBU+MTEOkSDMIJ0hFKyMNSAZbZA2NMUJn7ujqjebABDWyDDnXpqb5YDEvnGvqsHZi7I5CMgBxiHDxRx5bmSYGZlyyADWmCwHBN8IwjdRH5Im3B+En5UIJuYFBeMnjFtV3Y/frwDJmNV+K/1NAGEvIv+pqp7MUU1GthXzSoHE+VSzWRU0EsuOaUDhw+aWmNdKOEiBxOzQlYkWNJIqAiAI0V0dmhkZNvkXYyUkpEDYhFJ17cOaWXQACUtxaPhgc9JpZvFBr+Rg/xNI8B+0w0lXR0LDzUCIoE0bNPpISdC1uJD7uJQVlzTyEIFQgFGhMpo10pVfDfgIwlAiU9s0af4h+gglARkE8WURZ98G/V65Fhal3zgg3qnqXpVK/IMG0/rhAOYExDh9KgZEcqy4DtlEirKpTgutqLjsnk5RnEaLWeaUhiY0srFOS1KxrqVPtTS+2by8xsdsnkONNN5G0pDCQcVmtcaoLYVVV63e0zDo8L+0OVgvrNy84lIXemRiM022CtjynWsabVCwMdpKXQeSOlZXcGwRsPWbJAgyLZvOPOh2UKZWn6xYS0Dibl/IVF+1VoytJ15wbqyCtmkwKdIZGnZZE+9tmbLI4mC8VRuDAG8xpo00sQFDi2iRJrabU2jGBYVVmbMKxJ0/dzfSXeGVzM3ZiRZt2tGsgmDdJiAFMGiHNPxijk+YGV1NsuHgD82aCB82A4lomdohvf8jrQm3s61XbzgzAMJtVXwWOPZhD7F0AXEwnBrqjzv1sRCACnfp/HvIdsNlTbiDn+pgDuVn3UCCxN4wA1Bods+xrr8R26/yuuuULh8p8D0nSzsTE8ldOZcAhttgKsUhAEM+Ujty1xIm1PJfOK7nCh/LM2xaNVDbfv8EZNsnXtvvDyrmF1FIBKIwAAAAAElFTkSuQmCC"
				 mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['item', 'src', 'listLength', 'tagType'],
		data() {
			return {
				constData: this.$constData
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
		padding-right: 210rpx;
		box-sizing: border-box;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2; //需要显示时文本行数
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.img {
		position: absolute;
		top: 50%;
		margin-top: -85rpx;
		right: 0;
		width: 170rpx;
		height: 170rpx;
		border-radius: 4rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}

		video {
			width: 100%;
			height: 100%;
		}
	}

	.videoBtn {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.2);
		width: 100%;
		height: 100%;
		top: 0;

		image {
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -30upx;
			margin-top: -30upx;
			width: 60upx;
			height: 60upx;
		}
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

	.imgNum {
		position: absolute;
		bottom: 0;
		right: 0;
		background-color: rgba($color: #587685, $alpha: 0.8);
		width: 64rpx;
		height: 30rpx;
		border-radius: 4rpx 0 4rpx 0;
		color: $group-color-w;
		font-size: $group-font-info;
		line-height: 30rpx;
		text-align: center;

		.iconfont {
			font-size: $group-font-info;
			line-height: 30rpx;
			margin-right: 6rpx;
		}
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
