import Article from "../../models/article/article";
import ArticleListPayload from "../../models/article/article-list-payload";

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
    image: "data:image/jpeg;base64,...",
    timestamp: "2022-09-15T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 1...."
  }, {
    id: 2,
    tags: "tag2",
    title: "Title T2",
    excerpt: "Short description for article 2...",
    image: "data:image/jpeg;base64,...",
    timestamp: "2022-09-14T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 2...."
  }, {
    id: 3,
    tags: "tag1",
    title: "Title T3",
    excerpt: "Short description for article 3...",
    image: "data:image/jpeg;base64,...",
    timestamp: "2022-09-14T12:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 3...."
  }, {
    id: 4,
    tags: "tag1,tag2, tag3",
    title: "Title T4",
    excerpt: "Short description for article 4...",
    image: "data:image/jpeg;base64,...",
    timestamp: "2022-09-14T14:43:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 4...."
  }, {
    id: 5,
    tags: "tag1,tag3",
    title: "Title T5",
    excerpt: "Short description for article 5...",
    image: "data:image/jpeg;base64,...",
    timestamp: "2022-08-14T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 5...."
  }, {
    id: 6,
    tags: "tag3",
    title: "Title T6",
    excerpt: "Short description article 6...",
    image: "data:image/jpeg;base64,...",
    timestamp: "2022-09-11T14:42:16.067Z",
    owners: ["a@b.com", "b@c.com"],
    content: "Lorem ipsum sic doloret 6...."
  }
]

export const paginationMock: ArticleListPayload[] = [mockArticles, mockArticles, mockArticles, finalArticlesMock];