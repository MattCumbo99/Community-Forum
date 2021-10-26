import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumAdminpanelComponent } from './forum-adminpanel.component';

describe('ForumAdminpanelComponent', () => {
  let component: ForumAdminpanelComponent;
  let fixture: ComponentFixture<ForumAdminpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumAdminpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumAdminpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
