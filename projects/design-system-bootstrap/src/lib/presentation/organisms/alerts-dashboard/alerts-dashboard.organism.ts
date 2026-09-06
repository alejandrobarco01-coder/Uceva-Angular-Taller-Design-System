import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RiskFilter, StudentAlert } from '../../../core/models/edu-alert.models';
import { AlertCardComponent } from '../../molecules/alert-card/alert-card.molecule';

/** Panel de alertas con filtrado por nivel de riesgo. */
@Component({
  selector: 'dsb-alerts-dashboard',
  standalone: true,
  imports: [AlertCardComponent],
  template: `
    <section class="dashboard" aria-labelledby="dashboard-title">
      <div class="dashboard-heading"><div><h2 id="dashboard-title">Alertas estudiantiles</h2><p>Seguimiento a estudiantes con señales de riesgo.</p></div>
        <label>Filtrar riesgo <select [value]="filter" (change)="onFilterChange($event)"><option value="all">Todos</option><option value="high">Alto</option><option value="medium">Medio</option><option value="low">Bajo</option></select></label>
      </div>
      <div class="alert-list">
        @for (alert of filteredAlerts; track alert.id) { <dsb-alert-card [alert]="alert" (reviewRequested)="reviewRequested.emit($event)" /> }
        @empty { <p class="empty-state">No hay alertas para este nivel de riesgo.</p> }
      </div>
    </section>
  `,
  styles: `.dashboard { max-width: 900px; } .dashboard-heading { align-items: end; display: flex; gap: 1rem; justify-content: space-between; margin-bottom: 1rem; } h2, p { margin: 0; } p { color: #64748b; margin-top: .25rem; } select { margin-left: .4rem; padding: .3rem; } .alert-list { display: grid; gap: .75rem; } .empty-state { padding: 1.5rem; text-align: center; }`,
})
export class AlertsDashboardComponent {
  /** Alertas disponibles para el panel. */
  @Input() alerts: readonly StudentAlert[] = [];
  /** Evento propagado cuando se solicita revisar una alerta. */
  @Output() reviewRequested = new EventEmitter<StudentAlert>();
  /** Filtro actualmente aplicado. */
  filter: RiskFilter = 'all';

  /** Alertas visibles según el filtro elegido. */
  get filteredAlerts(): readonly StudentAlert[] {
    return this.filter === 'all' ? this.alerts : this.alerts.filter((alert) => alert.riskLevel === this.filter);
  }

  /** Actualiza el filtro, validando el valor que llega desde la interfaz. */
  setFilter(value: string): void {
    this.filter = value === 'low' || value === 'medium' || value === 'high' ? value : 'all';
  }

  /** Lee el selector de riesgo y delega la validación al método público de filtro. */
  onFilterChange(event: Event): void {
    this.setFilter((event.target as HTMLSelectElement).value);
  }
}
