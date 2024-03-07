<template>
	<view class="signup">
		<view class="top-bar">
			<view class="top-bar-left" @tap="toSignin">
				<i class="iconfont icon-xiangzuo1"></i>
			</view>
			<view class="top-bar-center">
			</view>	
			<view class="top-bar-right">
				<i class="iconfont icon-cuowuguanbiquxiao"></i>
			</view>
		</view>
		<view class="bottom-content">
			<image src="../../static/images/index/logo.png"></image>
			<text class="content_title">注册</text>
			<u--form labelPosition="top" :model="userInfo" :rules="rules" ref="uForm" :labelStyle="{color:'#b7b7b7'}">
				<u-form-item label="账号" prop="account" borderBottom>
					<u--input v-model="userInfo.account" border="none"></u--input>
				</u-form-item>
				<u-form-item label="邮箱" prop="email" borderBottom>
					<u--input v-model="userInfo.email" type="text" border="none"></u--input>
				</u-form-item>
				<u-form-item label="密码" prop="password" borderBottom>
					<u--input v-model="userInfo.password" :type="passwordShow?'text':'password'" border="none"></u--input>
					<i slot="right" :class="['iconfont',passwordShow?'icon-zhengyan':'icon-biyanjing']" style="font-size: 20px;" @click="passwordShow=!passwordShow"></i>
				</u-form-item>
				<u-form-item label="密码" prop="password1" borderBottom>
					<u--input v-model="userInfo.password1" :type="passwordShow1?'text':'password'" border="none"></u--input>
					<i slot="right" :class="['iconfont',passwordShow1?'icon-zhengyan':'icon-biyanjing']" style="font-size: 20px;" @click="passwordShow1=!passwordShow1"></i>
				</u-form-item>
			</u--form>
			<view class="submit_buttons">
				<u-button text="注册" class="submit_button" color="linear-gradient(to right,#ffef84,#ffe431 )" @click="submit"></u-button>
				<view class="buttons_text">
					<text>忘记密码</text>
					<text class="text_right">注册账号</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					account:'',
					email:'',
					password:'',
					password1:''
				},
				rules: {
					'account': {
						type: 'string',
						required: true,
						message: '请输入账号',
						trigger: ['blur', 'change']
					},
					'email': {
						type: 'email',
						required: true,
						message: '请输入邮箱',
						trigger: ['blur', 'change']
					},
					'password':[
						{
							type: 'string',
							required: true,	
							message: '请输入密码',
							trigger: ['blur', 'change']
						},{
							pattern: /^[0-9a-zA-Z]*$/g,
							transform(value) {
								return String(value);
							},
							message: '只能包含字母或数字',
							trigger: ['blur', 'change']
						},{
							min: 6,
							max: 8,
							message: '长度在6-8个字符之间'
						}
					],
					'password1':[
						{
							type: 'string',
							required: true,	
							message: '请再次输入密码',
							trigger: ['blur', 'change']
						},{
							validator: (rule, value, callback) => {
								return this.userInfo.password==value;
							},
							message: '两次输入的密码不一致',
							trigger: ['change','blur'],
						}
					]
				},
				passwordShow:false,
				passwordShow1:false
			};
		},
		methods:{
			submit() {
				this.$refs.uForm.validate().then(res => {
					uni.request({
						// url:"http://192.168.100.4:3000/test",
						// url:"http://192.168.100.4:3000/test1",
						url:"http://192.168.1.15:3000/mail",
						data:{
							mail: this.userInfo.account
						},
						method:"POST",
						success:(res)=>{
							console.log(res)
						}
					})
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			toSignin(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
.signup{
	width: 100vw;
	height: 100vh;
	// padding-top: var(--status-bar-height);
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	.top-bar{
		width: 100%;
		height: 88rpx;
		padding: 0 32rpx;
		box-sizing: border-box;
		background: $uni-bg-color;
		box-shadow:0px 0.5px 0px 0px rgba(0,0,0,0.1);
		overflow: hidden;
		display: flex;
		.top-bar-left,.top-bar-center,.top-bar-right{
			flex: 1;
			height: 100%;
			display: flex;
			align-items: center;
			image {
				width: 60rpx;
				height: 60rpx;
			}
			i{
				font-size: 25px;
			}
			&.top-bar-center{
				justify-content: center;
			}
			&.top-bar-right{
				justify-content: end;
				image{
					width: 50rpx;
					height: 50rpx;
					margin-left: 10px;
				}
			}
		}
	}
	.bottom-content{
		flex: 1;
		width: 100%;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 70px 30px 0;
		display: flex;
		flex-direction: column;
		image{
			width: 70px;
			height: 70px;
			margin: 0 auto 20px;
		}
		.content_title{
			font-size: 28px;
			color: #272832;
			font-weight: 500;
		}
	}
	.submit_buttons{
		display: flex;
		flex-direction: column;
		align-items: center;
		.submit_button{
			height: 48px;
			margin-top: 30px;
			box-shadow: 0px 25px 16px -18px rgba(255,228,49,0.4);
			border-radius: 24px;
		}
		.buttons_text{
			width: 100%;
			display: flex;
			justify-content: space-between;
			text{
				margin-top: 20px;
				color: #b7b7b7;
				&.text_right{
					color: #2979ff;
					border-bottom: 0.5px solid #2979ff;
				}
			}
		}
	}
}
</style>
