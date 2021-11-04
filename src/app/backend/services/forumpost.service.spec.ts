import { TestBed } from '@angular/core/testing';

import { ForumpostService } from './forumpost.service';

describe('ForumpostService', () => {
  let service: ForumpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
