import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiEndpoint, BannerComponent, FeedComponent, PopularTagsComponent } from '../shared';

@Component({
    selector: 'mds-home-feed',
    imports: [FeedComponent, BannerComponent, PopularTagsComponent],
    templateUrl: './home-feed.component.html',
    styleUrl: './home-feed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
    apiUrl = ApiEndpoint.Articles;
}
