import { Payload } from "../payload";
import Article from "./article";

export default class ArticlePayload extends Payload {
  declare public data: Article;
}