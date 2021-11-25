import { Client } from '.';
import { DefineHiddenProperty } from './Util';
import { RESTGetAPIArticleResponse } from 'fugapedia-api-types/v1';

/**
 * An article on Fugapedia
 */
export class Article {
  @DefineHiddenProperty public readonly client: Client;
  public article: string;
  public articleContent: string;

  constructor(client: Client, data: RESTGetAPIArticleResponse) {
    /**
     * The client that instantiated this
     * @type {Client}
     * @readonly
     */
    this.client = client;

    /**
     * The article id
     * @type {string}
     */
    this.article = data.article;

    /**
     * The article content
     * @type {string}
     */
    this.articleContent = data.article_content;
  }
}
