import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'mds-tag-list',
    imports: [],
    templateUrl: './tag-list.component.html',
    styleUrl: './tag-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
    tagList = input<string[]>([]);
}
