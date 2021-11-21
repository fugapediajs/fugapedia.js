import { DefaultOptions } from '.';
import { REST } from './REST';
import { APIArticleResponseType, RESTGetAPIArticleResponse, RouteBases, Routes } from 'fugapedia-api-types/v1';
import { Article } from './Article';

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
   * 
   * @param {string} id ID of an article that will be got
   * @param {GetArticleOptions} options Options for geting an article
   * @returns {Article}
   */
  public async getArticle(
    id: string,
    options: { responseType?: APIArticleResponseType, limit?: number } = {},
  ) {
    const { responseType = APIArticleResponseType.Text, limit = this.options.articleSymbolsLimit } = options;
    const query = new URLSearchParams();
    query.append('article', id);
    query.append('type', responseType);
    if (limit) query.append('limit', `${limit}`);
    const data = await this.#rest.get<RESTGetAPIArticleResponse>(Routes.article(), query);
    return new Article(this, data);
  }

  /**
   * 
   * @param {string} name Name of image
   * @param {AllowedImageFormats} format Image format. Can be `png`, `jpg`, `jpeg` or `gif`
   * @returns {string}
   */
  public getImageURL(name: string, format: AllowedImageFormats) {
    if (!Object.values(AllowedImageFormats).includes(format)) throw new Error(`Invalid image format ${format}`);
    return `${RouteBases.images}/${name}.${format}`;
  }
}

export interface ClientOptions {
  articleSymbolsLimit?: number
}

export enum AllowedImageFormats {
  PNG = 'png',
  JPG = 'jpg',
  JPEG = 'jpeg',
  GIF = 'gif'
}