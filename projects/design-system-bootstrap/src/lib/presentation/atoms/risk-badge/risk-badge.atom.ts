import { Component, Input } from '@angular/core';
import { RiskLevel } from '../../../core/models/edu-alert.models';

/**
 * Etiqueta visual que comunica el nivel de riesgo de un estudiante.
 */
@Component({
  selector: 'dsb-risk-badge',
  standalone: true,
  template: `
    <span class="risk-badge" [class]="cssClass" [attr.aria-label]="'Riesgo ' + label">
      <span aria-hidden="true">{{ icon }}</span>{{ label }}
    </span>
  `,
  styles: `
    .risk-badge { align-items: center; border-radius: 999px; display: inline-flex; font-size: .78rem; font-weight: 700; gap: .35rem; padding: .35rem .65rem; text-transform: uppercase; }
    .risk-low { background: #dcfce7; color: #166534; }
    .risk-medium { background: #fef3c7; color: #92400e; }
    .risk-high { background: #fee2e2; color: #991b1b; }
  `,
})
export class RiskBadgeComponent {
  /** Nivel de riesgo que determina el texto, icono y color del chip. */
  @Input() riskLevel: RiskLevel = 'low';

  /** Texto legible del nivel de riesgo. */
  get label(): string {
    return { low: 'Bajo', medium: 'Medio', high: 'Alto' }[this.riskLevel];
  }

  /** Icono semántico, independiente de bibliotecas externas. */
  get icon(): string {
    return { low: '✓', medium: '!', high: '⚠' }[this.riskLevel];
  }

  /** Clase CSS asociada al nivel de riesgo. */
  get cssClass(): string {
    return `risk-badge risk-${this.riskLevel}`;
  }
}
