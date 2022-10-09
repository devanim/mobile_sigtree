export const AUTH_MOCK = {
  BASE_URL: "https://customer1.sigtree.com",
  VERSION: "v1",
  TOKEN: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJYVG11RFZKXzczanp1RURyV0duY09iNzFaQkFKWUhLM2xsc29va084T2drIn0.eyJleHAiOjE2NjUzNDAyMzAsImlhdCI6MTY2NTMzOTkzMCwianRpIjoiYTQ5NThhYjQtOGQzOC00Mzg4LTk2MmEtZWQ2M2E4NjExZGNiIiwiaXNzIjoiaHR0cHM6Ly9zc28uc2lndHJlZS5jb20vYXV0aC9yZWFsbXMvY3VzdG9tZXIxIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA2ZTI1MWU4LWY0MmMtNDM5NS1hYTQ4LTQyY2Q0YzdkM2E2YSIsInR5cCI6IkJlYXJlciIsImF6cCI6InNpZ3RyZWUiLCJzZXNzaW9uX3N0YXRlIjoiYjViMGViMTktMjY1ZS00NzMzLTgyNDEtODkyZWUyNjEzYmFlIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zaWd0cmVlIiwidW1hX2F1dGhvcml6YXRpb24iLCJURU5BTlQiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJzaWQiOiJiNWIwZWIxOS0yNjVlLTQ3MzMtODI0MS04OTJlZTI2MTNiYWUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zaWd0cmVlIiwidW1hX2F1dGhvcml6YXRpb24iLCJURU5BTlQiXSwibmFtZSI6IlNvZnRFeHBlcnRzIEEtMSIsInByZWZlcnJlZF91c2VybmFtZSI6InNvZnRleHBlcnRzLmExIiwiZ2l2ZW5fbmFtZSI6IlNvZnRFeHBlcnRzIiwidXNlcklkIjoiMTgiLCJmYW1pbHlfbmFtZSI6IkEtMSIsImVtYWlsIjoic29mdGV4cGVydHMuYTFAc29mdGV4cGVydHMuY29tIn0.WIN-0AVx6uFPelkOhXUiV4T3pAsyuXCYog_AAysg4KSnZMvlzScZYCCYzJP9ZGa0oAwWRRbhfU8zyuTMIPdP-hZMJ27q3_cmG9lMjkJ4LJaPDVEDLfblCOsBv1AHslsOLumyr-VOi9mD9rbq0mWoqR_Lxab-GG4wqE232-qReRDcUNWe1RTS4ZRu8mtVeI__y_-lQ05NFAXr6Ho16YbsI-kHF4--yA7ZQ-mfmiUzrlxjDRSOHuqq2MQEPCHb_1KPvMlWl_Lzi_37gnkv9T9jdqKti9UNAS3lr1GCFPM0iHroc0V3smvzKJcQ06lA695G8q6qGknnXFWcYnhR2RA8Zw"
}

export const SCREEN_URL = {
  TOS_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/tos`,
  ARTICLES_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/articles`,
  ARTICLE_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/article`,
  USER_PROFILE_URL: `${AUTH_MOCK.BASE_URL}/api/${AUTH_MOCK.VERSION}/user`,
}

export const CONFIG = {
  ITEMS_PER_PAGE: "30"
}