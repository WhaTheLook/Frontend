import { http, HttpResponse } from "msw";

import { API_URL } from "@/constants";
import { data } from "./data";

export const qnaPopularHandlers = [
    http.get(`${API_URL}/post/postList/popular`, ({ request }) => {
        const url = new URL(request.url);
        const params = new URLSearchParams(url.search);
        const page = Number(params.get('page'));
        const size = Number(params.get('size'));
        
        const totalLength = data.content.length;
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const currentContent = data.content.slice(startIndex, endIndex);
        const nextPage =  endIndex < totalLength ? page + 1 : null;

        return HttpResponse.json({ status: 200, content: currentContent, nextPage });
    })
]




