export function apiUrl(path: string) {
  // @ts-ignore
  const isDev = process.env.NODE_ENV === `development`;
  if (isDev) {
    return `http://localhost:9999/api/${path}`;
  } else {
    return ``;
  }
}
