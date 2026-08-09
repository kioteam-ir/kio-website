import { httpClient } from "../client/httpClient";

export const blogApi = {
  emailSubscription: (email) =>
    httpClient.post("/api/front/blog/subscriptions/", { email: email }),
};
