import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentAlert } from '../../../core/models/edu-alert.models';
import { AlertsDashboardComponent } from './alerts-dashboard.organism';

const mockAlerts: StudentAlert[] = [
  {
    id: 'alert-1',
    student: { id: 's-1', fullName: 'Laura Rojas', program: 'Ingeniería de Sistemas' },
    riskLevel: 'high',
    createdAt: '2026-09-01T00:00:00.000Z',
    reason: 'Riesgo alto de deserción',
  },
  {
    id: 'alert-2',
    student: { id: 's-2', fullName: 'Mateo Gómez', program: 'Medicina' },
    riskLevel: 'medium',
    createdAt: '2026-09-02T00:00:00.000Z',
    reason: 'Bajo rendimiento en asignaturas clave',
  },
  {
    id: 'alert-3',
    student: { id: 's-3', fullName: 'Sofia Morales', program: 'Derecho' },
    riskLevel: 'low',
    createdAt: '2026-09-03T00:00:00.000Z',
    reason: 'Asistencia irregular en primeros semestres',
  },
];

describe('AlertsDashboardComponent', () => {
  let fixture: ComponentFixture<AlertsDashboardComponent>;
  let component: AlertsDashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertsDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertsDashboardComponent);
    component = fixture.componentInstance;
    component.alerts = [...mockAlerts];
    fixture.detectChanges();
  });

  it('debería crear el componente con valores iniciales', () => {
    expect(component).toBeTruthy();
    expect(component.filter).toBe('all');
  });

  it('debería renderizar todas las alertas cuando el filtro es "all"', () => {
    const alertCards = fixture.nativeElement.querySelectorAll('dsb-alert-card');
    expect(alertCards.length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain('Laura Rojas');
    expect(fixture.nativeElement.textContent).toContain('Mateo Gómez');
    expect(fixture.nativeElement.textContent).toContain('Sofia Morales');
  });

  it('debería filtrar alertas por nivel de riesgo "high"', () => {
    component.setFilter('high');
    fixture.detectChanges();

    expect(component.filteredAlerts.length).toBe(1);
    expect(component.filteredAlerts[0].student.fullName).toBe('Laura Rojas');

    const alertCards = fixture.nativeElement.querySelectorAll('dsb-alert-card');
    expect(alertCards.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Laura Rojas');
    expect(fixture.nativeElement.textContent).not.toContain('Mateo Gómez');
  });

  it('debería filtrar alertas por nivel de riesgo "medium"', () => {
    component.setFilter('medium');
    fixture.detectChanges();

    expect(component.filteredAlerts.length).toBe(1);
    expect(component.filteredAlerts[0].student.fullName).toBe('Mateo Gómez');

    const alertCards = fixture.nativeElement.querySelectorAll('dsb-alert-card');
    expect(alertCards.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Mateo Gómez');
    expect(fixture.nativeElement.textContent).not.toContain('Sofia Morales');
  });

  it('debería filtrar alertas por nivel de riesgo "low"', () => {
    component.setFilter('low');
    fixture.detectChanges();

    expect(component.filteredAlerts.length).toBe(1);
    expect(component.filteredAlerts[0].student.fullName).toBe('Sofia Morales');

    const alertCards = fixture.nativeElement.querySelectorAll('dsb-alert-card');
    expect(alertCards.length).toBe(1);
    expect(fixture.nativeElement.textContent).toContain('Sofia Morales');
  });

  it('debería mostrar estado vacío cuando no hay alertas que coincidan con el filtro', () => {
    component.alerts = [mockAlerts[0]]; // Solo alerta de nivel high
    component.setFilter('low');
    fixture.detectChanges();

    expect(component.filteredAlerts.length).toBe(0);

    const emptyState = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyState).toBeTruthy();
    expect(emptyState.textContent?.trim()).toBe('No hay alertas para este nivel de riesgo.');
    expect(fixture.nativeElement.querySelectorAll('dsb-alert-card').length).toBe(0);
  });

  it('debería propagar el evento reviewRequested cuando una AlertCardComponent emite la acción', () => {
    const reviewSpy = jest.spyOn(component.reviewRequested, 'emit');

    const firstCardButton: HTMLButtonElement = fixture.nativeElement.querySelector('dsb-alert-card button');
    expect(firstCardButton).toBeTruthy();
    firstCardButton.click();

    expect(reviewSpy).toHaveBeenCalledTimes(1);
    expect(reviewSpy).toHaveBeenCalledWith(mockAlerts[0]);
  });

  it('debería validar y reajustar a "all" cuando se pasa un valor de filtro inválido', () => {
    component.setFilter('invalid-filter-value');
    expect(component.filter).toBe('all');

    component.setFilter('unknown');
    expect(component.filter).toBe('all');
  });

  it('debería actualizar el filtro al interactuar con el elemento select', () => {
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('select');
    select.value = 'high';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.filter).toBe('high');
    expect(fixture.nativeElement.querySelectorAll('dsb-alert-card').length).toBe(1);
  });

  it('debería manejar onFilterChange de forma segura si event.target es nulo', () => {
    const fakeEvent = { target: null } as unknown as Event;
    component.onFilterChange(fakeEvent);
    expect(component.filter).toBe('all');
  });
});
