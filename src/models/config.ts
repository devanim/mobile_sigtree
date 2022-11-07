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
  ITEMS_PER_PAGE: "12",
  ITEMS_PER_CAROUSEL: "5"
}

export const COLORS = {
  BORDER_COLOR: "#626262",
  TICKET_NEW: "#f23543",
  TICKET_READ: "#4353ff",
  TICKET_PROGRESS: "#f8d053",
  TICKET_PENDING: "#000000",
  TICKET_RESOLVED: "#10cfbd",
  TICKET_CLOSED: "#7252d3",
  TICKET_REJECTED: "#929aac",
}

export class SigtreeConfiguration {
  public static getUrl = (realm: string, endpoint: string) => {
    return `https://${realm}.sigtree.com/api/${VERSION}/${endpoint}`;
  }

  public static getTicketStatusColor = (status: string): string => {
    switch(status) {
      case "TICKET_NEW": return COLORS.TICKET_NEW
      case "TICKET_READ": return COLORS.TICKET_READ
      case "TICKET_IN_PROGRESS": return COLORS.TICKET_PROGRESS
      case "TICKET_PENDING": return COLORS.TICKET_PROGRESS
      case "TICKET_RESOLVED": return COLORS.TICKET_RESOLVED
      case "TICKET_CLOSED": return COLORS.TICKET_CLOSED
      case "TICKET_REJECTED": return COLORS.TICKET_REJECTED
      default: return "#ffffff"
    }
  }
}
