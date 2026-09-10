import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentAlert } from '../../../core/models/edu-alert.models';
import { ActionButtonComponent } from '../../atoms/action-button/action-button.atom';
import { RiskBadgeComponent } from '../../atoms/risk-badge/risk-badge.atom';

/**
 * Tarjeta que agrupa la información de una alerta y expone una acción contextual.
 */
@Component({
  selector: 'dsb-alert-card',
  standalone: true,
  imports: [DatePipe, RiskBadgeComponent, ActionButtonComponent],
  template: `
    <article class="alert-card">
      <header>
        <div><h3>{{ alert.student.fullName }}</h3><p>{{ alert.student.program }}</p></div>
        <dsb-risk-badge [riskLevel]="alert.riskLevel" />
      </header>
      <p class="reason">{{ alert.reason }}</p>
      <footer>
        <time [attr.datetime]="alert.createdAt">{{ alert.createdAt | date: 'mediumDate' }}</time>
        <dsb-action-button label="Revisar alerta" variant="primary" (actionClick)="requestReview()" />
      </footer>
    </article>
  `,
  styles: `
    .alert-card { background: #fff; border: 1px solid #e2e8f0; border-radius: .8rem; box-shadow: 0 1px 2px #0f172a0d; padding: 1rem; }
    header, footer { align-items: center; display: flex; gap: 1rem; justify-content: space-between; } h3 { font-size: 1rem; margin: 0; } p { color: #64748b; margin: .2rem 0 0; } .reason { color: #334155; margin: 1rem 0; } time { color: #64748b; font-size: .85rem; }
  `,
})
export class AlertCardComponent {
  /** Alerta que se presenta en la tarjeta. */
  @Input({ required: true }) alert!: StudentAlert;

  /** Notifica que el usuario desea revisar la alerta mostrada. */
  @Output() reviewRequested = new EventEmitter<StudentAlert>();

  /** Emite la alerta actual para que el consumidor gestione la navegación o detalle. */
  requestReview(): void {
    this.reviewRequested.emit(this.alert);
  }
}
