import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumPostformComponent } from './forum-postform.component';

describe('ForumPostformComponent', () => {
  let component: ForumPostformComponent;
  let fixture: ComponentFixture<ForumPostformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumPostformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumPostformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
