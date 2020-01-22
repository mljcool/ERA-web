import { TestBed, inject } from '@angular/core/testing';

import { FormContentService } from './form-content.service';

describe('FormContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormContentService]
    });
  });

  it('should be created', inject([FormContentService], (service: FormContentService) => {
    expect(service).toBeTruthy();
  }));
});
