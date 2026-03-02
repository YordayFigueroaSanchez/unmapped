import { TestBed } from '@angular/core/testing';
import { MapRepositoryService } from './map-repository.service';
import { MazeMap } from '../maze-editor/maze-editor.component';

describe('MapRepositoryService', () => {
  let service: MapRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapRepositoryService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save and retrieve maps', () => {
    const testMap: MazeMap = {
      size: 8,
      cells: Array(8).fill(0).map(() => Array(8).fill(0)),
      start: { x: 0, y: 0 },
      goal: { x: 7, y: 7 }
    };

    service.saveMap(testMap);
    const maps = service.getMaps();
    expect(maps.length).toBe(1);
    expect(maps[0].size).toBe(8);
  });

  it('should persist maps to localStorage', () => {
    const testMap: MazeMap = {
      size: 8,
      cells: Array(8).fill(0).map(() => Array(8).fill(0)),
      start: { x: 0, y: 0 },
      goal: { x: 7, y: 7 }
    };

    service.saveMap(testMap);
    const stored = localStorage.getItem('unmapped_maps');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.length).toBe(1);
  });

  it('should delete maps', () => {
    const testMap: MazeMap = {
      size: 8,
      cells: Array(8).fill(0).map(() => Array(8).fill(0)),
      start: { x: 0, y: 0 },
      goal: { x: 7, y: 7 }
    };

    service.saveMap(testMap);
    service.deleteMap('0');
    expect(service.getMaps().length).toBe(0);
  });

  it('should clear all maps', () => {
    const testMap: MazeMap = {
      size: 8,
      cells: Array(8).fill(0).map(() => Array(8).fill(0)),
      start: { x: 0, y: 0 },
      goal: { x: 7, y: 7 }
    };

    service.saveMap(testMap);
    service.saveMap(testMap);
    service.clearAll();
    expect(service.getMaps().length).toBe(0);
  });
});
