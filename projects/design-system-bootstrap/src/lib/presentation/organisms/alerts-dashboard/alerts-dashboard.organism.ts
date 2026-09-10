import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RiskFilter, StudentAlert } from '../../../core/models/edu-alert.models';
import { AlertCardComponent } from '../../molecules/alert-card/alert-card.molecule';

/**
 * Panel y organismo principal de alertas con soporte para filtrado dinámico por nivel de riesgo.
 */
@Component({
  selector: 'dsb-alerts-dashboard',
  standalone: true,
  imports: [AlertCardComponent],
  template: `
    <section class="dashboard" aria-labelledby="dashboard-title">
      <div class="dashboard-heading">
        <div>
          <h2 id="dashboard-title">Alertas estudiantiles</h2>
          <p>Seguimiento a estudiantes con señales de riesgo.</p>
        </div>
        <label>
          Filtrar riesgo
          <select [value]="filter" (change)="onFilterChange($event)">
            <option value="all">Todos</option>
            <option value="high">Alto</option>
            <option value="medium">Medio</option>
            <option value="low">Bajo</option>
          </select>
        </label>
      </div>
      <div class="alert-list">
        @for (alert of filteredAlerts; track alert.id) {
          <dsb-alert-card [alert]="alert" (reviewRequested)="reviewRequested.emit($event)" />
        }
        @empty {
          <p class="empty-state">No hay alertas para este nivel de riesgo.</p>
        }
      </div>
    </section>
  `,
  styles: `
    .dashboard {
      max-width: 900px;
    }
    .dashboard-heading {
      align-items: end;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    h2,
    p {
      margin: 0;
    }
    p {
      color: #64748b;
      margin-top: 0.25rem;
    }
    select {
      margin-left: 0.4rem;
      padding: 0.3rem;
    }
    .alert-list {
      display: grid;
      gap: 0.75rem;
    }
    .empty-state {
      padding: 1.5rem;
      text-align: center;
    }
  `,
})
export class AlertsDashboardComponent {
  /** Lista de alertas de estudiantes disponibles para mostrar en el panel. */
  @Input() alerts: readonly StudentAlert[] = [];

  /** Evento propagado cuando un usuario solicita revisar el detalle de una alerta. */
  @Output() reviewRequested = new EventEmitter<StudentAlert>();

  /** Filtro de nivel de riesgo actualmente seleccionado y aplicado. */
  filter: RiskFilter = 'all';

  /**
   * Obtiene la colección de alertas visibles tras aplicar el filtro de riesgo seleccionado.
   */
  get filteredAlerts(): readonly StudentAlert[] {
    return this.filter === 'all'
      ? this.alerts
      : this.alerts.filter((alert) => alert.riskLevel === this.filter);
  }

  /**
   * Actualiza el filtro de riesgo, sanitizando y validando el valor ingresado.
   * Si el valor no es 'low', 'medium' o 'high', se restablece a 'all'.
   *
   * @param value Nivel de riesgo solicitado o 'all'.
   */
  setFilter(value: string): void {
    this.filter = value === 'low' || value === 'medium' || value === 'high' ? value : 'all';
  }

  /**
   * Captura el evento de cambio del elemento select y delega la actualización del filtro.
   *
   * @param event Evento emitido por el cambio del elemento HTML select.
   */
  onFilterChange(event: Event): void {
    const target = event?.target as HTMLSelectElement | null;
    this.setFilter(target?.value ?? 'all');
  }
}
