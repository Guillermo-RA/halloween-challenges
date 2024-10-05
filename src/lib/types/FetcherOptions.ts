export type FetcherOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE" | string;
    contentType?: string;
    body?: Record<string, string>;
}