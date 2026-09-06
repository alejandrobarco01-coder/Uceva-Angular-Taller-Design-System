import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentAlert } from '../../../core/models/edu-alert.models';
import { AlertCardComponent } from './alert-card.molecule';

const alert: StudentAlert = { id: 'a-1', student: { id: 's-1', fullName: 'Laura Rojas', program: 'Ingeniería de Sistemas' }, riskLevel: 'high', createdAt: '2026-09-01T00:00:00.000Z', reason: 'Ausencias consecutivas' };

describe('AlertCardComponent', () => {
  let fixture: ComponentFixture<AlertCardComponent>;
  let component: AlertCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AlertCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(AlertCardComponent);
    component = fixture.componentInstance;
    component.alert = alert;
    fixture.detectChanges();
  });

  it('shows the student and alert details', () => {
    expect(fixture.nativeElement.textContent).toContain('Laura Rojas');
    expect(fixture.nativeElement.textContent).toContain('Ausencias consecutivas');
    expect(fixture.nativeElement.querySelector('dsb-risk-badge')).toBeTruthy();
  });

  it('emits the alert when review is requested', () => {
    const emit = jest.spyOn(component.reviewRequested, 'emit');
    fixture.nativeElement.querySelector('button').click();
    expect(emit).toHaveBeenCalledWith(alert);
  });
});
