<template>
  <div class="main">
		<div v-show="!join">
			<button type="button" plain @click.prevent="joinFn">播放</button>
		</div>
		<div v-show="join">
			<audio :src="audioUrl" id="audio"></audio>
			<h1 class="lry-title">{{ audioLry.title }}</h1>
			<div class="lry-wrap">
				<transition-group 
					class="lry-list" 
					name="audioLryList" 
					tag="ul"
					v-if="join"
					appear
					>
					<li 
						v-for="(lryitem,ind) in audioCurLryArr" 
						:key="lryitem[0]+''+lryitem[1]" 
						:class="{'active': audioCurIndex!=null&&lryitem[0]<=audioLry.body[audioCurIndex][0]}"
					>{{ lryitem[1] }}</li>
				</transition-group>
			</div>
		</div>
		
  </div>
</template>


<script>
import Lry from '../assets/music-lrt.js'
import Music from '../../static/music.mp3'
export default {
	data () {
	  return {
			join: false,
			audioUrl: Music,
			audioLry: Lry,
			audioCurIndex: null,
			audioCurLryArr: [],
	  }
	},
	mounted(){
	},
	methods: {
		joinFn(){
			var _vm = this;
			
			this.join = true;
			
			var oAudio = document.getElementById("audio");
			
			oAudio.play();
			
			
			
			var layarr = this.audioLry.body;
			oAudio.addEventListener("timeupdate",function(){
				var curM = parseInt(this.currentTime/60),
						curS = +(this.currentTime%60).toFixed(2);
						
				if(this.currentTime == this.duration){
					_vm.audioEnd();
					return;
				}
				
				layarr.some((v,k) => {
					var lry = v[0].split(":"),
							lryM = parseInt(lry[0]),
							lryS = +lry[1];
					if( lryM == curM && lryS <= curS && (_vm.audioCurIndex == null || _vm.audioCurIndex < k ) ){
						_vm.audioCurIndex = k;
						return true;
					}
				});
			})
		},
		audioEnd(){
			var _vm = this;
			
			
		}
	},
	watch: {
		audioCurIndex: function(nV,oV){
			if(nV>0){
				this.audioCurLryArr.shift();
				if(nV < this.audioLry.body.length - 2){
					this.audioCurLryArr.push( this.audioLry.body[nV+2] );
				}
			}
		},
		join: function(nV,oV){
			if(nV){
				for(var i = 0; i < 3; i++){
					(i=>setTimeout( ()=> this.audioCurLryArr.push( this.audioLry.body[i] ) , i*500))(i)
				}
			}
			
			
		}
	}
}
</script>

<style>
	body,html{
		min-width: 500px;
		height: 100%;
		overflow: hidden;
		background-color: #000000;
	}
	
	ul{
		padding: 0;
	}
	li{
		list-style: none;
		font-size: 1.2em;
		height: 65px;
	}
	.lry-title{
		color: #409EFF;
	}
	.lry-list li{
		transition: 0.5s all ease-out;
	}
	.lry-list li.active{
		font-size: 1.5em;
		color: #F56C6C;
	}
	.audioLryList-enter{
		opacity: 0;
		transform: translateY(30px);
	}
	.audioLryList-leave-to{
		opacity: 0;
		transform: translateY(-30px);
	}
	.audioLryList-leave-active {
		/* position: absolute; */
	}
	button{
		outline: none;
		padding: 5px 15px;
		border: 1px solid #CCCCCC;
		background-color: #ffffff;
		-webkit-border-radius: 5px;
		border-radius: 5px;

	}
	button:active{
		-webkit-opacity: 0.8;
		opacity: 0.8;
	}
</style>
