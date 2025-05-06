import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiEndpoint, BannerComponent, FeedComponent, FeedTogglerComponent, PopularTagComponent } from '../shared';

@Component({
    selector: 'mds-home-feed',
    imports: [FeedComponent, BannerComponent, PopularTagComponent, FeedTogglerComponent],
    templateUrl: './home-feed.component.html',
    styleUrl: './home-feed.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeedComponent {
    apiUrl = ApiEndpoint.Articles;
}
