import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiskBadgeComponent } from './risk-badge.atom';

describe('RiskBadgeComponent', () => {
  let fixture: ComponentFixture<RiskBadgeComponent>;
  let component: RiskBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RiskBadgeComponent] }).compileComponents();
    fixture = TestBed.createComponent(RiskBadgeComponent);
    component = fixture.componentInstance;
  });

  it.each([
    ['low', 'Bajo', 'risk-low'],
    ['medium', 'Medio', 'risk-medium'],
    ['high', 'Alto', 'risk-high'],
  ] as const)('renders %s risk with its label and style', (level, label, cssClass) => {
    component.riskLevel = level;
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.risk-badge') as HTMLElement;
    expect(badge.textContent).toContain(label);
    expect(badge.classList).toContain(cssClass);
    expect(badge.getAttribute('aria-label')).toBe(`Riesgo ${label}`);
  });
});
