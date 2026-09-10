import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonVariant } from '../../../core/models/edu-alert.models';

/**
 * Botón de acción reutilizable con soporte de variantes y accesibilidad.
 */
@Component({
  selector: 'dsb-action-button',
  standalone: true,
  template: `
    <button
      type="button"
      [class]="cssClass"
      [disabled]="disabled"
      [attr.aria-disabled]="disabled"
      (click)="handleClick($event)">
      {{ label }}
    </button>
  `,
  styles: `
    .action-button {
      align-items: center;
      border: 1px solid transparent;
      border-radius: 0.4rem;
      cursor: pointer;
      display: inline-flex;
      font-family: inherit;
      font-size: 0.875rem;
      font-weight: 600;
      justify-content: center;
      line-height: 1.25;
      padding: 0.5rem 0.85rem;
      text-align: center;
      transition: background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
      user-select: none;
    }
    .action-button:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }
    .btn-primary {
      background-color: #1d4ed8;
      border-color: #1d4ed8;
      color: #ffffff;
    }
    .btn-primary:hover:not(:disabled) {
      background-color: #1e40af;
      border-color: #1e40af;
    }
    .btn-secondary {
      background-color: #f1f5f9;
      border-color: #cbd5e1;
      color: #334155;
    }
    .btn-secondary:hover:not(:disabled) {
      background-color: #e2e8f0;
      border-color: #94a3b8;
    }
    .btn-danger {
      background-color: #dc2626;
      border-color: #dc2626;
      color: #ffffff;
    }
    .btn-danger:hover:not(:disabled) {
      background-color: #b91c1c;
      border-color: #b91c1c;
    }
  `,
})
export class ActionButtonComponent {
  /** Texto o etiqueta que se muestra dentro del botón. */
  @Input() label: string = '';

  /** Variante visual que define el color y estilo semántico del botón. */
  @Input() variant: ButtonVariant = 'primary';

  /** Indica si el botón se encuentra deshabilitado para la interacción. */
  @Input() disabled: boolean = false;

  /** Evento emitido al interactuar con el botón habilitado. */
  @Output() actionClick = new EventEmitter<MouseEvent>();

  /**
   * Retorna las clases CSS correspondientes a la variante y configuración actual.
   */
  get cssClass(): string {
    return `action-button btn-${this.variant}`;
  }

  /**
   * Gestiona el clic sobre el botón y emite el evento solo si no está deshabilitado.
   *
   * @param event Evento de clic del mouse.
   */
  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.actionClick.emit(event);
    }
  }
}
