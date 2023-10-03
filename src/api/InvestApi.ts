export class InvestApi {
  static url: string = "http://localhost:8888/";

  static async testToken(token: string) {
    const req = await fetch(
      this.url +
        "token/test?" +
        new URLSearchParams({
          token: token,
        }),
      {
        method: "PUT",
      }
    );
    return await req.text();
  }

  static async getAccounts(token: string) {
    const req = await fetch(this.url + "account/all", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    return await req.json();
  }

  static async getPortfolio(token: string, accountId: string) {
    const req = await fetch(this.url + "portfolio/" + accountId, {
      method: "GET",
      headers: {
        token: token,
      },
    });
    return await req.json();
  }

  static async getAllBonds(token: string) {
    const req = await fetch(this.url + "bond/all", {
      method: "GET",
      headers: {
        token: token,
      },
    });
    return await req.json();
  }
}
