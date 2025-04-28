<template>
    <div class="header">
      <div class="header-f">发现</div>
      <div class="header-y">游戏圈</div>
      <div class="header-q">七日世界</div>
    </div>
    <div class="content" @scroll="handleScroll">
      <van-pull-refresh v-model="loading" :head-height="-2" @refresh="onRefresh" pulling-text=" " loosing-text=" ">
        <template #loading>
          <img
            class="doge"
            src="../assets/load-icon.png"
            />
        </template>
            <div class="card-row">
              <div class="card-row-left">
                <Card v-for="card in cards1" :key="card.id" :cardData="card" />
              </div>
              <div class="card-row-right">
                <Card v-for="card in cards2" :key="card.id" :cardData="card" />
              </div>
            </div>
              <!-- </div> -->
      </van-pull-refresh>
      <div>
        <div v-if="isLoading">加载中...</div>
        <div v-if="!hasMore">没有更多数据了</div>
      </div>
    </div>
    <div class="footer">
      <div v-for="item in menuData" :key="item.id">{{ item.name }}</div>
    </div>
    
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from '@/composables/Card.vue';
import a from '@/assets/a.png';
import b from '@/assets/b.png';
import c from '@/assets/c.png';
import d from '@/assets/d.png';
import e from '@/assets/e.png';
import f from '@/assets/f.png';
import h from '@/assets/h.png';
import i from '@/assets/i.png';
import l from '@/assets/l.png';
import shiping1 from '@/assets/video-1.mp4';
import shiping2 from '@/assets/video-2.mp4';
import shiping3 from '@/assets/video-3.mp4';
import boy from '@/assets/icon-boy.png';
import girl from '@/assets/icon-girl.png';
import {detectLinkType} from '@/utils/linkTypeJudgment';

interface CardData {
  id: number;
}

const isLoading = ref(false);
const hasMore = ref(true);
const dataz = ref<CardData[]>([]);
const newArray = ref([
        { id: 122, name: '视频 1',url:shiping1, label:'深夜车站论坛',information:'宇宙之梦',like:'45',urlavatar:boy},
        { id: 1, name: '卡片 1',url:a, label:'深夜车站论坛',information:'宇宙之梦',like:'45',urlavatar:girl},
        { id: 4, name: '卡片 2',url:b, label:'壁纸1',information:'宇宙之梦',like:'5',urlavatar:boy},
        { id: 78, name: '卡片 4',url:d, label:'壁纸3',information:'宇宙之梦',like:'88',urlavatar:girl},
        { id: 44, name: '卡片 4',url:shiping2, label:'壁纸3',information:'宇宙之梦',like:'88',urlavatar:boy},
        { id: 5, name: '卡片 3',url:c, label:'壁纸2',information:'宇宙之梦',like:'7',urlavatar:girl},
        { id: 59, name: '卡片 5',url:e, label:'壁纸4',information:'宇宙之梦',like:'99',urlavatar:girl},
        { id: 6, name: '卡片 6',url:f, label:'壁纸5',information:'宇宙之梦',like:'75',urlavatar:boy},
        { id: 878, name: '卡片 6',url:shiping3, label:'壁纸5',information:'宇宙之梦',like:'75',urlavatar:boy},
        { id: 7, name: '卡片 7',url:h, label:'壁纸6',information:'宇宙之梦',like:'43',urlavatar:girl},
        { id: 8, name: '卡片 8',url:i, label:'壁纸7',information:'宇宙之梦',like:'58',urlavatar:girl},
        { id: 9, name: '卡片 9',url:l, label:'壁纸8',information:'宇宙之梦',like:'97',urlavatar:boy},
        { id: 56, name: '卡片 6',url:f, label:'壁纸5',information:'宇宙之梦',like:'75',urlavatar:boy},
      ]);
const menuData = ref([
  {
    id: 1,
    name: '首页',
    icon: 'icon-find',
    active: true,
  },
  {
    id: 2,
    name: '社区',
    icon: 'icon-find',
    active: true,
  },  {
    id: 3,
    name: '创作',
    icon: 'icon-find',
    active: true,
  },  {
    id: 4,
    name: '找游戏',
    icon: 'icon-find',
    active: true,
  },  {
    id: 5,
    name: '我的',
    icon: 'icon-find',
    active: true,
  },
])
// 模拟接口数据
const fetchData = async () => {
  // isLoading.value = false;
  // 这里可以替换为实际的接口请求
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 122, name: '视频 1',url:shiping1, label:'深夜车站论坛',information:'宇宙之梦',like:'45',urlavatar:boy},
        { id: 1, name: '卡片 1',url:a, label:'深夜车站论坛',information:'宇宙之梦',like:'45',urlavatar:girl},
        { id: 4, name: '卡片 2',url:b, label:'壁纸1',information:'宇宙之梦',like:'5',urlavatar:boy},
        { id: 78, name: '卡片 4',url:d, label:'壁纸3',information:'宇宙之梦',like:'88',urlavatar:girl},
        { id: 44, name: '卡片 4',url:shiping2, label:'壁纸3',information:'宇宙之梦',like:'88',urlavatar:boy},
        { id: 5, name: '卡片 3',url:c, label:'壁纸2',information:'宇宙之梦',like:'7',urlavatar:girl},
        { id: 59, name: '卡片 5',url:e, label:'壁纸4',information:'宇宙之梦',like:'99',urlavatar:girl},
        { id: 6, name: '卡片 6',url:f, label:'壁纸5',information:'宇宙之梦',like:'75',urlavatar:boy},
        { id: 878, name: '卡片 6',url:shiping3, label:'壁纸5',information:'宇宙之梦',like:'75',urlavatar:boy},
        { id: 7, name: '卡片 7',url:h, label:'壁纸6',information:'宇宙之梦',like:'43',urlavatar:girl},
        { id: 8, name: '卡片 8',url:i, label:'壁纸7',information:'宇宙之梦',like:'58',urlavatar:girl},
        { id: 9, name: '卡片 9',url:l, label:'壁纸8',information:'宇宙之梦',like:'97',urlavatar:boy},
        { id: 56, name: '卡片 6',url:f, label:'壁纸5',information:'宇宙之梦',like:'75',urlavatar:boy},
        // 可以添加更多数据
      ];
      dataz.value = data.map((item) => {
        return {
          ...item,
          tylinkType: detectLinkType(item.url)
        }
      })
      isLoading.value = false;
      resolve(data);
    }, 1000);
  });
};

const cards1 = ref<CardData[]>([])
const cards2 = ref<CardData[]>([])

onMounted(async () => {
 await fetchData();
 dataClassification()
});
function dataClassification () {
  cards1.value = dataz.value.filter((_, index) => index % 2 === 0)
  cards2.value = dataz.value.filter((_, index) => index % 2 !== 0)
}
// 定义loading状态，用于控制下拉刷新的动画
const loading = ref(false);
// 定义刷新次数

const onRefresh = async () => {
  try {
    // 模拟异步操作，比如从服务器获取数据
    await fetchData()
    // 刷新成功后，增加刷新次数
    // 重置loading状态
    loading.value = false;
    console.log('刷新成功');
    
  } catch (error) {
    console.error('刷新失败', error);
    // 即使失败，也要重置loading状态
    loading.value = false;
  }
};

  // 处理滚动事件
  //container.scrollTop 表示滚动容器垂直滚动的距离
  //container.clientHeight 表示容器的可见高度
  //container.scrollHeight 表示容器的总高度
const handleScroll = () => {
  const container = document.querySelector('.content');
  console.log('表示滚动容器垂直滚动的距离',container.scrollTop);
  console.log('表示容器的可见高度',container.clientHeight);
  console.log('表示容器的总高度',container.scrollHeight);
  
  if (container !== null && 
    container.scrollTop + container.clientHeight >= container.scrollHeight && 
    !isLoading.value && 
    hasMore.value
) {
    isLoading.value = true;
    newData();
}
}

function newData () {
  newArray.value = newArray.value.map((item) => {
        return {
          ...item,
          tylinkType: detectLinkType(item.url)
        }
      })
  dataz.value = [...dataz.value, ...newArray.value]
  setTimeout(() => {
    dataClassification()
    isLoading.value = false;
  }, 1000);
}

</script>

<style lang="scss" scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏样式 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background-color: #fff;
  z-index: 100;
  min-height: 50px;
  height: 6vh;
  display: flex;
  text-align: center;
  align-items: center;
  .header-f{
    margin-left: 20px;
    padding: 5px;
    font-size: 23px;
    color: black;
  }
  .header-y{
    margin-left: 12px;
    padding: 5px;
    font-size: 16px;
  }
  .header-q{
    margin-left: 12px;
    padding: 5px;
    font-size: 16px;

  }
}

/* 内容区样式 */
.content {
  flex: 1;
  overflow-y: auto;
  margin-top: max(51px, 6.2vh);
  margin-bottom: 51px;
  max-height: calc(100vh - 6vh);
  width: 100%;
  /* 隐藏滚动条（适用于 Firefox） */
  scrollbar-width: none; 
  /* 隐藏滚动条（适用于 IE/Edge） */
  -ms-overflow-style: none; 
  .doge {
    height: 36px;
    margin-top: 10px;
    border-radius: 4px;
  }
}

/* 卡片样式 */
.card-row{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px;
  .card-row-left{
    width: calc(50% - 2px);
  }
 .card-row-right{
    width: calc(50% - 2px);
  }
}

/* 底部菜单栏样式 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  // color: white;
  text-align: center;
  padding: 15px;
  z-index: 100;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
