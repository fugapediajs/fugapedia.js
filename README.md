<div align="center">
  <p>
    <a href="https://fugapedia.js.org"><img src="https://fugapedia.js.org/hero.png" width="555" alt="discord.js" /></a>
  </p>
  <p>
    <a href="https://discord.gg/Phqaa4DVEK"><img src="https://img.shields.io/discord/911878509599817739?color=5865F2&logo=discord&logoColor=white&maxAge=3600" alt="Discord" /></a>
    <a href="https://www.npmjs.com/package/fugapedia.js"><img src="https://img.shields.io/npm/v/fugapedia.js?&maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/fugapedia.js"><img src="https://img.shields.io/npm/dt/fugapedia.js?&maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

# Introduction
Node.js module to easily interact with the Fugapedia API  
The [Fugapedia](https://fugapedia.xyz) supports only the Russian language, so that all information below will be in Russian.

## Установка
### npm
```
npm i fugapedia.js
```
### Yarn
```
yarn add fugapedia.js
```
### pnpm
```
pnpm add fugapedia.js
```

## Пример использования
### JavaScript
```js
const Fugapedia = require('fugapedia.js');

const client = new Fugapedia.Client().setKey('myAPIKey');

const main = async () => {
  const article = await client.getArticle('Кирилл_Баранов', { limit: 100 });
  console.log(article);

  const url = Fugapedia.makeImageURL('Syjalo', 'jpeg');
  console.log(url);
}
main();
```
### TypeScript
```ts
import { Client, makeImageURL } from 'fugapedia.js';

const client = new Client().setKey('myAPIKey');

const main = async () => {
  const article = await client.getArticle('Кирилл_Баранов', { limit: 100 });
  console.log(article);

  const url = makeImageURL('Syjalo', 'jpeg');
  console.log(url);
}
main();
```
