import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { GithubIssue, State } from '../../interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [
    CommonModule,RouterLink
  ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent { 

  issue = input.required<GithubIssue>();

  get isOpen(){
    return this.issue().state === State.Open;
  }
}
