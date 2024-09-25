import { TestBed } from '@angular/core/testing';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';

import { State } from '../interfaces';
import { IssuesService } from './issues.service';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      //? destroy the service after each test in false to avoid the error of the service being destroyed
      teardown: { destroyAfterEach: false },
      providers: [provideAngularQuery(queryClient)],
    });
    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    const { data } = await service.labelsQuery.refetch();

    expect(data?.length).toBe(30);

    if (!data) {
      return expect(data).toBeDefined();
    }

    const label = data[0];

    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.name).toBe('string');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
  });

  it('should set selected state OPEN, CLOSED, ALL', async () => {
    service.showIssuesByState(State.Closed);
    expect(service.selectedState()).toBe(State.Closed);

    const { data } = await service.issuesQuery.refetch();

    if (!data) {
      return expect(data).toBeDefined();
    }

    data.forEach((issue) => {
      expect(issue.state).toBe(State.Closed);
    });

    service.showIssuesByState(State.Open);
    const { data: dataOpen } = await service.issuesQuery.refetch();

    dataOpen?.forEach((issue) => {
      expect(issue.state).toBe(State.Open);
    });

    // service.showIssuesByState(State.All);
    // const { data: dataAll } = await service.issuesQuery.refetch();

    // dataAll?.forEach((issue) => {
    //   expect(issue.state).toBe(State.All);
    // });
  });

  it('should set selectedLabels', async () => {
    service.toggleLabel('Accessiblity');
    expect(service.selectedLabels().has('Accessiblity')).toBe(true);

    service.toggleLabel('Accessiblity');
    expect(service.selectedLabels().has('Accessiblity')).toBe(false);
  });

  it('Should set selectedLabels and get issues by label', async () => {
    const label = 'Accessiblity';

    service.toggleLabel(label);
    expect(service.selectedLabels().has(label)).toBe(true);

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some((l) => l.name === label);
      expect(hasLabel).toBe(true);
    });
  });
});
