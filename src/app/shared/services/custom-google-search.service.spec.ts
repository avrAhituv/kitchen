import { TestBed } from '@angular/core/testing';

import { CustomGoogleSearchService } from './custom-google-search.service';

describe('CustomGoogleSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomGoogleSearchService = TestBed.get(CustomGoogleSearchService);
    expect(service).toBeTruthy();
  });
});
