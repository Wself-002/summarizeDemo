# 需要环境
# node 20.9.0
# npm 10.1.0
# npm镜像源:https://registry.npmmirror.com


# 安装的插件步骤:
## 1.自动导入vue语法插件: npm i -D unplugin-auto-import 
##    在vite.config.ts/js中配置: import AutoImport from "unplugin-auto-import/vite"; plugins: [AutoImport()]

## 2.自动导入组件插件: npm install -D unplugin-vue-components
##    在vite.config.ts/js中配置: import Components from 'unplugin-vue-components/vite'; plugins: [Components()]

## 3.css原子化插件:npm install unocss --save-dev
##    在vite.config.ts/js中配置: import UnoCSS from 'unocss/vite';
##    在项目根目录配置文件 uno.config.ts
##    在main.ts中引入: import 'virtual:uno.css';
##    使用icon图标: https://icones.js.org/(使用哪个图标库,下载哪个,然后在uno.config.ts中配置) 
