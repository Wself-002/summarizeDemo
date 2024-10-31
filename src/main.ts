import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import { registerCustomDirectives } from '@/utils/index.ts';
import 'virtual:uno.css';
import './styles/index.css'
const app = createApp(App);
registerCustomDirectives(app)
app.use(Antd).mount('#app');