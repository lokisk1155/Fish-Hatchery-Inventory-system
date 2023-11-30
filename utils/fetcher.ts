export const fetcher = (url: string) =>
  fetch(process.env.NEXT_PUBLIC_URL + url).then((res) => res.json())
