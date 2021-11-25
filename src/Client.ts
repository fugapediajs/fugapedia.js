import { APIArticleResponseType, RESTGetAPIArticleResponse, Routes } from 'fugapedia-api-types/v1';
import { Article } from './Article';
import { DefaultOptions } from '.';
import { REST } from './REST';
import { resolveQuery } from './Util';

/**
 * Client to interact with Fugapedia API
 */
export class Client {
  public options: ClientOptions;

  #rest: REST = new REST();

  constructor(options?: ClientOptions) {
    /**
     * The options the client was instantiated with
     * @type {ClientOptions}
     */
    this.options = { ...DefaultOptions, ...options };
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
   * @property {APIArticleResponseType} [responseType] Type of an article content formate
   * @property {number} [limit] Limit of an article content symbols
   */

  /**
   * Returns the article by request
   * @param {string} id ID of an article that will be got
   * @param {GetArticleOptions} options Options for geting an article
   * @returns {Article}
   */
  public async getArticle(
    id: string,
    options: { responseType?: APIArticleResponseType, limit?: number } = {},
  ) {
    const { responseType = APIArticleResponseType.Text, limit = this.options.articleSymbolsLimit } = options;
    let query = resolveQuery({ article: id, type: responseType });
    if (limit) query = resolveQuery({ limit }, query);
    const data = await this.#rest.get<RESTGetAPIArticleResponse>(Routes.article(), query);
    return new Article(this, data);
  }
}

export interface ClientOptions {
  articleSymbolsLimit?: number
}
