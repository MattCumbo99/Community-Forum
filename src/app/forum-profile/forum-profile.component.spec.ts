import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumProfileComponent } from './forum-profile.component';

describe('ForumProfileComponent', () => {
  let component: ForumProfileComponent;
  let fixture: ComponentFixture<ForumProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
