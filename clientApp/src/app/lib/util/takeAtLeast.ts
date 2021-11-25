
export async function takeAtLeast<TRes>(
  promise: Promise<TRes>,
  ms = 0
): Promise<TRes> {
  const timeout = new Promise(resolve => setTimeout(resolve, ms));
  const [res] = await Promise.all([promise, timeout]);
  return res;
}