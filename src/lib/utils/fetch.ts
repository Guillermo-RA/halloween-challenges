import type { FetcherOptions } from '@/lib/types/FetcherOptions';


const DEFAULT_CONTENT_TYPE = "application/json";

export async function fetcher(url: string, rawData: object | FormData, options: FetcherOptions = {method: "GET", contentType:DEFAULT_CONTENT_TYPE}): Promise<object> {

    const haveBody = ["POST", "PUT", "PATCH"].includes(options.method as string);
    const data = haveBody ? typeof rawData === "object" ? JSON.stringify(rawData) : (rawData as FormData) : null;

    const res = await fetch(url, {
        method: options.method,
        headers: {
            "Content-Type": options.contentType ?? DEFAULT_CONTENT_TYPE,
        },
        body: data
    });

    const response = await res.json();

    if (!res.ok) {
        throw new Error(response.message);
    }

    return response;
}