import { BaseData, Payload } from "../payload";
import ArticleBrief from "./article-brief";

export default class ArticleListPayload extends Payload {
  declare public data: ArticleListPayloadData;
}

class ArticleListPayloadData implements BaseData {
  public articles: ArticleBrief[] | undefined;
  public more!: boolean;
}