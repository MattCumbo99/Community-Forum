import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumLoginComponent } from './forum-login.component';

describe('ForumLoginComponent', () => {
  let component: ForumLoginComponent;
  let fixture: ComponentFixture<ForumLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
