<template>
	<div class="manage6s">
		<!-- 头部 start -->
		<div class="manage6s_top">
			<div class="manage6s_imgText">
				北京桩机三现数据中心
			</div>
			<!--右上角时间-->
			<em class="time" v-text="currentTime"></em>
			<div class="button" @click="enterIndexPage('/HomeGuide')"></div>
		</div>
		<!-- 头部 end -->

		<!-- main start -->
		<div class="manage6s_main">
			<div class="manage6s_main_left">
				<div class="top">
					<div class="title">
						<span>●</span>
						<span>6s统计</span>
						<span>总数</span>
						<span>10000</span>
					</div>
				</div>
				<div class="bottom">
					
				</div>
			</div>
			<div class="manage6s_main_right">
				
			</div>
		</div>
		<!-- main end -->

	</div>
</template>

<script>
	import echarts from 'echarts'
	import moment from 'moment'
	import http from '../api/http'
	import {
		getEventInforList,
		getEventInforStatis,
		getEventInforStatisday,
		getSelectList1,
	} from '../api'
	// 顶部环形图
	export default {
		name: 'manage6S_v2',
		data(){
			return {
				refreshDataId: '',
				refreshDataId2: '',
				currentTime: '', // 系统当前时间
				message:'aa'
			}
		},
		mounted(){
		    this.currentTime = this.getCurrentDateTime();
			this.refreshDataId = setInterval(() => {
				this.currentTime = this.getCurrentDateTime();
			}, 1000)
		},
		methods:{
			enterIndexPage(path) {
				// 路径从state中获取
				// window.location.href = `${this.$store.state.baseUrl}/sanyShebei` //测试
				this.$router.replace(path);
			},
			// 时间格式化
			getCurrentDateTime() {
				return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
			},
			handleResize() {
				
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.handleResize)
		},
		destroyed() {
			clearInterval(this.refreshDataId)
			//clearInterval(this.refreshDataId2)
		},
		
	}
</script>
<style lang="scss" scoped>
	.manage6s {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-image: url(../assets/images/body_bg.png);
		background-size: 100% 100%;
		color: rgb(255, 255, 255);
		background-repeat: no-repeat;
		overflow: hidden;

		.manage6s_imgText {
			font-size: 0.44rem;
			color: #fff;
			font-weight: bold;
			text-align: center;
		}

		.time {
			width: 270px;
			text-align: left;
		}

		.button {
			width: 90px;
			height: 40px;
			background: url(../assets/images/index_back.png) no-repeat;
			position: fixed;
			top: 60px;
			left: 15px;
			cursor: pointer;
		}

		.title {
			margin: 0px auto;
		}


		&_top {
			text-align: center;
			height: 125px;
			padding-top: 20px;
			box-sizing: border-box;
			background-image: url(../assets/images/body_title.png);
			background-size: 100% 90%;
			background-repeat: no-repeat;
			padding-bottom: 20px;

			&_imgText {
				display: inline-block;
				cursor: pointer;
			}

			img {
				display: inline-block;
				vertical-align: middle;
				width: 50px;
			}

			.title {
				font-size: 30px;
				color: #0ccfeb;
				display: inline-block;
				vertical-align: middle;
				font-size: 44px;
				color: #fff;
				cursor: pointer;
				font-weight: bold;
			}

			.time {
				font-size: 35px;
				color: #ababab;
				display: inline-block;
				vertical-align: middle;
				position: fixed;
				top: 60px;
				right: 70px;
				z-index: 10;
				font-family: fontnameUnidreamLED;
			}
		}
        /*內容整體開始*/
		&_main {
			height: calc(100% - 125px);
			padding: 20px;
            display:flex;
			.manage6s_main_left{
				width:420px;
				margin-right:20px;
				display: flex;
				flex-direction: column;
				.top , .bottom{
					background: rgba(39, 69, 111, 0.3);
					border: 1px solid rgba(255, 255, 255, 0.1);
				}
				.top{
					height:250px;
					margin-bottom:20px;
				    padding:12px;
				}
				.bottom{
					flex:1;
				}
			}
			.manage6s_main_right{
				flex:1;
				background: rgba(39, 69, 111, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.1);
			}
		}
		/*内容整体结束*/
	}	
</style>

