import { RequestMethod, RouteLike } from '.';
import { RequestManager } from './RequestManager';
import { BaseResponse } from 'fugapedia-api-types';

export class REST {
  public readonly requestManager: RequestManager;

  constructor() {
    this.requestManager = new RequestManager();
  }

  /**
   * Sends a get request to the api
   * @param {RouteLike} route Route of the API to send an request to
   * @param {URLSearchParams} query Query params of the request
   * @returns 
   */
  public get<R extends BaseResponse>(route: RouteLike, query: URLSearchParams) {
    return this.requestManager.request<R>({
      method: RequestMethod.Get,
      route,
      query,
    });
  }
}
