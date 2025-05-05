import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'mds-pagination',
    imports: [NgClass, RouterLink],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
    total = input<number>(0);
    limit = input<number>(20);
    url = input<string>('');
    currentPage = input<number>(1);

    totalPages = computed(() => {
        const pageCount = Math.ceil(this.total() / this.limit());
        return Array.from({ length: pageCount }, (_, i) => i + 1);
    });
}
