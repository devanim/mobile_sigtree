import ArticleBrief from "./article-brief";

export default class Article extends ArticleBrief {
  public owners!: string[];
  public content!: string;
}