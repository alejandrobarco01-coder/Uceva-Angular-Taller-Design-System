import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldConfig } from '../../../core/models/edu-alert.models';
import { StudentFormFieldComponent } from './student-form-field.molecule';

const sampleConfig: FormFieldConfig = {
  id: 'student-name',
  label: 'Nombre completo',
  placeholder: 'Ej. Juan Pérez',
  required: true,
  errorMessage: 'El nombre del estudiante es obligatorio.',
};

describe('StudentFormFieldComponent', () => {
  let fixture: ComponentFixture<StudentFormFieldComponent>;
  let component: StudentFormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFormFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormFieldComponent);
    component = fixture.componentInstance;
    component.config = { ...sampleConfig };
  });

  it('debería crear el componente y renderizar la estructura base', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const label: HTMLLabelElement = fixture.nativeElement.querySelector('label');
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

    expect(label.getAttribute('for')).toBe('student-name');
    expect(label.textContent).toContain('Nombre completo');
    expect(fixture.nativeElement.querySelector('.required-indicator')).toBeTruthy();
    expect(input.id).toBe('student-name');
    expect(input.placeholder).toBe('Ej. Juan Pérez');
  });

  it('no debería mostrar el indicador de requerido si required es false', () => {
    component.config = { ...sampleConfig, required: false };
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.required-indicator')).toBeNull();
  });

  it('debería aplicar el estado disabled cuando se indica por input', () => {
    component.disabled = true;
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('debería emitir valueChange y statusChange al escribir en el input', () => {
    const valueSpy = jest.spyOn(component.valueChange, 'emit');
    const statusSpy = jest.spyOn(component.statusChange, 'emit');
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Carlos Gómez';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value).toBe('Carlos Gómez');
    expect(valueSpy).toHaveBeenCalledWith('Carlos Gómez');
    expect(statusSpy).toHaveBeenCalledWith({ isValid: true, error: undefined });
  });

  it('debería manejar onInputChange cuando target es null', () => {
    const fakeEvent = { target: null } as unknown as Event;
    component.onInputChange(fakeEvent);
    expect(component.value).toBe('');
  });

  it('debería mostrar mensaje de error y clase is-invalid al perder foco si está vacío y es requerido', () => {
    const statusSpy = jest.spyOn(component.statusChange, 'emit');
    component.value = '';
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.touched).toBe(true);
    expect(component.showError).toBe(true);

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent?.trim()).toBe('El nombre del estudiante es obligatorio.');
    expect(input.classList.contains('is-invalid')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(statusSpy).toHaveBeenCalledWith({
      isValid: false,
      error: 'El nombre del estudiante es obligatorio.',
    });
  });

  it('debería ocultar el error una vez el usuario ingresa un valor válido', () => {
    component.touched = true;
    component.value = '';
    fixture.detectChanges();

    expect(component.showError).toBe(true);

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'Ana Torres';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.showError).toBe(false);
    expect(fixture.nativeElement.querySelector('.error-message')).toBeNull();
    expect(input.classList.contains('is-invalid')).toBe(false);
  });

  it('debería manejar correctamente el caso cuando config no está definido', () => {
    component.config = undefined as unknown as FormFieldConfig;
    expect(component.isInvalid).toBe(false);
    expect(component.validate()).toBe(true);
  });

  it('debería soportar diferentes tipos de input mediante el input type', () => {
    component.type = 'email';
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    expect(input.type).toBe('email');
  });
});
