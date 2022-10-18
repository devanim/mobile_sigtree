export const AUTH_MOCK = {
  BASE_URL: "https://customer1.sigtree.com",
  VERSION: "v1"
}

export const SCREEN_URL = {
  TOS_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/tos`,
  ARTICLES_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/articles`,
  ARTICLE_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/article`,
  TICKETS_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/tickets`,
  TICKET_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/ticket`,
  USER_PROFILE_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/user`,
  STATISTICS_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/statistics`
}

export const CONFIG = {
  ITEMS_PER_PAGE: "6",
  ITEMS_PER_CAROUSEL: "5"
}