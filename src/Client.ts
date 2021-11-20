import { Route } from '.';
import { REST } from './REST';

/**
 * Client to interact with Fugapedia API
 */
export class Client {
  public options: unknown;

  #rest: REST = new REST();

  constructor(options: unknown) {
    this.options = options;
  }

  /**
   * Sets API Key
   * @param {string} key API Key
   * @returns {Client}
   */
  public setKey(key: string) {
    this.#rest.requestManager.setKey(key);
    return this;
  }

  /**
   * Options used to get an article
   * @typedef {Object} GetArticleOptions
   * @property {ArticleResponseType} [responseType] Type of an article content formate
   * @property {number} [limit] Limit of an article content symbols
   */

  /**
   * 
   * @param {string} id ID of an article that will be got
   * @param {GetArticleOptions} options Options for geting an article
   * @returns 
   */
  public getArticle(
    id: string,
    options: { responseType?: ArticleResponseType, limit?: number } = {},
  ) {
    const { responseType = ArticleResponseType.Text, limit } = options;
    const query = new URLSearchParams();
    query.append('article', id);
    query.append('type', responseType);
    if (limit) query.append('limit', `${limit}`);
    return this.#rest.get(Route.Article, query);
  }
}

export const enum ArticleResponseType {
  Text = '1',
  WikiMarkup = '2',
}
