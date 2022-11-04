export const SCREEN_URL = {
  TOS_URL: "tos",
  ARTICLES_URL: "articles",
  ARTICLE_URL: "article",
  TICKETS_URL: "tickets",
  TICKET_URL: "ticket",
  USER_PROFILE_URL: "user",
  STATISTICS_URL: "statistics",
  LANGUAGES_URL: "languages",
  DEVICES: "devices"
}

export const VERSION = "v1";

export const CONFIG = {
  ITEMS_PER_PAGE: "6",
  ITEMS_PER_CAROUSEL: "5"
}

export class SigtreeConfiguration {
  public static getUrl = (realm: string, endpoint: string) => {
    return `https://${realm}.sigtree.com/api/${VERSION}/${endpoint}`;
  }
}
