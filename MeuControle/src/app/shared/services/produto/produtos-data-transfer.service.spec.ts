import { TestBed } from '@angular/core/testing';

import { ProdutosDataTransferService } from './produtos-data-transfer.service';

describe('ProdutosService', () => {
  let service: ProdutosDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
