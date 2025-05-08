import { IPopularTagResponse } from './popular-tag-response.interfaces';

export interface IPopularTagState {
    data: IPopularTagResponse | null;
    isLoading: boolean;
    error: string | null;
}
