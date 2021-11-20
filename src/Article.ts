import { Client, ResponseData } from '.';

/**
 * An article on Fugapedia
 */
export class Article {
  public readonly client: Client
  public article: string
  public articleContent: string

  constructor(client: Client, data: ArticleRawData) {
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

export interface ArticleRawData extends ResponseData {
  article: string
  article_content: string
}
