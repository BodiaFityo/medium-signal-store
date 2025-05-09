import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'mds-create-article',
    imports: [],
    templateUrl: './create-article.component.html',
    styleUrl: './create-article.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateArticleComponent {}
