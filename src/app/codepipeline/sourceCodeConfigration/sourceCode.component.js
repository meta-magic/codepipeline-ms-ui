"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var SourceCodeComponent = (function () {
    function SourceCodeComponent(http, cookie, loaderService, _notificationService, cdf, componentFactoryResolver) {
        this.http = http;
        this.cookie = cookie;
        this.loaderService = loaderService;
        this._notificationService = _notificationService;
        this.cdf = cdf;
        this.componentFactoryResolver = componentFactoryResolver;
        this.checkWithDisable = true;
        this.gitActiveTab = true;
        this.showCommitAllWindow = false;
        this.showInitializeWindow = false;
        this.showPullWindow = false;
        this.SaveasyncFlag = false;
        this.msgData = [];
        this.gitModel = new GitModel();
        this.initailiseDataModel = new InitializeDataModel();
        this.commitAllDataClass = new CommitAllDataClass();
        this.pullDataClass = new PullDataClass();
        this.respositoryTypeData = {
            response: {
                data: [
                    {
                        repositoryTypeName: 'Public',
                        repositoryType: '1',
                        disabled: false
                    },
                    {
                        repositoryTypeName: 'Private',
                        repositoryType: '2',
                        disabled: false
                    }
                ]
            }
        };
    }
    SourceCodeComponent.prototype.ngOnInit = function () {
        this.syncMappedRepositoryURL();
    };
    SourceCodeComponent.prototype.createInvalidCompErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Invalid Component', errorData);
    };
    SourceCodeComponent.prototype.syncMappedRepositoryURL = function () {
        var _this = this;
        var responseData;
        var firstCommit;
        this.http.get('/api/project/project/findRepositoryByProjectUUID').subscribe(function (response) {
            responseData = response;
        }, function (err) { }, function () {
            if (responseData.success) {
                if (responseData.response) {
                    if (responseData.response.repositioryDetails == '' ||
                        responseData.response.repositioryDetails == null) {
                        _this.gitActiveTab = true;
                        _this.tabdisabledFlag = true;
                        _this.actionActiveTab = false;
                        _this.gitdisabledFlag = false;
                    }
                    else {
                        _this.tabdisabledFlag = false;
                        _this.gitActiveTab = false;
                        _this.actionActiveTab = true;
                        _this.gitdisabledFlag = true;
                        _this.initailiseDataModel.repositoryUrl =
                            responseData.response.repositioryDetails.repositoryUrl;
                        _this.initailiseDataModel.repositoryType =
                            responseData.response.repositioryDetails.repositoryType;
                        _this.URLDisabled = true;
                        _this.respositoryTypeData.response.data.disabled = true;
                        if (responseData.response.repositioryDetails.isInitialize) {
                            _this.initailizeDisable = true;
                        }
                    }
                }
            }
            else {
                // repository is not present i.e firstCommit = true
                _this.tabdisabledFlag = true;
            }
        });
    };
    SourceCodeComponent.prototype.onBlurCheck = function (rUrl) {
        this.msgData = [];
        if (rUrl != null && rUrl.isComponentValid) {
        }
        else {
            this.msgData.push('Repository URL is not valid ,Please check');
            this._notificationService.showWarningData(this.msgData);
        }
    };
    SourceCodeComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    SourceCodeComponent.prototype.setSelectedRepository = function (data) {
        this.gitModel.repositoryType = data.repositoryType;
    };
    SourceCodeComponent.prototype.setInitailizeRepository = function (data) {
        this.initailiseDataModel.repositoryType = data.repositoryType;
    };
    SourceCodeComponent.prototype.onSave = function () {
        var _this = this;
        var response;
        this.SaveasyncFlag = true;
        this.loaderService.showLoader();
        var requestOption = {
            repositoryUrl: this.gitModel.repositoryUrl,
            repositoryType: this.gitModel.repositoryType,
            isInitialize: this.gitModel.isInitialize
        };
        this.http
            .post('/api/project/project/updaterepository', requestOption)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.SaveasyncFlag = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.syncMappedRepositoryURL();
                _this.resetData();
                _this.SaveasyncFlag = false;
                _this.loaderService.hideLoader();
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    SourceCodeComponent.prototype.resetData = function () {
        this.gitModel.repositoryUrl = '';
        this.gitModel.repositoryType = '';
    };
    SourceCodeComponent.prototype.onCommit = function () {
        if (this.initailizeDisable) {
            this.showCommitAllWindow = true;
        }
        else {
            this.warningdialogue = true;
        }
    };
    SourceCodeComponent.prototype.closeCommitAllWindow = function () {
        this.commitAllDataClass.repositoryUsername = '';
        this.commitAllDataClass.repositoryPassword = '';
        this.showCommitAllWindow = false;
    };
    SourceCodeComponent.prototype.onCommitAllChangesClick = function () {
        var _this = this;
        var response;
        this.loaderService.showLoader();
        var requestOption = {
            username: this.commitAllDataClass.repositoryUsername,
            password: this.commitAllDataClass.repositoryPassword,
            repositoryURL: this.initailiseDataModel.repositoryUrl,
            commitMessage: this.commitAllDataClass.commitMessage
        };
        this.http
            .post('/api/pipeline/SourceCodeSharing/commitAll', requestOption)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.commitAllDataClass.commitMessage = '';
                _this.closeCommitAllWindow();
                _this.loaderService.hideLoader();
                _this.msgData = [];
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    SourceCodeComponent.prototype.closeInitializeWindow = function () {
        this.initailiseDataModel.repositoryUsername = '';
        this.initailiseDataModel.repositoryPassword = '';
        this.showInitializeWindow = false;
    };
    SourceCodeComponent.prototype.validateAndInitialize = function () {
        console.log('in initailise');
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.initailiseDataModel.repositoryUsername == null ||
            this.initailiseDataModel.repositoryUsername == '') {
            this.validationMsgArray.push('Please enter valid user name');
        }
        if (this.initailiseDataModel.repositoryPassword == null ||
            this.initailiseDataModel.repositoryPassword == '') {
            this.validationMsgArray.push('Please enter valid repositoryPassword');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.onInitializeChangesClick();
        }
    };
    SourceCodeComponent.prototype.validateAndCommit = function () {
        console.log('in commit');
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.commitAllDataClass.repositoryUsername == null ||
            this.commitAllDataClass.repositoryUsername == '') {
            this.validationMsgArray.push('Please enter valid user name');
        }
        if (this.commitAllDataClass.repositoryPassword == null ||
            this.commitAllDataClass.repositoryPassword == '') {
            this.validationMsgArray.push('Please enter valid repositoryPassword');
        }
        if (this.commitAllDataClass.commitMessage == null ||
            this.commitAllDataClass.commitMessage == '') {
            this.validationMsgArray.push('Please enter commit message');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.onCommitAllChangesClick();
        }
    };
    SourceCodeComponent.prototype.validateAndPull = function () {
        console.log('in pull');
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.pullDataClass.repositoryUsername == null ||
            this.pullDataClass.repositoryUsername == '') {
            this.validationMsgArray.push('Please enter valid user name');
        }
        if (this.pullDataClass.repositoryPassword == null ||
            this.pullDataClass.repositoryPassword == '') {
            this.validationMsgArray.push('Please enter valid repositoryPassword');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.onPullChangesClick();
        }
    };
    SourceCodeComponent.prototype.onInitializeChangesClick = function () {
        var _this = this;
        this.validationMsgArray = [];
        var response;
        this.loaderService.showLoader();
        this.http
            .post('/api/project/sourcecodecommit/initialize', this.initailiseDataModel)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.closeInitializeWindow();
                _this.loaderService.hideLoader();
                _this.msgData = [];
                _this.msgData.push('Initailise process started,please check the status in Task Details');
                _this._notificationService.showSuccessData(_this.msgData);
                _this.initailizeDisable = true;
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    SourceCodeComponent.prototype.onInitialize = function () {
        this.validationMsgArray = [];
        if (this.initailiseDataModel.repositoryType == '') {
            this.validationMsgArray.push('Please Select  repository type');
        }
        if (this.initailiseDataModel.repositoryUrl == '') {
            this.validationMsgArray.push('Please enter valid repositoryUrl');
        }
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.createInvalidCompErrorData();
            return;
        }
        else {
            this.showInitializeWindow = true;
        }
    };
    SourceCodeComponent.prototype.onPull = function () {
        if (this.initailizeDisable) {
            this.showPullWindow = true;
        }
        else {
            this.warningdialogue = true;
        }
    };
    SourceCodeComponent.prototype.okWarningBtnClick = function () {
        this.warningdialogue = false;
    };
    SourceCodeComponent.prototype.closePullWindow = function () {
        this.pullDataClass.repositoryPassword = '';
        this.pullDataClass.repositoryUsername = '';
        this.showPullWindow = false;
    };
    SourceCodeComponent.prototype.onPullChangesClick = function () {
        var _this = this;
        this.validationMsgArray = [];
        var response;
        this.loaderService.showLoader();
        var requestOption = {
            username: this.pullDataClass.repositoryUsername,
            password: this.pullDataClass.repositoryPassword
        };
        this.http
            .post('/api/pipeline/SourceCodeSharing/pull', requestOption)
            .subscribe(function (resp) {
            response = resp;
        }, function (error) {
            _this.validationMsgArray = [];
            _this.validationMsgArray.push('Unable to connect to server');
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.closePullWindow();
                _this.loaderService.hideLoader();
                _this.msgData = [];
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
            }
            else {
                _this.loaderService.hideLoader();
            }
        });
    };
    return SourceCodeComponent;
}());
SourceCodeComponent = __decorate([
    core_1.Component({
        selector: 'sourceCode',
        //language=Angular2HTML
        template: "\n     <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n<amexio-tab-view [closable]=\"false\">\n    <amexio-tab title=\"Git Configuration\" [disabled]=\"gitdisabledFlag\" [active]=\"gitActiveTab\">\n\n        <amexio-form [form-name]=\"'validateForm'\" [body-height]=\"80\" [header]=\"false\" [show-error]=\"true\" [footer-align]=\"'right'\">\n            <amexio-form-body>\n                <amexio-row>\n                    <amexio-column [size]=\"12\">\n                        <amexio-radio-group [field-label]=\"'Git Repository Type'\" [allow-blank]=\"false\" name=\"gitModel.repositoryType\" [display-field]=\"'repositoryTypeName'\"\n                            [value-field]=\"'repositoryType'\" [horizontal]=\"true\" [data-reader]=\"'response.data'\" [data]=\"respositoryTypeData\"\n                            [default-value]=\"gitModel.repositoryType\"\n                            (onSelection)=\"setSelectedRepository($event)\">\n                        </amexio-radio-group>\n                    </amexio-column>\n                    <amexio-column [size]=\"12\">\n                        <amexio-text-input #rUrl [(ngModel)]=\"gitModel.repositoryUrl\" [field-label]=\"'Git Repository URL'\" name=\"gitModel.repositoryUrl\"\n                            [place-holder]=\"'https://github.com/meta-magic/demoapp.git'\" [enable-popover]=\"true\" (onBlur)=\"onBlurCheck(rUrl)\"\n                            [pattern]=\"'/((http|https)://)?[A-Za-z0-9.-]{3,}.[A-Za-z]{2}/'\" [allow-blank]=\"false\" error-msg=\"Please Enter Repository URL\"\n                            [icon-feedback]=\"true\">\n                        </amexio-text-input>\n                    </amexio-column>\n                </amexio-row>\n\n            </amexio-form-body>\n            <amexio-form-action>\n\n                <amexio-button [label]=\"'save'\" [type]=\"'primary'\" [tooltip]=\"'Save'\" [size]=\"'default'\" [icon]=\"'fa fa-save'\" [disabled]=\"false\"\n                      [loading]=\"SaveasyncFlag\"\n  [form-bind]=\"'validateForm'\" (onClick)=\"onSave()\">\n                </amexio-button>\n\n\n            </amexio-form-action>\n\n        </amexio-form>\n\n    </amexio-tab>\n    <amexio-tab title=\"Action\" [disabled]=\"tabdisabledFlag\" [active]=\"actionActiveTab\">\n        <amexio-card [header]=\"false\" [footer]=\"false\" [footer-align]=\"'right'\" [body-height]=\"80\">\n            <amexio-body>\n                <amexio-row>\n                    <amexio-column [size]=\"12\">\n                        <amexio-radio-group [field-label]=\"'Git Repository Type'\" [allow-blank]=\"false\" name=\"initailiseDataModel.repositoryType\" [display-field]=\"'repositoryTypeName'\"\n                            [value-field]=\"'repositoryType'\" [horizontal]=\"true\" [data-reader]=\"'response.data'\" [data]=\"respositoryTypeData\"\n                            [default-value]=\"initailiseDataModel.repositoryType\"  disabled=\"true\" (onSelection)=\"setInitailizeRepository($event)\" >\n                        </amexio-radio-group>\n                    </amexio-column>\n                    <amexio-column [size]=\"12\">\n                        <amexio-text-input #rUrl [(ngModel)]=\"initailiseDataModel.repositoryUrl\" [field-label]=\"'Git Repository URL'\" name=\"initailiseDataModel.repositoryUrl\"\n                            [place-holder]=\"'https://github.com/meta-magic/demoapp.git'\" [enable-popover]=\"true\" (onBlur)=\"onBlurCheck(rUrl)\"\n                            [pattern]=\"'/((http|https)://)?[A-Za-z0-9.-]{3,}.[A-Za-z]{2}/'\" [allow-blank]=\"false\" error-msg=\"Please Enter Repository URL\"\n                            [disabled]=\"URLDisabled\" [icon-feedback]=\"true\">\n                        </amexio-text-input>\n                    </amexio-column>\n                </amexio-row>\n                <amexio-fieldset [collapsible]=\"false\" title=\"Initialise\">\n\n                    <amexio-row>\n                        <amexio-column [size]=\"4\">\n                           <amexio-box border-color =\"blue\" border=\"left\" padding=\"true\" background-color=\"blue\">\n  <amexio-label>$ git clone repository-url</amexio-label>\n</amexio-box>\n                        </amexio-column>\n<amexio-column [size]=\"4\">\n <amexio-box border-color =\"blue\" border=\"left\" padding=\"true\" background-color=\"blue\">\n  <amexio-label>$ git init</amexio-label>\n</amexio-box>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\">\n                        <amexio-checkbox [disabled]=\"true\"  [field-label]=\"'Clone/Push'\"\n                        [(ngModel)]=\"checkWithDisable\">\n</amexio-checkbox>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\">\n                            <amexio-button (onClick)=\"onInitialize()\"  [disabled]=\"initailizeDisable\" [label]=\"'Initialize'\" [type]=\"'primary'\" [tooltip]=\"'Initialize'\" [size]=\"'default'\">\n                            </amexio-button>\n                        </amexio-column>\n\n                    </amexio-row>\n                </amexio-fieldset>\n                <amexio-fieldset [collapsible]=\"true\" title=\"Commit All\">\n\n                    <amexio-row>\n                        <amexio-column [size]=\"10\">\n                            <amexio-text-input [field-label]=\"'comment'\" name=\"commitMessage\" [place-holder]=\"'Enter commit message'\" [error-msg]=\"'Please enter comment'\"\n                              [(ngModel)]=\"commitAllDataClass.commitMessage\"  [icon-feedback]=\"true\" [allow-blank]=\"false\" [enable-popover]=\"true\">\n                            </amexio-text-input>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\" style=\"padding-top:33px;\">\n                            <amexio-button (onClick)=\"onCommit()\" [label]=\"'Push'\" [type]=\"'primary'\" [tooltip]=\"'Push'\" [size]=\"'default'\" [disabled]=\"false\">\n                            </amexio-button>\n                        </amexio-column>\n\n                    </amexio-row>\n                </amexio-fieldset>\n                 <amexio-fieldset [collapsible]=\"true\" title=\"Pull\">\n\n                    <amexio-row>\n                        <amexio-column [size]=\"10\">\n                            <amexio-box border-color =\"blue\" border=\"left\" padding=\"true\" background-color=\"blue\">\n  <amexio-label>$ git pull</amexio-label>\n</amexio-box>\n                        </amexio-column>\n                        <amexio-column [size]=\"2\">\n                        \n                            <amexio-button (onClick)=\"onPull()\" [label]=\"'Pull'\" [type]=\"'primary'\" [tooltip]=\"'Pull'\" [size]=\"'default'\" [disabled]=\"false\">\n                            </amexio-button>\n                                                </amexio-column>\n\n                    </amexio-row>\n                </amexio-fieldset>\n\n            </amexio-body>\n\n        </amexio-card>\n    </amexio-tab>\n\n</amexio-tab-view>\n<amexio-window [show-window]=\"showInitializeWindow\" (close)=\"closeInitializeWindow()\" type=\"window\"\n                             [closable]=\"true\" [footer]=\"true\">\n                <amexio-header> Initialize </amexio-header>\n                <amexio-body>\n                  \n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <amexio-textarea-input [field-label]=\"'User name or email address'\" name=\"repositoryUsername\"\n                                             [(ngModel)]=\"initailiseDataModel.repositoryUsername\"\n                                             [place-holder]=\"'Enter GitHub user name or email address'\"\n                                             [error-msg]=\"'Please enter user name'\" [icon-feedback]=\"true\" [rows]=\"'1'\"\n                                             [columns]=\"'2'\" [allow-blank]=\"false\"\n                                             [enable-popover]=\"true\"></amexio-textarea-input>\n                    </amexio-column>\n                    <amexio-column [size]=\"6\">\n                      <amexio-password-input [enable-popover]=\"true\" [(ngModel)]=\"initailiseDataModel.repositoryPassword\"\n                                             [field-label]=\"'Password '\" name=\"Password\"\n                                             [place-holder]=\"'Enter GitHub Password'\" [allow-blank]=\"false\"\n                                             [error-msg]=\"'Please enter Password'\"\n                                             [icon-feedback]=\"true\"></amexio-password-input>\n                    </amexio-column>\n                  </amexio-row>\n                </amexio-body>\n                <amexio-action>\n                  <amexio-button (onClick)=\"closeInitializeWindow()\" label=\"Cancel\" type=\"white\"\n                                 [icon]=\"'fa fa-remove'\"></amexio-button>\n                  <amexio-button (onClick)=\"validateAndInitialize()\" label=\"Initailise\" type=\"green\"\n                                 [icon]=\"'fa fa fa-arrow-circle-up'\"></amexio-button>\n                </amexio-action>\n              </amexio-window>\n <amexio-window [show-window]=\"showCommitAllWindow\" (close)=\"closeCommitAllWindow()\" type=\"window\"\n                             [closable]=\"true\" [footer]=\"true\">\n                <amexio-header> Commit Changes</amexio-header>\n                <amexio-body>\n                  \n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <amexio-textarea-input [field-label]=\"'User name or email address'\" name=\"repositoryUsername\"\n                                             [(ngModel)]=\"commitAllDataClass.repositoryUsername\"\n                                             [place-holder]=\"'Enter GitHub user name or email address'\"\n                                             [error-msg]=\"'Please enter user name'\" [icon-feedback]=\"true\" [rows]=\"'1'\"\n                                             [columns]=\"'2'\" [allow-blank]=\"false\"\n                                             [enable-popover]=\"true\"></amexio-textarea-input>\n                    </amexio-column>\n                    <amexio-column [size]=\"6\">\n                      <amexio-password-input [enable-popover]=\"true\" [(ngModel)]=\"commitAllDataClass.repositoryPassword\"\n                                             [field-label]=\"'Password '\" name=\"Password\"\n                                             [place-holder]=\"'Enter GitHub Password'\" [allow-blank]=\"false\"\n                                             [error-msg]=\"'Please enter Password'\"\n                                             [icon-feedback]=\"true\"></amexio-password-input>\n                    </amexio-column>\n                  </amexio-row>\n                </amexio-body>\n                <amexio-action>\n                  <amexio-button (onClick)=\"closeCommitAllWindow()\" label=\"Cancel\" type=\"white\"\n                                 [icon]=\"'fa fa-remove'\"></amexio-button>\n                  <amexio-button (onClick)=\"validateAndCommit()\" label=\"Commit Changes\" type=\"green\"\n                                 [icon]=\"'fa fa fa-arrow-circle-up'\"></amexio-button>\n                </amexio-action>\n              </amexio-window>\n\n              <amexio-window [show-window]=\"showPullWindow\" (close)=\"closePullWindow()\" type=\"window\"\n                             [closable]=\"true\" [footer]=\"true\">\n                <amexio-header> Pull changes</amexio-header>\n                <amexio-body>\n                  \n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <amexio-textarea-input [field-label]=\"'User name or email address'\" name=\"pullDataClass.repositoryUsername\"\n                                             [(ngModel)]=\"pullDataClass.repositoryUsername\"\n                                             [place-holder]=\"'Enter GitHub user name or email address'\"\n                                             [error-msg]=\"'Please enter user name'\" [icon-feedback]=\"true\" [rows]=\"'1'\"\n                                             [columns]=\"'2'\" [allow-blank]=\"false\"\n                                             [enable-popover]=\"true\"></amexio-textarea-input>\n                    </amexio-column>\n                    <amexio-column [size]=\"6\">\n                      <amexio-password-input [enable-popover]=\"true\" [(ngModel)]=\"pullDataClass.repositoryPassword\"\n                                             [field-label]=\"'Password '\" name=\"pullDataClass.repositoryPassword\"\n                                             [place-holder]=\"'Enter GitHub Password'\" [allow-blank]=\"false\"\n                                             [error-msg]=\"'Please enter Password'\"\n                                             [icon-feedback]=\"true\"></amexio-password-input>\n                    </amexio-column>\n                  </amexio-row>\n                </amexio-body>\n                <amexio-action>\n                  <amexio-button (onClick)=\"closePullWindow()\" label=\"Cancel\" type=\"white\"\n                                 [icon]=\"'fa fa-remove'\"></amexio-button>\n                  <amexio-button (onClick)=\"validateAndPull()\" label=\"Pull\" type=\"green\"\n                                 [icon]=\"'fa fa fa-arrow-circle-down'\"></amexio-button>\n                </amexio-action>\n              </amexio-window>\n               <codepipeline-notification></codepipeline-notification>\n\n <amexio-dialogue [show-dialogue]=\"warningdialogue\" [closable]=\"false\" [title]=\"'Info'\" [custom]=\"true\" (close)=\"warningdialogue = !warningdialogue\"\n                   [type]=\"'alert'\">\n    <amexio-body>\n      Please Initailise repository before Push/Pull.\n    </amexio-body>\n    <amexio-action>\n      <amexio-button type=\"primary\" (onClick)=\"okWarningBtnClick()\" [label]=\"'Ok'\">\n      </amexio-button>\n    </amexio-action>\n  </amexio-dialogue>\n\n            ",
        styles: [
            "\n      .panel-panel{\n        height:488px!important;\n      }\n    "
        ]
    })
], SourceCodeComponent);
exports.SourceCodeComponent = SourceCodeComponent;
var GitModel = (function () {
    function GitModel() {
        this.repositoryUrl = '';
        this.repositoryType = '1';
        this.isInitialize = false;
    }
    return GitModel;
}());
exports.GitModel = GitModel;
var InitializeDataModel = (function () {
    function InitializeDataModel() {
        this.repositoryUrl = '';
        this.repositoryType = '';
        this.repositoryPassword = '';
        this.repositoryUsername = '';
        this.isInitialize = true;
    }
    return InitializeDataModel;
}());
exports.InitializeDataModel = InitializeDataModel;
var CommitAllDataClass = (function () {
    function CommitAllDataClass() {
        this.commitMessage = '';
        this.repositoryPassword = '';
        this.repositoryUsername = '';
    }
    return CommitAllDataClass;
}());
exports.CommitAllDataClass = CommitAllDataClass;
var PullDataClass = (function () {
    function PullDataClass() {
        this.repositoryPassword = '';
        this.repositoryUsername = '';
    }
    return PullDataClass;
}());
exports.PullDataClass = PullDataClass;
