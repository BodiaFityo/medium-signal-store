import { IProfile } from './profile.interfaces';

export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: false;
    favoritesCount: number;
    author: IProfile;
}
