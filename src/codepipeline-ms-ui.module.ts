import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { TaskUIComponent } from './app/project/taskui/taskui.component';
import {InstanceUIComponent} from "./app/project/instance-manager/instance.manager.component";

const routes: Routes = [
  {
    path: 'task-ui',
    component: TaskUIComponent
  },
  {
    path: 'instance-manager',
    component: InstanceUIComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioWidgetModule,
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskUIComponent,InstanceUIComponent],
  exports: [RouterModule, TaskUIComponent,InstanceUIComponent]
})
export class CodePipeLineMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CodePipeLineMsUiModule,
      providers: []
    };
  }
}
