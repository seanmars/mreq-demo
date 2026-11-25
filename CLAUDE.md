# mreq-todo

TypeScript 寫的 TODO CLI, 用來示範 mreq.

- 使用台灣正體中文回應.
- Node 24 直接執行 `.ts`, 不需要編譯. 只能使用可被移除的 TypeScript 語法 (不能用 `enum`, `namespace`).
- import 路徑要寫 `.ts` 副檔名; 只匯入型別時使用 `import type`.
- 驗證: `npm test` 與 `npm run typecheck` 都要通過.
