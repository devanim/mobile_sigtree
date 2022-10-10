export const AUTH_MOCK = {
  BASE_URL: "https://customer1.sigtree.com",
  VERSION: "v1",
  TOKEN: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYVG11RFZKXzczanp1RURyV0duY09iNzFaQkFKWUhLM2xsc29va084T2drIn0.eyJleHAiOjE2NjU0MjkwNzgsImlhdCI6MTY2NTQyODc3OCwianRpIjoiMDdjYmZkNmItMDFmMC00MTg0LWE0ZjYtZGUxMTQwNGY2MjIyIiwiaXNzIjoiaHR0cHM6Ly9zc28uc2lndHJlZS5jb20vYXV0aC9yZWFsbXMvY3VzdG9tZXIxIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjUyOGNmOWZjLTIyNmItNDljYy1hMzI3LTlkNGYwZWMwZjQwNSIsInR5cCI6IkJlYXJlciIsImF6cCI6InNpZ3RyZWUiLCJzZXNzaW9uX3N0YXRlIjoiZmMzNTRmMDUtNmRmMS00MWZhLTlhMDQtODE2YWVhMTc2ZDY1IiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zaWd0cmVlIiwidW1hX2F1dGhvcml6YXRpb24iLCJBRE1JTiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsInNpZCI6ImZjMzU0ZjA1LTZkZjEtNDFmYS05YTA0LTgxNmFlYTE3NmQ2NSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLXNpZ3RyZWUiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIl0sIm5hbWUiOiJBZG1pbiBDdXN0b21lciIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluLmN1c3RvbWVyIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwidXNlcklkIjoiMiIsImZhbWlseV9uYW1lIjoiQ3VzdG9tZXIiLCJlbWFpbCI6ImFkbWluLmN1c3RvbWVyQGN1c3RvbWVyLWRvbWFpbi5jb20ifQ.Fq8szXTfOhpyDVTLVStVjNbcBAV0LoaKcmujt_Hxj0gWAUcJRKT-4vRxBsWI8NCMpBSR42o_6v99XqRhKPFmjyBc5TijzCHKQ5Tv761kfKAnlRRkTRRt2c-gaZ_ZHflZg8UENsPa5ldS4UIYdIRPbwH_8ziZMqVA2IljtEs63TtDp6fUeuoPd3r4cUjxKk0Wt75RAf2HWJb8PD6Bp8dbSP2gcAwPsBzjBKCjDQeE--150Xe8Pcv9o_uX8EXgRvce_teypg-rC6IiE9j4nHT3xIwvk0f29Ha7LDw14x9wvgRkq3M5SOMkXC-s0ZkZ_VZ73biGmmnmONnM7N_YF5E1uw"
}

export const SCREEN_URL = {
  TOS_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/tos`,
  ARTICLES_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/articles`,
  ARTICLE_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/article`,
  TICKETS_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/tickets`,
  TICKET_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/ticket`,
  USER_PROFILE_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/user`,
}

export const CONFIG = {
  ITEMS_PER_PAGE: "30"
}