import { IFeedResponse } from './feed-response.interfaces';

export interface IFeedState {
    data: IFeedResponse | null;
    isLoading: boolean;
    error: string | null;
}
