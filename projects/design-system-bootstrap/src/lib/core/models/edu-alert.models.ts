/** Nivel de riesgo académico asociado a una alerta. */
export type RiskLevel = 'low' | 'medium' | 'high';

/** Información mínima reutilizable de un estudiante. */
export interface Student {
  id: string;
  fullName: string;
  program: string;
}

/** Alerta de posible deserción para mostrar en el dashboard. */
export interface StudentAlert {
  id: string;
  student: Student;
  riskLevel: RiskLevel;
  createdAt: string;
  reason: string;
}

/** Filtro disponible para el panel de alertas. */
export type RiskFilter = RiskLevel | 'all';

/**
 * Contrato reservado para el componente StudentFormFieldComponent.
 *
 * @todo Persona B: implementar la molécula que consuma esta configuración.
 */
export interface FormFieldConfig {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
  errorMessage: string;
}
