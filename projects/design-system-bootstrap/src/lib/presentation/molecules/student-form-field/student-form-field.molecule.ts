import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormFieldConfig } from '../../../core/models/edu-alert.models';

/**
 * Molécula de campo de formulario para datos de estudiantes con validación visual y accesibilidad.
 */
@Component({
  selector: 'dsb-student-form-field',
  standalone: true,
  template: `
    <div class="form-field-group" [class.has-error]="showError">
      <label [attr.for]="config?.id" class="form-label">
        {{ config?.label }}
        @if (config?.required) {
          <span class="required-indicator" aria-hidden="true">*</span>
        }
      </label>
      <input
        [id]="config?.id"
        [type]="type"
        [placeholder]="config?.placeholder ?? ''"
        [disabled]="disabled"
        [value]="value"
        [attr.aria-required]="config?.required ?? false"
        [attr.aria-invalid]="showError"
        [attr.aria-describedby]="showError && config?.id ? config.id + '-error' : null"
        [class]="inputCssClass"
        (input)="onInputChange($event)"
        (blur)="onBlur()"
      />
      @if (showError && config) {
        <p [id]="config.id + '-error'" class="error-message" role="alert">
          {{ config.errorMessage }}
        </p>
      }
    </div>
  `,
  styles: `
    .form-field-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      margin-bottom: 0.75rem;
      text-align: left;
    }
    .form-label {
      color: #1e293b;
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0;
    }
    .required-indicator {
      color: #dc2626;
      margin-left: 0.2rem;
    }
    .form-control {
      background-color: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 0.4rem;
      box-sizing: border-box;
      color: #0f172a;
      font-family: inherit;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 0.5rem 0.75rem;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      width: 100%;
    }
    .form-control:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
      outline: none;
    }
    .form-control:disabled {
      background-color: #f8fafc;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .form-control.is-invalid {
      border-color: #dc2626;
    }
    .form-control.is-invalid:focus {
      border-color: #dc2626;
      box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
    }
    .error-message {
      color: #dc2626;
      font-size: 0.8rem;
      margin: 0.15rem 0 0;
    }
  `,
})
export class StudentFormFieldComponent {
  /** Configuración estructural y reglas de validación del campo. */
  @Input({ required: true }) config!: FormFieldConfig;

  /** Valor actual del campo de texto. */
  @Input() value: string = '';

  /** Tipo de campo de entrada HTML. */
  @Input() type: string = 'text';

  /** Indica si el campo está deshabilitado. */
  @Input() disabled: boolean = false;

  /** Emite el valor actualizado tras cada entrada del usuario. */
  @Output() valueChange = new EventEmitter<string>();

  /** Emite el estado de validación con su indicador de validez y mensaje de error opcional. */
  @Output() statusChange = new EventEmitter<{ isValid: boolean; error?: string }>();

  /** Bandera que indica si el campo ha sido tocado o desenfocado por el usuario. */
  touched: boolean = false;

  /**
   * Determina si el campo incumple las reglas de validación requeridas.
   */
  get isInvalid(): boolean {
    if (!this.config) {
      return false;
    }
    return this.config.required && (!this.value || this.value.trim() === '');
  }

  /**
   * Indica si se debe mostrar el mensaje de error visualmente.
   */
  get showError(): boolean {
    return this.touched && this.isInvalid;
  }

  /**
   * Retorna las clases CSS asociadas al input según su estado de validación.
   */
  get inputCssClass(): string {
    return `form-control${this.showError ? ' is-invalid' : ''}`;
  }

  /**
   * Procesa el evento de entrada, actualiza el valor y emite los cambios de estado.
   *
   * @param event Evento de entrada del elemento HTML input.
   */
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target ? target.value : '';
    this.valueChange.emit(this.value);
    this.validate();
  }

  /**
   * Marca el campo como tocado cuando pierde el foco y ejecuta la validación.
   */
  onBlur(): void {
    this.touched = true;
    this.validate();
  }

  /**
   * Evalúa la validez del campo y emite el resultado a través de statusChange.
   *
   * @returns true si el campo es válido, false en caso contrario.
   */
  validate(): boolean {
    const valid = !this.isInvalid;
    const error = valid ? undefined : this.config.errorMessage;
    this.statusChange.emit({ isValid: valid, error });
    return valid;
  }
}
