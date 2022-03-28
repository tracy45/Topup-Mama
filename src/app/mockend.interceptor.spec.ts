import { TestBed } from '@angular/core/testing';

import { MockendInterceptor } from './mockend.interceptor';

describe('MockendInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MockendInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MockendInterceptor = TestBed.inject(MockendInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
