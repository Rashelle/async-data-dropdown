const API_URL = "https://web-backend-dev.zeitgold.com/graphql";

export default class ZeitgoldApiService {
  static async getBusinessSuppliers(businessId) {
    const query = `query($businessId: ID!) {
      businessSuppliers(businessId: $businessId) {
        edges {
          node {
            id
            displayName
          }
        }
      }
    }`;

    const variables = { businessId };
    const result = await this.executeApiRequest(query, variables);
    return result.businessSuppliers.edges.map(supplier => supplier.node);
  }

  static async executeApiRequest(query, variables) {
    const params = new URLSearchParams();
    params.append("query", query);
    params.append("variables", JSON.stringify(variables));

    const response = await fetch(API_URL, {
      method: "POST",
      body: params
    });
    const result = await response.json();
    if (result.errors) {
      throw new Error("Error from Zeitgold API");
    }
    return result.data;
  }
}
