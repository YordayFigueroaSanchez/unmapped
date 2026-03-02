import { Routes } from '@angular/router';
import { MazeEditorComponent } from './maze-editor/maze-editor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'editor', pathMatch: 'full' },
  { path: 'editor', component: MazeEditorComponent }
];
