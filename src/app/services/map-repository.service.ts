import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MazeMap } from '../maze-editor/maze-editor.component';

@Injectable({
  providedIn: 'root'
})
export class MapRepositoryService {
  private readonly storageKey = 'unmapped_maps';
  private mapsSubject = new BehaviorSubject<MazeMap[]>([]);
  public maps$ = this.mapsSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  getMaps(): MazeMap[] {
    return this.mapsSubject.value;
  }

  getMapById(id: string): MazeMap | undefined {
    // For now, we'll use index as ID
    const maps = this.getMaps();
    const index = parseInt(id, 10);
    return maps[index];
  }

  saveMap(map: MazeMap): void {
    const maps = this.getMaps();
    maps.push(JSON.parse(JSON.stringify(map)));
    this.mapsSubject.next(maps);
    this.saveToStorage();
  }

  updateMap(id: string, map: MazeMap): void {
    const maps = this.getMaps();
    const index = parseInt(id, 10);
    if (index >= 0 && index < maps.length) {
      maps[index] = JSON.parse(JSON.stringify(map));
      this.mapsSubject.next(maps);
      this.saveToStorage();
    }
  }

  deleteMap(id: string): void {
    const maps = this.getMaps();
    const index = parseInt(id, 10);
    if (index >= 0 && index < maps.length) {
      maps.splice(index, 1);
      this.mapsSubject.next(maps);
      this.saveToStorage();
    }
  }

  clearAll(): void {
    this.mapsSubject.next([]);
    this.saveToStorage();
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const maps = JSON.parse(data);
        if (Array.isArray(maps)) {
          this.mapsSubject.next(maps);
        }
      }
    } catch (e) {
      console.error('Failed to load maps from storage', e);
    }
  }

  private saveToStorage(): void {
    try {
      const maps = this.getMaps();
      localStorage.setItem(this.storageKey, JSON.stringify(maps));
    } catch (e) {
      console.error('Failed to save maps to storage', e);
    }
  }
}
