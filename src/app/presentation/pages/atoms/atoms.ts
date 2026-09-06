import { Component } from '@angular/core';
import { RiskBadgeComponent, RiskLevel } from '@brejcha13320/design-system-bootstrap';

@Component({
  templateUrl: './atoms.html',
  imports: [RiskBadgeComponent],
})
export class Atoms {
  readonly riskLevels: readonly RiskLevel[] = ['low', 'medium', 'high'];
}
