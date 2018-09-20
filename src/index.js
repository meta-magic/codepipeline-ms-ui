"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var amexio_ng_extensions_1 = require("amexio-ng-extensions");
var router_1 = require("@angular/router");
var taskui_component_1 = require("./app/codepipeline/taskui/taskui.component");
var instance_manager_component_1 = require("./app/codepipeline/instance-manager/instance.manager.component");
var http_1 = require("@angular/common/http");
var platform_commons_1 = require("platform-commons");
var sourceCode_component_1 = require("./app/codepipeline/sourceCodeConfigration/sourceCode.component");
var notification_component_1 = require("./app/codepipeline/notification.component");
__export(require("./app/codepipeline/taskui/taskui.component"));
__export(require("./app/codepipeline/instance-manager/instance.manager.component"));
__export(require("./app/codepipeline/sourceCodeConfigration/sourceCode.component"));
__export(require("./app/codepipeline/notification.component"));
var routes = [
    {
        path: 'task-ui',
        component: taskui_component_1.TaskUIComponent
    },
    {
        path: 'instance-manager',
        component: instance_manager_component_1.InstanceUIComponent
    },
    {
        path: 'gitConfiguration',
        component: sourceCode_component_1.SourceCodeComponent
    }
];
var CodePipeLineMsUiModule = CodePipeLineMsUiModule_1 = (function () {
    function CodePipeLineMsUiModule() {
    }
    CodePipeLineMsUiModule.forRoot = function () {
        return {
            ngModule: CodePipeLineMsUiModule_1,
            providers: []
        };
    };
    return CodePipeLineMsUiModule;
}());
CodePipeLineMsUiModule = CodePipeLineMsUiModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            amexio_ng_extensions_1.AmexioWidgetModule,
            http_1.HttpClientModule,
            platform_commons_1.PlatformCommmonsModule.forRoot(),
            router_1.RouterModule.forChild(routes)
        ],
        declarations: [
            taskui_component_1.TaskUIComponent,
            instance_manager_component_1.InstanceUIComponent,
            notification_component_1.CodePipelineNotificationComponent,
            sourceCode_component_1.SourceCodeComponent
        ],
        exports: [
            taskui_component_1.TaskUIComponent,
            instance_manager_component_1.InstanceUIComponent,
            notification_component_1.CodePipelineNotificationComponent,
            sourceCode_component_1.SourceCodeComponent
        ]
    })
], CodePipeLineMsUiModule);
exports.CodePipeLineMsUiModule = CodePipeLineMsUiModule;
var CodePipeLineMsUiModule_1;
