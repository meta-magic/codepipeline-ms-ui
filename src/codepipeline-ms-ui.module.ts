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
import { SourceCodeComponent } from './app/project/sourceCodeConfigration/sourceCode.component';

const routes: Routes = [
  {
    path: 'task-ui',
    component: TaskUIComponent
  },

  {
    path: 'instance-manager',
    component: InstanceUIComponent
  },
  {
    path: 'gitConfiguration',
    component: SourceCodeComponent
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
  declarations: [
    TaskUIComponent,
    InstanceUIComponent,
    NotificationComponent,
    SourceCodeComponent
  ],
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
