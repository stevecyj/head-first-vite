# head first vite

## reference

<https://github.com/sanyuan0704/juejin-book-vite>

## node env

```shell
16.14.0
```

```shell
npm i -g pnpm
```

```shell
pnpm create vite
```

## css 預處理器

```shell
pnpm i -D sass
```

## PostCSS

```shell
pnpm i -D autoprefixer
```

* Vite 配置文件(vite.config.ts)中如果有 PostCSS 配置的情况下会覆盖掉 postcss.config.js 的内容!
* 搭配 tailwindcss 使用，看下方 tailwindcss 設定

## CSS In JS

```shell

pnpm i -D babel-plugin-styled-components @emotion/babel-plugin @emotion/react
```

```javascript
// vite.config.ts
import {
    defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                // 加入 babel 插件
                // 以下插件包都需要提前安装
                // 当然，通过这个配置你也可以添加其它的 Babel 插件
                plugins: [
                    // 适配 styled-component
                    "babel-plugin-styled-components"
                    // 适配 emotion
                    "@emotion/babel-plugin"
                ]
            },
            // 注意: 对于 emotion，需要单独加上这个配置
            // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
            jsxImportSource: "@emotion/react"
        })
    ]
})
```

## styled components

```shell
pnpm i -D styled-components
```

```shell
pnpm i -D @types/styled-components
```

```shell
pnpm i -D babel-plugin-styled-components
```

## emotion

```shell
pnpm i -D @emotion/react @emotion/styled @emotion/css
```

```shell
pnpm i -D @emotion/babel-plugin
```

## tailwindcss

```shell
pnpm i -D tailwindcss postcss autoprefixer
```

```shell
npx tailwindcss init
```

```javascript
// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

```javascript
// postcss.config.js
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
export default {
    plugins: [
        tailwindcss(tailwindConfig),
        autoprefixer({
            overrideBrowserslist: ['safari >= 6', 'ff >= 10']
        })
    ]
};

// vite.config.js
import postcssConfig from './postcss.config.js';

export default defineConfig({
    // xxx
    css: {
        postcss: postcssConfig
    }
    // xxx
})
```

### 入口 css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## eslint

```shell
pnpm i -D eslint
```

![eslint](./reademe/eslintInstall.png)

```shell
pnpm i eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
```

### 🧲 for webstorm(不要裝到最新版)

```javascript
"@typescript-eslint/eslint-plugin": "^5.62.0",
"@typescript-eslint/parser": "^5.62.0",
```

### .eslintrc.cjs

* parser 解析器

```javascript
    parser: '@typescript-eslint/parser'
```

* parserOptions 解析器選項
  + ecmaVersion: latest
  + sourceType: module (使用 ES Module)
  + ecmaFeatures: 物件，jsx: true (使用 JSX)

```javascript
parserOptions: {
    ecmaFeatures: {
        jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
},
```

* rules 規則

<https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md>

> If you are using the new JSX transform from React 17, you should disable this rule by extending react/jsx-runtime in your eslint config (add "plugin:react/jsx-runtime" to "extends").

## Prettier

```shell
echo {} > .prettierrc.json
```

```shell
pnpm i eslint-config-prettier eslint-plugin-prettier -D
```

* eslint-config-prettier: 覆盖掉 eslint 中與 prettier 衝突的規則，<https://github.com/prettier/eslint-config-prettier#installation>
* eslint-plugin-prettier: 讓 prettier 接管 `eslint --fix` 的功能，
  <https://github.com/prettier/eslint-plugin-prettier>

### Warning: React version not specified in eslint-plugin-react settings

> Warning: React version not specified in eslint-plugin-react settings. See <https://github.com/jsx-eslint/eslint-plugin-react#configuration> .

* 在github issues <https://github.com/yannickcr/eslint-plugin-react/issues/1955>和<https://juejin.im/post/5c90da695188252daa18ec21>中找到了答案
* 在eslintrc.cjs 中新增 settings

```javascript
settings: {
    react: {
        version: "detect"
    }
}
```

### 開發時進行 eslint 檢查，檢查結果顯示在 terminal

```shell

```shell
pnpm i -D vite-plugin-eslint
```

```javascript
// vite.config.js
import viteEslint from 'vite-plugin-eslint';

export default defineConfig({
    // xxx
    plugins: [viteEslint()]
    // xxx
})
```

## Stylelint

```shell
pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D
```

```shell
echo {} > .stylelintrc.json
```

### for tailwindcss

```json
  "rules": {
    // xxx
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["tailwind"]
      }
    ]
    // xxx
  }
```

### 開發時進行 stylelint 檢查，檢查結果顯示在 terminal

```shell
pnpm i vite-plugin-stylelint -D
```

## Husky

```shell
pnpm i husky -D
```

### steps

* 初始化 Husky: npx husky install，并将 husky install作为项目启动前脚本

```javascript
{
    "scripts": {

        // 会在安装 npm 依赖后自动执行
        "prepare": "husky install"

    }
}
```

* 添加 Husky 钩子，在终端执行如下命令:

```shell
npx husky add .husky/pre-commit "npm run lint"
```

### lint-staged

```shell
pnpm i -D lint-staged
```

```javascript
{
    // package.json
    "lint-staged": {
        "**/*.{js,jsx,tsx,ts}": [
            "npm run lint:script",
            "git add ."
        ],
        "**/*.{scss}": [
            "npm run lint:style",
            "git add ."
        ]
    }
}
```

修改原本的 `npm run lint`

```sh
# .husky/pre-commit
npx --no -- lint-staged
```

## commitlint

link: <https://commitlint.js.org/#/>

### install

```shell
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
```

### configure

```shell
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### set Husky hook

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```
