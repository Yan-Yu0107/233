<template>
    <div class="card">
        <div class="card-img">
            <img :src="cardData.url" alt="" style="width: 100%;" v-if="cardData.tylinkType == '图片'">
            <!-- <img src="../assets/icon-paly.png" alt="" class="img-paly" v-if="cardData.tylinkType == '视频'"> -->
            <VideoPlayer 
                ref="videoPlayer"
                :options="playerOptions" 
                @play="onPlayerPlay"
                @pause="onPlayerPause"
                v-if="cardData.tylinkType == '视频'"
            />
        </div>
        <div class="card-txt">
            {{ cardData.name }}
        </div>
        <div class="card-label">
            <span class="label">{{ cardData.label }}</span>
        </div>
        <div class="card-information">
            <img :src="cardData.urlavatar" alt="" style="width:20px; margin-left:10px;">
            <p style="margin-left: 10px; font-size: 0.9em;">{{ cardData.information }}</p>
            <img src="../assets/icon-like.png" alt="" style="width:20px;margin-left: auto" @click="likeSanlian(0)" v-if="likeJudge"> 
            <img src="../assets/icon-like-c.png" alt="" style="width:20px;margin-left: auto" @click="likeSanlian(1)" v-else> 
            <p style="margin-left: 10px;margin-right:10px">{{ cardData.like }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import { reactive, ref } from 'vue';
const likeJudge = ref(true);
const props = defineProps({
    cardData: {
        type: Object,
        required: true,
    },
})
function likeSanlian(data: number) {
    if(data == 0){
        props.cardData.like++;
        likeJudge.value = false;
    } else {
        props.cardData.like--; 
        likeJudge.value = true;
    }
}
// 播放器配置
const playerOptions = reactive({
  autoplay: false, // 禁用自动播放（浏览器策略限制）
  controls: true, // 显示默认控制条
  sources: [{
    src:'',
    type: 'video/mp4'
  }],
  poster: '',
  responsive: true, // 响应式布局
  fluid: true, // 容器自适应
});

// 播放器实例
const videoPlayer = ref(null);

// 播放事件
const onPlayerPlay = () => {
  console.log('视频开始播放');
};

// 暂停事件
const onPlayerPause = () => {
  console.log('视频暂停');
};
if (props.cardData.tylinkType == '视频') {
    playerOptions.sources[0].src = props.cardData.url; // 设置视频源
    // playerOptions.poster = props.cardData.url; // 设置视频封面
}
</script>

<style lang="scss" scoped>
.card{
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 4px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3), -5px -5px 10px rgba(255, 255, 255, 0.8);
    .card-img{
    width: 100%;
    position: relative;
        .img-paly{
            width: 30px;
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 100;
        }
    }
    .card-information{
        display: flex;
        align-items: center;
    }
    .card-txt{
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-bottom: 10px;
        font-size: 0.9em;
    }
    .card-label{
        display: flex;
        align-items: center;
        margin-left: 10px;
        .label{
            background-color: #f0f0f0;
            border-radius: 5px;
            padding: 0px 5px;
            font-size: 0.9em;
        }
    }
}
</style>