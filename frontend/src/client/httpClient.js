import { env } from "./env";

/**
 * ApiError normalises every failure (network, HTTP, parsing) into one shape
 * so callers never have to guess whether `err.response` exists.
 */
export class ApiError extends Error {
  constructor(message, { status = null, data = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const TOKEN_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const tokenStorage = {
  getAccess: () => localStorage.getItem(TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access, refresh) => {
    if (access) localStorage.setItem(TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

/**
 * Minimal fetch wrapper: builds the URL, attaches the auth header,
 * serialises JSON bodies and throws a normalised ApiError on failure.
 * This is a drop-in replacement for the previous axios-based fetcher,
 * so the rest of the app never has to know it changed.
 */
async function request(path, { method = "GET", body, headers = {}, auth = true, signal } = {}) {
  const url = `${env.apiBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

  const finalHeaders = { "Content-Type": "application/json", ...headers };
  if (auth) {
    const token = tokenStorage.getAccess();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (networkError) {
    throw new ApiError("امکان برقراری ارتباط با سرور وجود ندارد.", { status: null, data: networkError });
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const detail = payload?.detail;
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg).join(" | ")
      : typeof detail === "string"
        ? detail
        : "خطایی رخ داد. لطفاً دوباره تلاش کنید.";
    throw new ApiError(message, { status: response.status, data: payload });
  }

  return payload;
}

export const httpClient = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};
