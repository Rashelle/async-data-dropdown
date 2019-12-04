const API_URL = "https://web-backend-dev.zeitgold.com/graphql";

export default class ZeitgoldApiService {
  static getBusinessSuppliers(businessId) {
    const query = `query($businessId: ID!) {
      businessSuppliers(businessId: $businessId) {
        edges {
          node {
            id
            displayName
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }`;

    const variables = { businessId };

    return this.executeApiRequest(query, variables).then(result => {
      if (result && result.data) {
        return result.data.businessSuppliers.edges.map(
          supplier => supplier.node
        );
      }

      return [];
    });
  }

  static executeApiRequest(query, variables) {
    const params = new URLSearchParams();
    params.append("query", query);
    params.append("variables", JSON.stringify(variables));

    return fetch(API_URL, {
      method: "POST",
      body: params
    }).then(res => res.json());
  }
}
