import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MazeEditorComponent, MazeMap } from './maze-editor.component';

describe('MazeEditorComponent', () => {
  let component: MazeEditorComponent;
  let fixture: ComponentFixture<MazeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MazeEditorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MazeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a default 8x8 map', () => {
    expect(component.currentMap.size).toBe(8);
    expect(component.currentMap.cells.length).toBe(8);
    expect(component.currentMap.cells[0].length).toBe(8);
  });

  it('should toggle walls correctly', () => {
    const initialState = component.currentMap.cells[0][0];
    component.toggleWall(0, 0);
    expect(component.currentMap.cells[0][0]).toBe(initialState ? 0 : 1);
  });

  it('should set start position', () => {
    component.setStart(2, 3);
    expect(component.currentMap.start.x).toBe(2);
    expect(component.currentMap.start.y).toBe(3);
  });

  it('should set goal position', () => {
    component.setGoal(5, 6);
    expect(component.currentMap.goal.x).toBe(5);
    expect(component.currentMap.goal.y).toBe(6);
  });

  it('should export map correctly', () => {
    component.toggleWall(0, 0);
    const exported = component.export();
    
    expect(exported.size).toBe(component.currentMap.size);
    expect(JSON.stringify(exported)).toBe(JSON.stringify(component.currentMap));
  });

  it('should import a valid map', () => {
    const testMap: MazeMap = {
      size: 5,
      cells: [[1, 0], [0, 1], [1, 1], [0, 0], [1, 0]].map(r => [...r, 0, 1, 1]),
      start: { x: 0, y: 0 },
      goal: { x: 4, y: 4 }
    };

    component.import(testMap);
    expect(component.currentMap.size).toBe(5);
    expect(component.currentMap.start).toEqual({ x: 0, y: 0 });
  });

  it('should emit mapChange when toggling walls', (done) => {
    component.mapChange.subscribe(() => {
      done();
    });
    component.toggleWall(1, 1);
  });

  it('should undo/redo correctly', () => {
    const initialCell = component.currentMap.cells[0][0];
    component.toggleWall(0, 0);
    component.undo();
    expect(component.currentMap.cells[0][0]).toBe(initialCell);
    component.redo();
    expect(component.currentMap.cells[0][0]).toBe(initialCell ? 0 : 1);
  });

  it('should create new map with custom size', () => {
    component.newMap(12);
    expect(component.currentMap.size).toBe(12);
    expect(component.currentMap.cells.length).toBe(12);
  });
});
