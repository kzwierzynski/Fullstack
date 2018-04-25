import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCurrencyComponent } from './sell-currency.component';

describe('SellCurrencyComponent', () => {
  let component: SellCurrencyComponent;
  let fixture: ComponentFixture<SellCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
