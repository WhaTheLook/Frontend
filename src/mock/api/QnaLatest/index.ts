import { http, HttpResponse } from "msw";

import { API_URL } from "@/constants";
import { data } from "./data";

export const qnaLatestHandlers = [
    http.get(`${API_URL}/post/postList`, () => {
        return HttpResponse.json({ status: 200, data});
    })
]
