import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTagsComponent } from './popular-tag.component';

describe('PopularTagsComponent', () => {
    let component: PopularTagsComponent;
    let fixture: ComponentFixture<PopularTagsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopularTagsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PopularTagsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
