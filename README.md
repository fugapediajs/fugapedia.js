# fugapedia.js
<p align="center">
  <a href="https://www.npmjs.com/package/fugapedia.js"><img src="https://img.shields.io/npm/v/fugapedia.js?color=FF6E1B&maxAge=3600" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/fugapedia.js"><img src="https://img.shields.io/npm/dt/fugapedia.js?color=FF6E1B&maxAge=3600" alt="npm downloads" /></a>
</p>

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
  main();
}
```
### TypeScript
```ts
import { Client } from 'fugapedia.js';
import { makeImageURL } from './Util';

const client = new Client().setKey('myAPIKey');

const main = async () => {
  const article = await client.getArticle('Кирилл_Баранов', { limit: 100 });
  console.log(article);

  const url = makeImageURL('Syjalo', 'jpeg');
  console.log(url);
}
main();
```
