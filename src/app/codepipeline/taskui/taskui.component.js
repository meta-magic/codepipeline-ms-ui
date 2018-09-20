"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by Ashwini on 15/2/18.
 */
var core_1 = require("@angular/core");
var TaskUIComponent = (function () {
    function TaskUIComponent(http, _notificationService, loaderService) {
        this.http = http;
        this._notificationService = _notificationService;
        this.loaderService = loaderService;
        this.msgData = [];
        this.refreshtime = 1;
        this.taskData = [];
    }
    //Initialized Method
    TaskUIComponent.prototype.ngOnInit = function () {
        // this.taskMethodCall(this.refreshtime);
        this.getTaskDetails();
    };
    //Method to Clear interval
    TaskUIComponent.prototype.ngOnDestroy = function () {
        // clearInterval(this.timeintrval);
    };
    TaskUIComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.msgData;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    TaskUIComponent.prototype.onChange = function () {
        // if (this.refreshtime >= 0.5) {
        //   clearInterval(this.timeintrval);
        //   this.taskMethodCall(this.refreshtime);
        // } else {
        //   this.msgData.push('time can not be less than 30 sec');
        //   // this.isValidateForm = true;
        //   this._notificationService.showWarningData(this.msgData);
        // }
        this.getTaskDetails();
    };
    //Method To Get All Tasks Details
    TaskUIComponent.prototype.getTaskDetails = function () {
        var _this = this;
        this.taskData = [];
        this.msgData = [];
        var taskResponse;
        this.serverFlag = true;
        this.loaderService.showLoader();
        this.http.get('/api/pipeline/task/findAll').subscribe(function (response) {
            taskResponse = response;
        }, function (error) {
            _this.msgData.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.serverFlag = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (taskResponse.success) {
                var task = taskResponse.response;
                _this.loaderService.hideLoader();
                _this.iterateData(task);
            }
            else {
                _this.msgData.push(taskResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }
        });
    };
    TaskUIComponent.prototype.iterateData = function (data) {
        var _this = this;
        this.taskData = [];
        data.forEach(function (obj) {
            var date = new Date(obj.auditDetails.updatedDate);
            var actualCreatedDate = date.toLocaleDateString();
            var actualTime = date.toLocaleTimeString();
            var obj1 = {
                type: obj.type,
                boundedContext: obj.boundedContext,
                domain: obj.domain,
                taskName: obj.taskName,
                status: obj.status,
                statusCode: obj.statusCode,
                statusMessage: obj.statusMessage,
                errorMessage: obj.errorMessage,
                Date: actualCreatedDate,
                Time: actualTime
            };
            _this.taskData.push(obj1);
        });
    };
    //Method to AUto Reload
    TaskUIComponent.prototype.taskMethodCall = function (data) {
        var _this = this;
        this.refreshInterval = null;
        this.refreshInterval = data * 60000;
        this.timeintrval = setInterval(function () {
            if (_this.serverFlag) {
                _this.getTaskDetails();
            }
        }, this.refreshInterval);
    };
    return TaskUIComponent;
}());
TaskUIComponent = __decorate([
    core_1.Component({
        selector: 'task-ui',
        styles: [
            "\n    .green {\n      color: green!important;\n     \n  }\n  .red {\n      color: red!important;\n     \n  }\n  .yellow {\n      color: yellow!important;\n      \n  }\n  .blue {\n    color: blue!important;    \n  }\n\n.node-style {\nwhite-space: nowrap;\ndisplay: inline; }\n     \n       "
        ],
        template: "\n   <amexio-row>\n    <amexio-column [size]=12>\n                       <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n      <div class=\"task-ui\">\n    <amexio-card [header]=\"true\"\n[footer]=\"false\"\n[show]=\"true\"\n[body-height]=\"82\">\n        <amexio-header class=\"instanceManagement\" style=\"display: block!important;\">\n          \n          <div style=\"display: flex;justify-content: space-between;\">\n              <div>Task Status</div>\n              <div></div>\n            <div class=\"tas-header\">\n              <amexio-image [icon-class]=\"'fa fa-refresh 2x'\" [tooltip]=\"'Reload'\" (onClick)=\"getTaskDetails()\"></amexio-image>     \n               <!--<amexio-label style=\"display: inline;\">Refresh Time:</amexio-label>\n               <amexio-label style=\"display: inline;float: right;\">min</amexio-label>\n              <amexio-number-input  [(ngModel)]=\"refreshtime\" (change)=\"onChange()\"  [has-label]=\"false\"\n                                    [min-value]=\"1\"\n                                    [min-error-msg]=\"'time can not be less than 30 sec'\">\n              </amexio-number-input>-->\n            </div>\n          </div>\n        </amexio-header>\n    <amexio-body>\n  <amexio-row>\n  <amexio-column [size] =12 >\n   <amexio-datagrid\n   [data]=\"taskData\"\n   [page-size] = \"10\"\n   [global-filter]=\"false\" \n   [enable-data-filter]=\"false\">\n    <amexio-data-table-column [data-index]=\"'type'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Type'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'boundedContext'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Bounded Context'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'domain'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Module'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'taskName'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Task Name'\">\n    </amexio-data-table-column>\n      <amexio-data-table-column [data-index]=\"'Date'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Date'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'Time'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Time'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'status'\"\n      [data-type]=\"'string'\" [hidden]=\"false\"\n      [text]=\"'Status'\">\n      <ng-template #amexioBodyTmpl let-row=\"row\">\n      <a class=\"fa fa-circle fa-lg\"\n     [ngClass]=\"{'yellow': row.statusCode==0 , 'blue': row.statusCode ==1 , 'green': row.statusCode ==5 , 'red' : row.statusCode ==3}\"></a>\n       &nbsp;{{row.status}} \n   </ng-template>\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'statusCode'\"\n      [data-type]=\"'string'\" [hidden]=\"true\"\n      [text]=\"'Status Code'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'statusMessage'\"\n      [data-type]=\"'string'\" [hidden]=\"true\"\n      [text]=\"'Status Message'\">\n    </amexio-data-table-column>\n    <amexio-data-table-column [data-index]=\"'errorMessage'\"\n      [data-type]=\"'string'\" [hidden]=\"true\"\n      [text]=\"'Error Message'\">\n    </amexio-data-table-column>\n   </amexio-datagrid>\n   </amexio-column>\n </amexio-row>\n </amexio-body>\n </amexio-card>\n      </div>\n </amexio-column>\n </amexio-row>\n <codepipeline-notification></codepipeline-notification>\n \n "
    })
], TaskUIComponent);
exports.TaskUIComponent = TaskUIComponent;
