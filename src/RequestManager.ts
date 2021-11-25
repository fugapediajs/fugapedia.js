import fetch, { RequestInit } from 'node-fetch';
import { BaseResponse } from 'fugapedia-api-types/v1';
import { HTTP } from './Constants';
import { resolveQuery } from './Util';

export class RequestManager {
  #key: string | null = process.env.FUGAPEDIA_KEY ?? null;

  /**
   * Sets API Key
   * @param {string} key API Key
   */
  public setKey(key: string): void {
    if (typeof key !== 'string') throw new Error('Type of key is not a string');
    this.#key = key;
  }

  /**
   * Sends an request to the route
   * @param {Request} request All the information needed to make a request
   * @returns {R extends BaseResponse}
   */
  public async request<R extends BaseResponse>(request: Request) {
    const res = await fetch(...this.resolveRequest(request));
    if (!res.ok) throw new Error(`${res.status}: Failed to fetch`);
    const json = await res.json() as R;
    if (json.result === 'Error') throw new Error(json.message);
    return json;
  }

  /**
   * Resolevs given request
   * @param {Request} request Request options
   * @private
   */
  private resolveRequest(request: Request): [string, RequestInit] {
    if (!this.#key) throw new Error('You haven\'t set an API key');
    const query = resolveQuery({ key: this.#key, ver: HTTP.version }, request.query);

    const url = `${HTTP.api}${request.route}?${query}`;

    const requestInit: RequestInit = {
      method: request.method,
    };

    return [url, requestInit];
  }
}

/**
 * Represents possible data to be given to an route
 */
 export interface RequestData {
  /**
   * Query string parameters to append to the called route
   */
  query?: URLSearchParams;
}

/**
 * Internal request options
 * @internal
 */
 export interface Request extends RequestData {
  method: RequestMethod;
  route: RouteLike;
}

/**
 * Possible API methods to be used when doing requests
 */
 export const enum RequestMethod {
  Get = 'get',
}

export type RouteLike = `/${string}`;
