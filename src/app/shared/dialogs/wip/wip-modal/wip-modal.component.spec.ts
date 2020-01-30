import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipModalComponent } from './wip-modal.component';

describe('WipModalComponent', () => {
  let component: WipModalComponent;
  let fixture: ComponentFixture<WipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
