import { http, HttpResponse } from "msw";

import { API_URL } from "@/constants";
import { data } from "./data";

export const userInfoHandlers = [
    http.get(`${API_URL}/user/info`, ({ request }) => {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return HttpResponse.json({
                    status: 401,
                    error: "Unauthorized"
            });
        }

        const accessToken = authHeader.split(' ')[1];

        if (accessToken !== 'accessToken') {
            return HttpResponse.json({
                status: 403,
                error: "Forbidden"
            });
        }

        return HttpResponse.json({ status: 200, data });
    })
];