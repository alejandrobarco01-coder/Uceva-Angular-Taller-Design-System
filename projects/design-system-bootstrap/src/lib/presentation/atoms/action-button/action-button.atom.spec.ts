import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionButtonComponent } from './action-button.atom';

describe('ActionButtonComponent', () => {
  let fixture: ComponentFixture<ActionButtonComponent>;
  let component: ActionButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionButtonComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente con valores por defecto', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.variant).toBe('primary');
    expect(component.disabled).toBe(false);
    expect(component.label).toBe('');
  });

  it('debería renderizar la etiqueta proporcionada', () => {
    component.label = 'Guardar cambios';
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.textContent?.trim()).toBe('Guardar cambios');
  });

  it('debería aplicar la clase de variante primaria por defecto', () => {
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-primary')).toBe(true);
    expect(component.cssClass).toBe('action-button btn-primary');
  });

  it('debería aplicar la clase para variante secondary', () => {
    component.variant = 'secondary';
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-secondary')).toBe(true);
    expect(component.cssClass).toBe('action-button btn-secondary');
  });

  it('debería aplicar la clase para variante danger', () => {
    component.variant = 'danger';
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.classList.contains('btn-danger')).toBe(true);
    expect(component.cssClass).toBe('action-button btn-danger');
  });

  it('debería reflejar el estado disabled en el botón nativo y atributos ARIA', () => {
    component.disabled = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  it('debería emitir el evento actionClick al hacer clic cuando está habilitado', () => {
    const emitSpy = jest.spyOn(component.actionClick, 'emit');
    component.label = 'Revisar';
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  });

  it('no debería emitir evento si el botón está deshabilitado', () => {
    const emitSpy = jest.spyOn(component.actionClick, 'emit');
    component.disabled = true;
    fixture.detectChanges();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('no debería emitir evento al llamar handleClick directamente si disabled es true', () => {
    const emitSpy = jest.spyOn(component.actionClick, 'emit');
    component.disabled = true;

    const fakeEvent = new MouseEvent('click');
    component.handleClick(fakeEvent);

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
