import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Cell {
  x: number;
  y: number;
}

export interface MazeMap {
  size: number;
  cells: number[][];
  start: Cell;
  goal: Cell;
}

@Component({
  selector: 'app-maze-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './maze-editor.component.html',
  styleUrl: './maze-editor.component.css'
})
export class MazeEditorComponent implements OnInit, AfterViewInit {
  @Input() map: MazeMap | null = null;
  @Output() mapChange = new EventEmitter<MazeMap>();
  @ViewChild('editorCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  currentMap: MazeMap;
  cellSize = 22;
  isMouseDown = false;
  drawValue = 1; // 1 = wall, 0 = empty
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  
  // Undo/Redo
  history: MazeMap[] = [];
  historyIndex = -1;
  maxHistorySize = 30;

  constructor(private cdr: ChangeDetectorRef) {
    this.currentMap = this.createDefaultMap(8);
  }

  ngOnInit(): void {
    if (this.map) {
      this.currentMap = JSON.parse(JSON.stringify(this.map));
    }
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get canvas context');
    this.ctx = context;
    this.render();
  }

  createDefaultMap(size: number): MazeMap {
    const cells = Array(size).fill(0).map(() => Array(size).fill(0));
    return {
      size,
      cells,
      start: { x: 0, y: 0 },
      goal: { x: size - 1, y: size - 1 }
    };
  }

  render(): void {
    if (!this.ctx) return;

    const canvas = this.canvas;
    const cellSize = this.cellSize;
    const map = this.currentMap;

    // Clear
    this.ctx.fillStyle = '#0b2a35';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cells
    for (let y = 0; y < map.size; y++) {
      for (let x = 0; x < map.size; x++) {
        const px = x * cellSize;
        const py = y * cellSize;

        if (map.cells[y][x]) {
          // Wall
          this.ctx.fillStyle = '#18424f';
          this.ctx.fillRect(px, py, cellSize, cellSize);
        }

        // Border
        this.ctx.strokeStyle = '#1a3a45';
        this.ctx.strokeRect(px, py, cellSize, cellSize);
      }
    }

    // Draw start
    this.ctx.fillStyle = '#1f7a2b';
    this.ctx.fillRect(
      map.start.x * cellSize,
      map.start.y * cellSize,
      cellSize,
      cellSize
    );

    // Draw goal
    this.ctx.fillStyle = '#a63b3b';
    this.ctx.fillRect(
      map.goal.x * cellSize,
      map.goal.y * cellSize,
      cellSize,
      cellSize
    );
  }

  onCanvasClick(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.cellSize);
    const y = Math.floor((event.clientY - rect.top) / this.cellSize);

    if (x >= 0 && x < this.currentMap.size && y >= 0 && y < this.currentMap.size) {
      this.toggleWall(x, y);
      this.render();
    }
  }

  onCanvasMouseDown(event: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.cellSize);
    const y = Math.floor((event.clientY - rect.top) / this.cellSize);

    if (x >= 0 && x < this.currentMap.size && y >= 0 && y < this.currentMap.size) {
      this.isMouseDown = true;
      this.drawValue = this.currentMap.cells[y][x] ? 0 : 1;
      this.toggleWall(x, y);
      this.render();
    }
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (!this.isMouseDown) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / this.cellSize);
    const y = Math.floor((event.clientY - rect.top) / this.cellSize);

    if (x >= 0 && x < this.currentMap.size && y >= 0 && y < this.currentMap.size) {
      if (this.currentMap.cells[y][x] !== this.drawValue) {
        this.currentMap.cells[y][x] = this.drawValue;
        this.mapChange.emit(this.currentMap);
        this.render();
      }
    }
  }

  onCanvasMouseUp(): void {
    this.isMouseDown = false;
  }

  export(): MazeMap {
    return JSON.parse(JSON.stringify(this.currentMap));
  }

  import(mapData: MazeMap): void {
    if (!this.isValidMap(mapData)) {
      console.error('Invalid map data');
      return;
    }
    this.currentMap = JSON.parse(JSON.stringify(mapData));
    this.mapChange.emit(this.currentMap);
    this.render();
  }

  private isValidMap(map: any): boolean {
    return (
      map.size > 0 &&
      Array.isArray(map.cells) &&
      map.cells.length === map.size &&
      map.cells[0].length === map.size &&
      map.start && map.goal
    );
  }

  toggleWall(x: number, y: number): void {
    this.currentMap.cells[y][x] = this.currentMap.cells[y][x] ? 0 : 1;
    this.mapChange.emit(this.currentMap);
    this.saveSnapshot();
  }

  setStart(x: number, y: number): void {
    this.currentMap.start = { x, y };
    this.mapChange.emit(this.currentMap);
    this.render();
  }

  setGoal(x: number, y: number): void {
    this.currentMap.goal = { x, y };
    this.mapChange.emit(this.currentMap);
    this.render();
  }

  newMap(size: number | string = 8): void {
    const numSize = typeof size === 'string' ? parseInt(size, 10) : size;
    this.currentMap = this.createDefaultMap(Math.max(1, Math.min(50, numSize)));
    this.mapChange.emit(this.currentMap);
    this.render();
  }

  downloadMap(): void {
    const json = JSON.stringify(this.currentMap, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `maze-${this.currentMap.size}x${this.currentMap.size}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private saveSnapshot(): void {
    // Remove any redo states if we're not at the end
    this.history = this.history.slice(0, this.historyIndex + 1);
    
    // Add new snapshot
    const snapshot = JSON.parse(JSON.stringify(this.currentMap));
    this.history.push(snapshot);
    
    // Cap history size
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  }

  undo(): void {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.currentMap = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
      this.mapChange.emit(this.currentMap);
      this.render();
    }
  }

  redo(): void {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.currentMap = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
      this.mapChange.emit(this.currentMap);
      this.render();
    }
  }

  canUndo(): boolean {
    return this.historyIndex > 0;
  }

  canRedo(): boolean {
    return this.historyIndex < this.history.length - 1;
  }
