import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CredentialsService } from 'angular-with-credentials';

import { ScanComponent } from './scan.component';
import { LocdbService } from './locdb.service'

describe('ScanComponent', () => {
  let component: ScanComponent;
  let fixture: ComponentFixture<ScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanComponent ],
      imports: [ FormsModule, HttpModule ],
      providers: [ LocdbService, HttpModule, CredentialsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should extract', () => {
    // just ppn
    expect(component.extractidandPages('123456789.pdf')[0]).toBe('123456789');
    expect(component.extractidandPages('12345678X.pdf')[0]).toBe('12345678X');
    expect(component.extractidandPages('02345678X.pdf')[0]).toBe('02345678X');
    // with page numbers
  });

  it('should extract', () => {
    expect(component.extractidandPages('123456789_10-12.pdf')).toBe(['123456789', '10', '12']);
    // difficult since delimiter between PPN and firstpage is the same as between pages itself
    expect(component.extractidandPages('123456789-10-12.pdf')).toBe(['123456789', '10', '12']);
    // now single page filenames
    expect(component.extractidandPages('123456789-10-10.pdf')).toBe(['123456789', '10', '10']);
    expect(component.extractidandPages('123456789-10.pdf')).toBe(['123456789', '10', '10']);
  });

});
