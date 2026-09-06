import { Component } from '@angular/core';
import { AlertsDashboardComponent, StudentAlert } from '@brejcha13320/design-system-bootstrap';

@Component({
  selector: 'app-organisms',
  templateUrl: './organisms.html',
  imports: [AlertsDashboardComponent],
})
export class Organisms {
  readonly alerts: readonly StudentAlert[] = [
    { id: '1', student: { id: 's1', fullName: 'Laura Rojas', program: 'Ingeniería de Sistemas' }, riskLevel: 'high', createdAt: '2026-09-01T00:00:00.000Z', reason: 'Tres ausencias consecutivas.' },
    { id: '2', student: { id: 's2', fullName: 'Andrés Gil', program: 'Administración de Empresas' }, riskLevel: 'medium', createdAt: '2026-09-03T00:00:00.000Z', reason: 'Bajo rendimiento en dos asignaturas.' },
    { id: '3', student: { id: 's3', fullName: 'María Torres', program: 'Contaduría Pública' }, riskLevel: 'low', createdAt: '2026-09-04T00:00:00.000Z', reason: 'Seguimiento preventivo de participación.' },
  ];
  reviewedAlert = '';
  onReview(alert: StudentAlert): void { this.reviewedAlert = `Abriendo seguimiento de ${alert.student.fullName}.`; }
}
