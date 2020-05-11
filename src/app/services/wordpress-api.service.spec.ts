import { TestBed } from '@angular/core/testing';

import { WordpressApiService } from './wordpress-api.service';

describe('WordpressApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WordpressApiService = TestBed.get(WordpressApiService);
    expect(service).toBeTruthy();
  });
});
