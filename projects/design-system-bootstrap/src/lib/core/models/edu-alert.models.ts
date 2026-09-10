/** Nivel de riesgo académico asociado a una alerta. */
export type RiskLevel = 'low' | 'medium' | 'high';

/** Información mínima reutilizable de un estudiante. */
export interface Student {
  /** Identificador único del estudiante. */
  id: string;
  /** Nombre completo del estudiante. */
  fullName: string;
  /** Programa académico al que pertenece el estudiante. */
  program: string;
}

/** Alerta de posible deserción para mostrar en el dashboard. */
export interface StudentAlert {
  /** Identificador único de la alerta. */
  id: string;
  /** Información del estudiante asociado a la alerta. */
  student: Student;
  /** Nivel de riesgo asignado a la alerta. */
  riskLevel: RiskLevel;
  /** Fecha de creación de la alerta en formato ISO. */
  createdAt: string;
  /** Causa o motivo de la alerta. */
  reason: string;
}

/** Filtro disponible para el panel de alertas. */
export type RiskFilter = RiskLevel | 'all';

/** Variantes visuales para botones de acción. */
export type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * Contrato de configuración para el componente StudentFormFieldComponent.
 */
export interface FormFieldConfig {
  /** Identificador único para el campo y su etiqueta. */
  id: string;
  /** Etiqueta descriptiva visible del campo. */
  label: string;
  /** Texto de sugerencia o ayuda en el campo de entrada. */
  placeholder: string;
  /** Indica si el campo es obligatorio. */
  required: boolean;
  /** Mensaje de error que se muestra cuando la validación falla. */
  errorMessage: string;
}
