import { Injectable, inject } from '@angular/core';

import { ArticleService } from '../../article';
import { Observable } from 'rxjs';
import { IArticle } from '../models';
import { NavigationService } from './navigation.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ArticleFacade {
    readonly #articleService = inject(ArticleService);
    readonly #navigationService = inject(NavigationService);

    getArticle(slug: string): Observable<IArticle> {
        return this.#articleService.getArticle(slug);
    }

    deleteArticle(slug: string): void {
        this.#articleService.deleteArticle(slug).subscribe({
            next: () => this.#navigationService.goToHome(),
            error: (error: HttpErrorResponse) => {
                console.error(error.error.error);
            },
        });
    }
}
