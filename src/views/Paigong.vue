<template>
	<div class="dispatching">
		<div class="item">
			<span></span>
			<span>完成</span>
			<span></span>
			<span>进行中</span>
			<span></span>
			<span>未开始</span>
		</div>
		<div class="item">
			<div class="left">
				<div class="top">派工时间轴</div>
				<div class="bottom">派工热点</div>
			</div>
			<div class="right">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
     .dispatching{
		 width:100%;height:110px;display:flex;flex-direction: column;
		 .item:nth-of-type(1) {
			 height:18px;
			 margin-bottom:10px;
			 text-align: right;
			 span{
				 display: inline-block;vertical-align:middle;
			 }			 
			 span:nth-of-type(odd){
				width:25px;height:15px;margin-right:2px; 
			 }
			 span:nth-of-type(even){
				color:#9AA2B5;margin-right:20px;font-size: 16px; 
			 }
			 span:nth-of-type(1){
			 	background:#26D9F9;
			 }
			 span:nth-of-type(3){
			    background:#32FACC;
			 }
			 span:nth-of-type(5){
			    background:#7F8BA1;
			 }
		 }		 
		 .item:nth-of-type(2) {
			 flex:1;
			 display: flex;flex-direction: row;
			 .left{
				 width:110px;
				 display:flex;flex-direction: column;
				 .top{
					 flex:1;
					 color:#03CAF4;
				 }
				 .bottom{
					 flex:1;
					 color:#03CAF4;
				 }
			 }
			 .right{
				 flex:1;
			 }
		 }
	 }
</style>
