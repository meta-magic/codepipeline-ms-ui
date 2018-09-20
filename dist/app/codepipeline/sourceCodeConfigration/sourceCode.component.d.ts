import { ChangeDetectorRef, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { CookieService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
export declare class SourceCodeComponent implements OnInit {
    http: HttpClient;
    private cookie;
    loaderService: LoaderService;
    _notificationService: NotificationService;
    cdf: ChangeDetectorRef;
    private componentFactoryResolver;
    gitModel: GitModel;
    initailiseDataModel: InitializeDataModel;
    commitAllDataClass: CommitAllDataClass;
    pullDataClass: PullDataClass;
    checkWithDisable: boolean;
    gitdisabledFlag: boolean;
    gitActiveTab: boolean;
    actionActiveTab: boolean;
    respositoryTypeData: any;
    tabdisabledFlag: boolean;
    showCommitAllWindow: boolean;
    showInitializeWindow: boolean;
    showPullWindow: boolean;
    SaveasyncFlag: boolean;
    warningdialogue: boolean;
    validationMsgArray: any;
    URLDisabled: boolean;
    initailizeDisable: boolean;
    msgData: any;
    constructor(http: HttpClient, cookie: CookieService, loaderService: LoaderService, _notificationService: NotificationService, cdf: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    createInvalidCompErrorData(): void;
    syncMappedRepositoryURL(): void;
    onBlurCheck(rUrl: any): void;
    createErrorData(): void;
    setSelectedRepository(data: any): void;
    setInitailizeRepository(data: any): void;
    onSave(): void;
    resetData(): void;
    onCommit(): void;
    closeCommitAllWindow(): void;
    onCommitAllChangesClick(): void;
    closeInitializeWindow(): void;
    validateAndInitialize(): void;
    validateAndCommit(): void;
    validateAndPull(): void;
    onInitializeChangesClick(): void;
    onInitialize(): void;
    onPull(): void;
    okWarningBtnClick(): void;
    closePullWindow(): void;
    onPullChangesClick(): void;
}
export declare class GitModel {
    repositoryType: string;
    repositoryUrl: string;
    isInitialize: false;
    constructor();
}
export declare class InitializeDataModel {
    repositoryType: string;
    repositoryUrl: string;
    repositoryUsername: string;
    repositoryPassword: string;
    isInitialize: boolean;
    constructor();
}
export declare class CommitAllDataClass {
    commitMessage: string;
    repositoryUsername: string;
    repositoryPassword: string;
    constructor();
}
export declare class PullDataClass {
    repositoryUsername: string;
    repositoryPassword: string;
    constructor();
}
