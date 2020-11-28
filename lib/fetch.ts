export default async function fetcher(
  url: string,
  args: Record<string, any> = {},
  req: Record<string, any> = {}
): Promise<any> {
  args = {
    ...args,
    credentials: "include",
    headers: {
      ...(args?.headers || {}),
      Cookie: req.headers?.cookie,
      "Content-Type": "text/json",
    },
  };

  const res = await fetch(url, args);
  if (!res.ok) {
    throw res;
  }
  // TODO: handle 4xx statuses
  return res.json();
}

export function parseErrors(err: any): Record<string, any> {
  if (
    err.response?.status &&
    err.response.status >= 400 &&
    err.response.status < 500
  ) {
    const {
      response: { data },
    } = err;
    const { ok, ...errors } = data;

    return { ok, ...errors };
  }

  return {};
}
