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

```javascript
rules: {
    "規則名": "規則配置",
    "prettier/prettier": "error",
    // xxx
    "規則名": ["規則 ID", "規則配置"],
    indent: ["error", 2],
},
```

* 規則 ID
  + "off" 或 0 - 關閉規則
  + "warn" 或 1 - 開啟規則，使用警告級別的錯誤：warn (不會使得程式停止運行)
  + "error" 或 2 - 開啟規則，使用錯誤級別的錯誤：error (當被觸發的時候，程式會停止運行)

```javascript
rules: {
    "prettier/prettier": "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/no-unknown-property": ["error", {
        ignore: ["css"]
    }]
},
```

* Disallow missing React when using JSX (react/react-in-jsx-scope)

<https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md>

> If you are using the new JSX transform from React 17, you should disable this rule by extending react/jsx-runtime in your eslint config (add "plugin:react/jsx-runtime" to "extends").

### plugins

```javascript
// .eslintrc.js
module.exports = {
    // 添加 TS 规则，可省略`eslint-plugin`
    plugins: ['@typescript-eslint']
}
```

> plugins 添加後，預設沒有開啟任何規則，需要手動開啟

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

### eslint 接入 prettier 範例

```javascript
// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        // 1. 接入 prettier 的规则
        "prettier",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    // 2. 加入 prettier 的 eslint 插件
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
        // 3. 注意要加上这一句，开启 prettier 自动修复的功能
        "prettier/prettier": "error",
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "react/react-in-jsx-scope": "off"
    }
};
```

### ESLint + Prettier

```javascript
{
    "scripts": {
        // 省略已有 script
        "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./src",
    }
}
```

```shell
pnpm run lint:script
```

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

### 開發時通過 vite plugin 的方式進行 eslint 檢查，檢查結果顯示在 terminal

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

```json
// .stylelintrc.json
{
  "plugins": ["stylelint-prettier"],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
    "stylelint-prettier/recommended"
  ],
  "rules": {
    "prettier/prettier": true,
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [
        true,
        {
            "ignoreAtRules": ["tailwind"]
        }
    ]
  }
}
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

### scripts 整合 stylelint

```json
{
  "scripts": {
    // 整合 lint 命令
    "lint": "npm run lint:script && npm run lint:style",
    // stylelint 命令
    "lint:style": "stylelint --fix \"src/**/*.{css,scss}\""
  }
}

```

### 開發時進行 stylelint 檢查，檢查結果顯示在 terminal

```shell
pnpm i vite-plugin-stylelint -D
```

```json
import viteStylelint from '@amatlash/vite-plugin-stylelint';
// 注意: Vite 3.x 以及以后的版本需要引入 vite-plugin-stylelint

// 具体配置
{
  plugins: [
    // 省略其它插件
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/
    }),
  ]
}
```

## Husky + lint-staged

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

### lint-staged (只對 staged files 執行 lint)

```shell
pnpm i -D lint-staged
```

package.json 設定

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

到 `.husky/pre-commit` 脚本中，修改原本的 `npm run lint`

```sh
# .husky/pre-commit
npx --no -- lint-staged
```

## commitlint (commit message 規範)

link: <https://commitlint.js.org/#/>

### install

```shell
pnpm i commitlint @commitlint/cli @commitlint/config-conventional -D
```

### configure

```shell
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

### commit message 結構

分2個部分

```

```JS
// type 指提交的类型
// subject 指提交的摘要信息
<type>: <subject>
```

常用 type

* feat: 新功能
* fix: 修復 bug
* chore: 不影響功能的修改
* docs: 文件修改
* perf: 性能優化
* refactor: 重構代碼
* test: 測試代碼

### set Husky hook

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```
