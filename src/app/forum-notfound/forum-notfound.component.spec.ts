import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumNotfoundComponent } from './forum-notfound.component';

describe('ForumNotfoundComponent', () => {
  let component: ForumNotfoundComponent;
  let fixture: ComponentFixture<ForumNotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumNotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
