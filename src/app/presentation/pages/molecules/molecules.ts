import { Component } from '@angular/core';
import { AlertCardComponent, StudentAlert } from '@brejcha13320/design-system-bootstrap';

@Component({ templateUrl: './molecules.html', imports: [AlertCardComponent] })
export class Molecules {
  readonly exampleAlert: StudentAlert = { id: 'alert-001', student: { id: 'student-001', fullName: 'Laura Rojas', program: 'Ingeniería de Sistemas' }, riskLevel: 'high', createdAt: '2026-09-01T00:00:00.000Z', reason: 'Registra tres ausencias consecutivas en la última semana.' };
  selectedStudent = '';
  onReview(alert: StudentAlert): void { this.selectedStudent = `Solicitud de revisión registrada para ${alert.student.fullName}.`; }
}
