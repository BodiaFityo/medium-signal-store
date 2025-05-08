import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiEndpoint, BannerComponent, FeedComponent, FeedTogglerComponent, PopularTagComponent } from '../shared';

@Component({
    selector: 'mds-your-feed',
    imports: [BannerComponent, FeedTogglerComponent, FeedComponent, PopularTagComponent],
    templateUrl: './your-feed.component.html',
    styleUrl: './your-feed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YourFeedComponent {
    readonly apiUrl = ApiEndpoint.FeedArticles;
}
