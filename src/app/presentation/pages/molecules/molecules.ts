import { Component } from '@angular/core';
import {
  AlertCardComponent,
  FormFieldConfig,
  StudentAlert,
  StudentFormFieldComponent,
} from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './molecules.html',
  imports: [AlertCardComponent, StudentFormFieldComponent],
})
export class Molecules {
  readonly exampleAlert: StudentAlert = {
    id: 'alert-001',
    student: {
      id: 'student-001',
      fullName: 'Laura Rojas',
      program: 'Ingeniería de Sistemas',
    },
    riskLevel: 'high',
    createdAt: '2026-09-01T00:00:00.000Z',
    reason: 'Registra tres ausencias consecutivas en la última semana.',
  };

  readonly studentNameConfig: FormFieldConfig = {
    id: 'student-search',
    label: 'Nombre o Código del estudiante',
    placeholder: 'Ej. Juan Pérez o 20261010',
    required: true,
    errorMessage: 'Por favor ingrese un nombre o código válido para continuar.',
  };

  selectedStudent = '';
  formFieldValue = '';
  formFieldStatus = '';

  onReview(alert: StudentAlert): void {
    this.selectedStudent = `Solicitud de revisión registrada para ${alert.student.fullName}.`;
  }

  onFieldValueChange(value: string): void {
    this.formFieldValue = value;
  }

  onFieldStatusChange(status: { isValid: boolean; error?: string }): void {
    this.formFieldStatus = status.isValid
      ? 'Campo válido'
      : `Error de validación: ${status.error ?? 'Inválido'}`;
  }
}
