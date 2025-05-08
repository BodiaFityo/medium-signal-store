import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularTagComponent } from './popular-tag.component';

describe('PopularTagComponent', () => {
    let component: PopularTagComponent;
    let fixture: ComponentFixture<PopularTagComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopularTagComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PopularTagComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
