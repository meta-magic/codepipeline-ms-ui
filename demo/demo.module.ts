import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CodePipeLineMsUiModule } from '../src';
import { DemoComponent } from './demo.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import { RouterModule, Routes } from '@angular/router';
import { TaskUIComponent } from '../src/app/project/taskui/taskui.component';

const routes: Routes = [
  {
    path: 'task-ui',
    component: TaskUIComponent
  }
];

@NgModule({
  declarations: [DemoComponent],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AmexioWidgetModule,
    CodePipeLineMsUiModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
