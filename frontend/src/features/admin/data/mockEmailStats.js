/**
 * Placeholder data — the backend has no endpoint yet to list or count
 * blog subscribers (only POST /api/front/blog/subscriptions/ exists).
 * Replace this whole file's usage in AdminEmailsPage once
 * GET /api/admin/blog/subscriptions/stats/ ships; nothing else on this
 * page should need to change beyond swapping the data source.
 */
export const MOCK_EMAIL_STATS = {
  total: 342,
  newThisWeek: 28,
  growthPercent: 8.9,
};

export const MOCK_RECENT_SUBSCRIBERS = [
  { email: "sara.ahmadi@example.com", subscribedAt: "1404/05/16" },
  { email: "reza.karimi@example.com", subscribedAt: "1404/05/15" },
  { email: "niloofar.m@example.com", subscribedAt: "1404/05/15" },
  { email: "hosseinzadeh.dev@example.com", subscribedAt: "1404/05/14" },
  { email: "parisa.sadeghi@example.com", subscribedAt: "1404/05/13" },
];
