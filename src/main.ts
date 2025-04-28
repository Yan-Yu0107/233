import { createApp } from 'vue';
import { PullRefresh } from 'vant';
import './style.css';

// 导入根组件 App
import App from './App.vue';
const app = createApp(App);
app.use(PullRefresh);
app.mount('#app');
 