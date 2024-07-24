import { http } from "msw";

import { API_URL } from "@/constants";

export const loginHandlers = [
    http.post(`${API_URL}/user/login`, (req, res, ctx) => {
        const code = req.url.searchParams.get('code');

        if (!code) {
            return res(
                ctx.status(400),
                ctx.json({
                    error: 'Code parameter is required'
                })
            );
        }

        // 로그인을 성공한 경우
        return res(
            ctx.status(200),
            ctx.json({ 
                refreshToken: "refreshToken",
                accessToken: "accessToken"
            })
        );
    })
];
