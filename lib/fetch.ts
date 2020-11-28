import Cookies from "js-cookie";

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
      "Content-Type": "application/json",
    },
  };

  // include data in post
  const data = args["data"];
  if (data) {
    args["body"] = JSON.stringify(data);
    delete args["data"];
  }

  if (["post", "put"].indexOf(args.method?.toLowerCase()) !== -1) {
    const csrf = Cookies.get("sspec_csrf");
    args.headers["x-csrftoken"] = csrf;
    console.log(csrf);
  }

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
