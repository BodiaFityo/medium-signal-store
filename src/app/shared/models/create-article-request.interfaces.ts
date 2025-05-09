export interface ICreateArticleRequest {
    article: {
        title: string;
        description: string;
        body: string;
        tagList: string[];
    };
}
