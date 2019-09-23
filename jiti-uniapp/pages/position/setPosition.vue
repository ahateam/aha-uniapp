<template>
	<view>
		<view class="title-box">
			用成员基本信息
		</view>
		<view class="user-info">
			<view class="item">
				<view class="item-title">
					姓名
				</view>
				<view class="item-text">
						{{userPosition.user.realName}}
				</view>
			</view>
			<view class="item">
				<view class="item-title">
					身份证号
				</view>
				<view class="item-text">
						{{userPosition.user.idNumber}}
				</view>
			</view>
			<view class="item">
				<view class="item-title">
					手机号码
				</view>
				<view class="item-text">
						{{userPosition.user.mobile}}
				</view>
			</view>
		</view>
		<view class="title-box1">
			成员职务
		</view>
		<view class="list-box">
			<view>
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in roleList" :key="index">
								
							<view class="item-check-box">
								<checkbox :value="item.roleId" :checked="item.checked" />
								{{item.name}}
							</view>
						</label><view class="clear-both"></view>
					</checkbox-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'setPosition',
		data(){
			return{
				userPosition:'',
				  roleList:[],
                role:[],
                info:''
			}
		},
		methods:{
			
		},
		onLoad() {
			this.userPosition = JSON.parse(uni.getStorageSync('userPosition'))
			  this.$api.getSysORGUserRoles({},(res)=>{
                if(res.data.rc == this.$util.RC.SUCCESS){
                    this.roleList = this.$util.tryParseJson(res.data.c)
                }else{
                    this.roleList = []
                }
				  this.role = JSON.parse(this.userPosition.orgUser.roles)
				  
				  
				  for(let i =0;i<this.roleList.length;i++){
					  for(let j=0;j<this.role.length;j++){
						  if(this.roleList[i].roleId == this.role[j]){
							  this.$set(this.roleList[i],'checked',true)
						  }
					  }
				  }
				  			console.log(this.role)
            })
          
			

		}
	}
</script>

<style scoped lang="scss">
	.title-box {
		width: auto;
		padding: 30rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 32rpx;
		color: #fff;
		background: $jiti-color-blue;
		margin-top: 20rpx;
	}
	.user-info{
		padding: 30rpx;
	}
	.item{
		width: auto;
	}
	.item-title{
		width: 30%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
		
	}
	.item-text{
		width: 70%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #666;
	}
	.title-box1 {
		width: auto;
		padding: 20rpx;
		line-height: 40rpx;
		text-align: left;
		font-size: 32rpx;
		color: #fff;
		background: $jiti-color-blue;
		margin-top: 20rpx;
	}
	
	.list-box{
		width: auto;
		padding: 30rpx;
		border-bottom:1px solid #eee;
	}
	.list-title{
		float: left;
		width: 25%;
		line-height: 50rpx;
		font-size: 28rpx;
		color: #333;
	}
	.uni-list-cell {
	    justify-content: flex-start
	}
	.item-check-box{
		float: left;
		font-size: 28rpx;
		line-height: 50rpx;
		margin: 20rpx;
		width: 200rpx;
		color: #666;
		
	}
	.clear-both{
		clear: both;
	}
</style>
