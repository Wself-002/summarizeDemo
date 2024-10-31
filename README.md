# 需要环境
# node 20.9.0
# npm 10.1.0
# npm镜像源:https://registry.npmmirror.com


# 安装的插件步骤:
## 1.自动导入vue语法插件: npm i -D unplugin-auto-import 
##    在vite.config.ts/js中配置: import AutoImport from "unplugin-auto-import/vite"; plugins: [AutoImport()]

## 2.自动导入组件插件: npm install -D unplugin-vue-components
##    在vite.config.ts/js中配置: import Components from 'unplugin-vue-components/vite'; plugins: [Components()]