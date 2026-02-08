// src/api/mutator.ts
import { getToken } from "@/src/shared/lib/auth/token";

const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4010";

// 인증 불필요한 엔드포인트
const PUBLIC_ENDPOINTS = [
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/refresh",
  "/api/auth/check-username",
];

export async function customFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  // 인증 필요한 요청이면 토큰 주입
  const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.startsWith(ep));
  const headers = new Headers(options.headers);

  if (!isPublic) {
    const tokenData = await getToken();
    if (tokenData?.accessToken) {
      headers.set("Authorization", `Bearer ${tokenData.accessToken}`);
    }
  }

  const res = await fetch(fullUrl, { ...options, headers });

  const body = [204, 205, 304].includes(res.status) ? null : await res.text();

  let data = {};
  if (body) {
    try {
      data = JSON.parse(body);
    } catch {
      throw new Error(
        `서버 응답 파싱 실패 (status: ${res.status}, url: ${url}): ${body.substring(0, 200)}`,
      );
    }
  }

  return { data, status: res.status, headers: res.headers } as T;
}
