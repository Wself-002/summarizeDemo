import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { registerCustomDirectives } from '@/utils/index.ts';

const app = createApp(App);
registerCustomDirectives(app)
app.use(Antd).mount('#app');