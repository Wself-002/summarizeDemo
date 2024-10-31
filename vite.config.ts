import { defineConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite';
/**
 * 第一种写法
 */
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],// include 这两个选项分别用于指定需要包含和排除的文件匹配模式。通过这两个选项，用户可以更精细地控制哪些文件需要自动导入，哪些文件不需要
            // exclude:[],//exclude 这两个选项分别用于指定需要包含和排除的文件匹配模式。通过这两个选项，用户可以更精细地控制哪些文件需要自动导入，哪些文件不需要
            imports: ["vue", "vue-router", "pinia", "vue-i18n"],// 用于指定需要自动导入的库或API
            // dts: "src/auto-imports.d.ts",// 用于指定生成的类型声明文件（.d.ts）的路径和文件名  一般默认的就行
            // dirs: ["src/composables", "src/stores"],//用于指定需要自动导入的目录
            // resolvers: [],// 用于指定解析器配置。解析器可以帮助插件识别并自动导入第三方UI库或组件库中的组件和API。
        }),
        Components({
            dirs: ["src/components", "src/**/components"],// 你的组件所在的目录路径
            extensions: ["vue"],// 自动导入的组件类型，这里使用了 Vite 提供的默认配置
            include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
            dts: true, // 是否将组件名转换为 pascalCase（驼峰式命名）
            deep: true// 遍历子目录。可省略
        }),
        UnoCSS()
    ],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});

/**
 * 第二种写法
 */
// export default ({ mode }: ConfigEnv) => {
//     return defineConfig({
//         plugins: [
//             vue(),
//             AutoImport({
//                 include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],// include 这两个选项分别用于指定需要包含和排除的文件匹配模式。通过这两个选项，用户可以更精细地控制哪些文件需要自动导入，哪些文件不需要
//                 // exclude:[],//exclude 这两个选项分别用于指定需要包含和排除的文件匹配模式。通过这两个选项，用户可以更精细地控制哪些文件需要自动导入，哪些文件不需要
//                 imports: ["vue", "vue-router", "pinia", "vue-i18n"],// 用于指定需要自动导入的库或API
//                 // dts: "src/auto-imports.d.ts",// 用于指定生成的类型声明文件（.d.ts）的路径和文件名  一般默认的就行
//                 // dirs: ["src/composables", "src/stores"],//用于指定需要自动导入的目录
//                 // resolvers: [],// 用于指定解析器配置。解析器可以帮助插件识别并自动导入第三方UI库或组件库中的组件和API。
//             }),
//         ],
//         resolve: {
//             alias: {
//                 "@": "/src",
//             },
//         },
//     })
// }