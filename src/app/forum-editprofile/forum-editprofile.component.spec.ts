import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumEditprofileComponent } from './forum-editprofile.component';

describe('ForumEditprofileComponent', () => {
  let component: ForumEditprofileComponent;
  let fixture: ComponentFixture<ForumEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumEditprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
