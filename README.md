# wowjoy

组件库重构(lerna 管理)

# lerna

- 添加所有 package 的依赖
  > lerna add \<dep-name>
- 移除所有 package 依赖
  > lerna exec -- yarn remove \<dep-name>
- 给指定 package 中添加依赖
  > lerna add \<dep-name> --scope \<module-name>
- 移除指定 package 中的依赖
  > lerna 目前没有`remove`这种命令，需要手动在`package.json`中修改然后执行`lerna bootstrap`即可。
- 在 package 中引入相邻依赖
  > 如果想在`module-b`中引入`module-a`  
  > lerna add @\<monorepo>/module-a --scope @\<monorepo>/module-b
- 执行所有 package 中的 scripts 命令
  > lerna run \<command> --stream
- 执行指定 package 中的 scripts 命令
  > lerna exec --scope \<module-name> -- yarn run \<command>

## lerna 命令

| command | value | options |
| --- | --- | --- |
| lerna init | 创建一个新的 lerna 项目或将已存在项目改造为 lerna 项目 | --independent/-i |
| lerna bootstrap | 当使用 yarn 并开启了 workspace 时等价于在根目录执行 yarn install |  |
| lerna import \<pathToRepo> | 将本地路径<pathToRepo>中的包导入到 packages/<directory-name>，并提交操作记录 |  |
| lerna publish | 对更新后的包发布新版本；使用新版本号标记；升级所有 npm 和 git 中的库 | --npm-tag [tagname], --canary/-c, --skip-git, --force-publish [packages] |
| lerna changed | 检查自上次发布以来改动的包 |  |
| lerna diff [package?] | 比较自上次发布以来的所有或指定的包 |  |
| lerna run [script] | 在每个包中执行一个 npm script |  |
| lerna ls | 列出当前 lerna 项目中的 public 包 |  |
| lerna clean | 清理node_modules |  |

## 过滤器
|filter|description|
|---|---|
|--scope \<glob>|仅包含glob所匹配到的package
|--ignore \<glob>|排除glob匹配到的package
|--no-private|排除私有package，默认是包含的
