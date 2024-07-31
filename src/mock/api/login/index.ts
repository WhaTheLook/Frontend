import { http, HttpResponse } from "msw";

import { API_URL } from "@/constants";

export const loginHandlers = [
    http.post(`${API_URL}/user/token/login`, ({ request }) => {
        const { url } = request;
        const parsedUrl = new URL(url);
        const code = parsedUrl.searchParams.get('accessToken'); 

        if (!code) {
            return HttpResponse.json({
                    status: 400,
                    error: 'Code parameter is required'
            })
        }
        
        return HttpResponse.json({ 
            status: 200,
            refreshToken: "refreshToken",
            accessToken: "accessToken"
        });
    })
];
