import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumBansComponent } from './forum-bans.component';

describe('ForumBansComponent', () => {
  let component: ForumBansComponent;
  let fixture: ComponentFixture<ForumBansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumBansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumBansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
