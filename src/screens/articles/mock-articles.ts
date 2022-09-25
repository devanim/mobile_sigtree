import Article from "../../models/article/article";
import ArticleListPayload from "../../models/article/article-list-payload";

const base64ImageData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
const htmlContentData = "<h1>This is a Heading</h1><p>This is a paragraph.</p>";

export const mockArticles: ArticleListPayload = {
  status: "ok",
  message: "A message for the user",
  error: "",
  data: {
    articles: [
      {
        id: 1,
        tags: "tag1,tag2",
        title: "Title T1",
        excerpt: "Short description for article 1...",
        image: base64ImageData,
        timestamp: "2022-09-15T14:42:16.067Z"
      }, {
        id: 2,
        tags: "tag2",
        title: "Title T2",
        excerpt: "Short description for article 2...",
        image: base64ImageData,
        timestamp: "2022-09-14T14:42:16.067Z"
      }, {
        id: 3,
        tags: "tag1",
        title: "Title T3",
        excerpt: "Short description for article 3...",
        image: base64ImageData,
        timestamp: "2022-09-14T12:42:16.067Z"
      }, {
        id: 4,
        tags: "tag1,tag2, tag3",
        title: "Title T4",
        excerpt: "Short description for article 4...",
        image: base64ImageData,
        timestamp: "2022-09-14T14:43:16.067Z"
      }, {
        id: 5,
        tags: "tag1,tag3",
        title: "Title T5",
        excerpt: "Short description for article 5...",
        image: base64ImageData,
        timestamp: "2022-08-14T14:42:16.067Z"
      }, {
        id: 6,
        tags: "tag3",
        title: "Title T6",
        excerpt: "Short description article 6...",
        image: base64ImageData,
        timestamp: "2022-09-11T14:42:16.067Z"
      }
    ],
    more: true
  }
};

export const finalArticlesMock: ArticleListPayload = {
  status: "ok",
  message: "A message for the user",
  error: "",
  data: {
    articles: [
      {
        id: 1,
        tags: "tag1,tag2",
        title: "Title T1",
        excerpt: "Short description for article 1...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-15T14:42:16.067Z"
      }, {
        id: 2,
        tags: "tag2",
        title: "Title T2",
        excerpt: "Short description for article 2...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-14T14:42:16.067Z"
      }, {
        id: 3,
        tags: "tag1",
        title: "Title T3",
        excerpt: "Short description for article 3...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-14T12:42:16.067Z"
      }, {
        id: 4,
        tags: "tag1,tag2, tag3",
        title: "Title T4",
        excerpt: "Short description for article 4...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-14T14:43:16.067Z"
      }, {
        id: 5,
        tags: "tag1,tag3",
        title: "Title T5",
        excerpt: "Short description for article 5...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-08-14T14:42:16.067Z"
      }, {
        id: 6,
        tags: "tag3",
        title: "Title T6",
        excerpt: "Short description article 6...",
        image: "data:image/jpeg;base64,...",
        timestamp: "2022-09-11T14:42:16.067Z"
      }
    ],
    more: false
  }
};

export const mockIndividualArticlesList: Article[] = [
  {
    id: 1,
    tags: "tag1,tag2",
    title: "Title T1",
    excerpt: "Short description for article 1...",
    image: base64ImageData,
    timestamp: "2022-09-15T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: htmlContentData
  }, {
    id: 2,
    tags: "tag2",
    title: "Title T2",
    excerpt: "Short description for article 2...",
    image: base64ImageData,
    timestamp: "2022-09-14T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: htmlContentData
  }, {
    id: 3,
    tags: "tag1",
    title: "Title T3",
    excerpt: "Short description for article 3...",
    image: base64ImageData,
    timestamp: "2022-09-14T12:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: htmlContentData
  }, {
    id: 4,
    tags: "tag1,tag2, tag3",
    title: "Title T4",
    excerpt: "Short description for article 4...",
    image: base64ImageData,
    timestamp: "2022-09-14T14:43:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 4...."
  }, {
    id: 5,
    tags: "tag1,tag3",
    title: "Title T5",
    excerpt: "Short description for article 5...",
    image: base64ImageData,
    timestamp: "2022-08-14T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 5...."
  }, {
    id: 6,
    tags: "tag3",
    title: "Title T6",
    excerpt: "Short description article 6...",
    image: base64ImageData,
    timestamp: "2022-09-11T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 6...."
  }
]

export const articlesPaginationMock: ArticleListPayload[] = [mockArticles, mockArticles, mockArticles, finalArticlesMock];