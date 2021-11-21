import { RouteBases } from 'fugapedia-api-types/v1';

export const DefineHiddenProperty = <T>(target: T, key: keyof T) => {
  let value: unknown;
  Object.defineProperty(target, key, { 
    get: () => value,
    set: (v) => value = v,
   })
}

export const resolveQuery = (query: { [key: string]: string | number }, ...extra: Array<URLSearchParams | undefined>) => {
  const q = new URLSearchParams();

  if (extra.length > 0) {
    extra.forEach((extraQuery) => {
      if (!extraQuery) return;
      for (const p of extraQuery) q.set(...p);
    })
  }
  for (const [key, value] of Object.entries(query)) q.set(key, String(value));

  return q;
}

export type AllowedImageFormat = 'png' | 'jpg' | 'jpeg' | 'gif';
const AllowedImageFormats = ['png', 'jpg', 'jpeg', 'gif'];

/**
 * @param {string} name Name of image
 * @param {AllowedImageFormats} format Image format. Can be `png`, `jpg`, `jpeg` or `gif`
 * @returns {string}
 */
export const makeImageUrl = (name: string, format: AllowedImageFormat) => {
  if (!AllowedImageFormats.includes(format)) throw new Error(`Invalid image format`);
  return `${RouteBases.images}/${name}.${format}`;
}
