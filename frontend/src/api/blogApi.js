import { httpClient } from "../client/httpClient";

export const projectApi = {
  emailSubscription: (email) =>
    httpClient.post("/api/front/blog/subscriptions/", { email: email }),
};
