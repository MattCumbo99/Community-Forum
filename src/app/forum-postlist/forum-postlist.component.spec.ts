import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostlistComponent } from './forum-postlist.component';

describe('ForumPostlistComponent', () => {
  let component: ForumPostlistComponent;
  let fixture: ComponentFixture<ForumPostlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumPostlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
