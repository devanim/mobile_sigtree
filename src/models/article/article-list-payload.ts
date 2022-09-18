import ArticleBrief from "./article-brief";

export default class ArticleListPayload {
  public status!: string;
  public message!: string;
  public data: PayloadData | undefined;
  public error = "";
}

class PayloadData {
  public articles: ArticleBrief[] | undefined;
  public more!: boolean;
}