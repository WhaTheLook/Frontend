import { http, HttpResponse } from "msw";

import { API_URL } from "@/constants";
import { data } from "./data";

export const qnaLatestHandlers = [
    http.get(`${API_URL}/post/postList/latest`, async ({ request }) => {
        const url = new URL(request.url);
        const params = new URLSearchParams(url.search);
        const page = Number(params.get('page'));
        const size = Number(params.get('size'));
        
        const totalLength = data.content.length;
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const currentContent = data.content.slice(startIndex, endIndex);
        const nextPage =  endIndex < totalLength ? page + 1 : null;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return HttpResponse.json({ status: 200, content: currentContent, nextPage });
    })
]
