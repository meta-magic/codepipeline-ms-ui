import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import { RouterModule, Routes } from '@angular/router';
import { NotificationComponent } from './app/project/notification.component';
import { TaskUIComponent } from './app/project/taskui/taskui.component';
import { InstanceUIComponent } from './app/project/instance-manager/instance.manager.component';
import { HttpClientModule } from '@angular/common/http';
import { PlatformCommmonsModule } from 'platform-commons';

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
    HttpClientModule,
    PlatformCommmonsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskUIComponent, InstanceUIComponent, NotificationComponent],
  exports: [RouterModule, TaskUIComponent, InstanceUIComponent]
})
export class CodePipeLineMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CodePipeLineMsUiModule,
      providers: []
    };
  }
}
