<template>
	<view class="zhezhao" v-show="shixian" @click="colseBox">
		<view class="xuanzeqi" @click.stop>
			<view class="quxiaoqueren">
				<view class="quniu" @click="quxiaobutton">取消</view>
				<view class="queniu" @click="quedingbutton">确定</view>
			</view>
			<picker-view v-if="visible" class="shigun" indicator-class="currStyle" :indicator-style="indicatorStyle" :value="values" @change="bindChange">
				<picker-view-column>
					<view class="itemd" v-for="(item,index) in years" :key="index">{{item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="itemd" v-for="(item,index1) in months" :key="index1">{{item > 9 ? item : '0' + item}}</view>
				</picker-view-column>
				<picker-view-column>
					<view class="itemd" v-for="(item,index2) in days" :key="index2">{{item > 9 ? item : '0' + item}}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			shixian: Boolean
		},
		data() {
			const date = new Date();
			const years = [];
			const year = date.getFullYear()
			const months = []
			let month = date.getMonth() + 1
			const days = []
			let day = date.getDate()
			for (let i = 1940; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				title: 'picker-view',
				years,
				year,
				months,
				month,
				days,
				day,
				values: [],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth*0.16)}px;font-size:36rpx`
			};
		},
		methods: {
			confirm(value) {
				var dates = value.split("-");
				this.values[0] = dates[0] - 1940;
				this.values[1] = dates[1] - 1;
				this.values[2] = dates[2] - 1;
				this.year = dates[0];
				this.month = dates[1];
				this.day = dates[2];
			},
			bindChange: function(e) {
				const val = e.detail.value
				if (val.length > 0) {
					this.year = this.years[val[0]]
					// this.month = this.months[val[1]] > 9 ? this.month : '0' + this.months[val[1]];
					if (this.months[val[1]] > 9) {
						this.month = this.months[val[1]];
					} else {
						this.month = '0' + this.months[val[1]];
					}
					// this.day = this.days[val[2]] > 9 ? this.month : '0' + this.days[val[2]];
					if (this.days[val[2]] > 9) {
						this.day = this.days[val[2]];
					} else {
						this.day = '0' + this.days[val[2]];
					}
				}
			},
			quxiaobutton() {
				this.values = [9999, this.month - 1, this.day - 1];
				this.$emit('quxiaoButton');
			},
			quedingbutton() {

				this.values = [9999, this.month - 1, this.day - 1];
				console.log(this.year, this.month, this.day)
				this.$emit('quedingButton', this.year, this.month, this.day);
			},
			
			colseBox(){
				this.$emit('colseBox')
			}
		}

	}
</script>

<style lang="scss" scoped>
	.zhezhao {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0rpx;
		right: 0rpx;
		bottom: 0rpx;
		left: 0rpx;
		-webkit-transition: 0.15s;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
	}

	.xuanzeqi {
		width: 100%;
		background-color: #FFF;
		height: 462rpx;
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 20;
		display: block;
		border-radius: 40rpx 40rpx 0 0;
	}

	.quxiaoqueren {
		height: 100rpx;
		width: 100%;
		display: block;
		border-bottom: 1px solid $group-color-border;
		position: relative;
		top: 0rpx;
		left: 0rpx;
	}

	.quniu {
		width: 80rpx;
		border-radius: 6rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: $group-color-befor;
		float: left;
		margin-left: 50rpx;
		font-size: 36rpx;
		display: block;
		margin-top: 25rpx;
	}

	.queniu {
		width: 80rpx;
		border-radius: 6rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		color: #00C8BE;
		float: right;
		display: block;
		font-size: 36rpx;
		margin-right: 50rpx;
		margin-top: 25rpx;
	}

	.shigun {
		background-color: #FFF;
		display: block;
		height: 361rpx;
		margin: 0 auto;
		font-size: $group-font-befor;
	}

	.itemd {
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
	
	.currStyle{
		font-size: 36rpx;
	}
</style>
