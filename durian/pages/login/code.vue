<template>
	<view >
		<view class="box" :style="boxBg">
			
		</view>
	</view>
</template>

<script>
	
export default {
		name:'code',
		data(){
			return {
				boxBg:""
			}
		},
		onLoad() {
			// const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			// let boxHeight = windowHeight
			// this.boxStyle.Height = boxHeight+'px'
			// this.boxStyle.Width = '100%'
			this.boxBg = 'background:url('+this.$constData.oss+'/image/codeBG.png)'
		}
		
	}
</script>

<style scoped lang="scss">
		.box{
			width: 100%;
			height: 100vh;
			
		}
</style>
