import { TestBed } from '@angular/core/testing';

import { CategoriaDataTransferService } from './categoria-data-transfer.service';

describe('CategoriaDataTransferService', () => {
  let service: CategoriaDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
