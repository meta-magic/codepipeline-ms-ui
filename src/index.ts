import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import { RouterModule, Routes } from '@angular/router';
import { TaskUIComponent } from './app/codepipeline/taskui/taskui.component';
import { InstanceUIComponent } from './app/codepipeline/instance-manager/instance.manager.component';
import { HttpClientModule } from '@angular/common/http';
import { PlatformCommmonsModule } from 'platform-commons';
import { SourceCodeComponent } from './app/codepipeline/sourceCodeConfigration/sourceCode.component';
import {CodePipelineNotificationComponent} from './app/codepipeline/notification.component';


export *  from './app/codepipeline/taskui/taskui.component';
export *  from './app/codepipeline/instance-manager/instance.manager.component';
export *  from './app/codepipeline/sourceCodeConfigration/sourceCode.component';
export *  from './app/codepipeline/notification.component';


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
    PlatformCommmonsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    TaskUIComponent,
    InstanceUIComponent,
    CodePipelineNotificationComponent,
    SourceCodeComponent
  ],
  exports: [
    TaskUIComponent,
    InstanceUIComponent,
    CodePipelineNotificationComponent,
    SourceCodeComponent
  ]
})
export class CodePipeLineMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CodePipeLineMsUiModule,
      providers: []
    };
  }
}
