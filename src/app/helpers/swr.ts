export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try {
    const res = await fetch(input, init);
    return res.json();
  }
  catch (e) {
    throw e;
  }
}
