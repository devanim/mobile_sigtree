export const AUTH_MOCK = {
  BASE_URL: "https://customer1.sigtree.com",
  VERSION: "v1",
  TOKEN: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYVG11RFZKXzczanp1RURyV0duY09iNzFaQkFKWUhLM2xsc29va084T2drIn0.eyJleHAiOjE2NjU5NDM1ODcsImlhdCI6MTY2NTk0MzI4NywianRpIjoiNDFkY2ZjMDItNDI1Yy00NjUzLWE5OTYtN2E0OTMzZjBiOGFkIiwiaXNzIjoiaHR0cHM6Ly9zc28uc2lndHJlZS5jb20vYXV0aC9yZWFsbXMvY3VzdG9tZXIxIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjE0MGRkOTU5LWZjOTUtNDNkMi05ZWJiLWJhYTA4NmI1YWFjZCIsInR5cCI6IkJlYXJlciIsImF6cCI6InNpZ3RyZWUiLCJzZXNzaW9uX3N0YXRlIjoiNzQxZjU1YzAtNDUxMy00ZWJlLWExMWEtZTgyNjc1MTg5MGUxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zaWd0cmVlIiwidW1hX2F1dGhvcml6YXRpb24iLCJTRVJWSUNFIFBST1ZJREVSIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNzQxZjU1YzAtNDUxMy00ZWJlLWExMWEtZTgyNjc1MTg5MGUxIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc2lndHJlZSIsInVtYV9hdXRob3JpemF0aW9uIiwiU0VSVklDRSBQUk9WSURFUiJdLCJuYW1lIjoiQ2xlYW4gQi0xIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2xlYW4uYjEiLCJnaXZlbl9uYW1lIjoiQ2xlYW4iLCJ1c2VySWQiOiIxNCIsImZhbWlseV9uYW1lIjoiQi0xIiwiZW1haWwiOiJjbGVhbi5iMUBjbGVhbmluZy5jb20ifQ.U58aMkTHpOgGLYHw7PPrUKFdpynEGSWbL5GYZBh3-BQAJOMnXqwBlsx47Ll-_5cpDY74hI8MwE2HvoqYOGtjwm6-igjSxBJVkgVz9lDz_6AwIZrzP5fdLqmBvdO9pZNBNAA_UG-WP7dvzyrtGhvHf-KROQ2gPSDHPKfcMPLattFePVO7f7FXvzPogMGOyZp9KiU7uzzIT3tVj5pN6kVVkDQP05SuKLoThZmG4GMR3LCpA-mPOsfVpDSv90-N8DGQ4iAhcTidZl97bE8CiMpg9k4DnVb2vvcVaKeWi2h6q6lDbvsAlQpRSYExuLGUTLsrxLsZtbuz3a3ZR2G_NYSIXg"
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