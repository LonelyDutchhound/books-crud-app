import { TestBed } from '@angular/core/testing';

import { MimicBackendInterceptor } from './mimic-backend.interceptor';

describe('MimicBackendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MimicBackendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MimicBackendInterceptor = TestBed.inject(MimicBackendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
