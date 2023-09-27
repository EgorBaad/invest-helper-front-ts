export class InvestApi {
    static url: string = "http://localhost:8888/";

    static async setToken(token: string) {
        const req = await fetch(this.url + "token/set?" + new URLSearchParams({
            token: token
        }), {
            method: "PUT"
        });
        return await req.text();
    }
}