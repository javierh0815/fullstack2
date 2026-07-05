import { TestBed } from '@angular/core/testing';

import { JsonFile } from './json-file';

describe('JsonFile', () => {
  let service: JsonFile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonFile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
