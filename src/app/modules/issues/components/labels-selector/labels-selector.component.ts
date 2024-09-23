import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import { IssuesService } from '../../services/issues.service';
import type { GithubLabel } from '../../interfaces';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent {
  public labels = input.required<GithubLabel[]>();
  public issuesService = inject(IssuesService);

  isLabelSelected(labelName: string) {
    return this.issuesService.selectedLabels().has(labelName);
  }

  onToggleLabel(labelName: string) {
    this.issuesService.toggleLabel(labelName);
  }
}
