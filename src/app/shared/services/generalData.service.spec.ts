import { TestBed } from '@angular/core/testing';

import { GeneralDataService } from './generalData.service';

describe('GeneralDataService', () => {
  let service: GeneralDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
