export function absoluteUrl(localhost: string): string {
  const isDev = process.env.NODE_ENV === `development`;
  if (isDev) return `http://${localhost}`;

  return `https://pars-shop-server.dominiktomcik23.now.sh`;
}
