# mreq-todo

mreq demo 用的 TODO CLI. 資料存在 `todo.json` (可用 `TODO_FILE` 環境變數改路徑).

## 準備

```sh
npm install
npm run seed
```

## 使用

```sh
npm run todo -- add 買牛奶
npm run todo -- list          # 只列未完成
npm run todo -- list --all
npm run todo -- done 2
npm run todo -- rm 2
```

## 重置到初始狀態

```sh
git reset --hard start
git clean -fdx -e node_modules
npm run seed
```
