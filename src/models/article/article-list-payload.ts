import ArticleBrief from "./article-brief";

export default class ArticleListPayload {
  public status!: string;
  public message!: string;
  public data: ArticleListPayloadData | undefined;
  public error = "";
}

class ArticleListPayloadData {
  public articles: ArticleBrief[] | undefined;
  public more!: boolean;
}