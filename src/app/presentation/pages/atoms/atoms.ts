import { Component } from '@angular/core';
import { ActionButtonComponent, RiskBadgeComponent, RiskLevel } from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './atoms.html',
  imports: [RiskBadgeComponent, ActionButtonComponent],
})
export class Atoms {
  readonly riskLevels: readonly RiskLevel[] = ['low', 'medium', 'high'];
  lastButtonClicked = '';

  onButtonClick(label: string): void {
    this.lastButtonClicked = `Botón accionado: ${label}`;
  }
}
