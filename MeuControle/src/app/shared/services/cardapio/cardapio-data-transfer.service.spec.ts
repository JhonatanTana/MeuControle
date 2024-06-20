import { TestBed } from '@angular/core/testing';

import { CardapioDataTransferService } from './cardapio-data-transfer.service';

describe('CardapioDataTransferService', () => {
  let service: CardapioDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardapioDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
