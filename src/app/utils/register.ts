import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class RegisterUtils {
    private language: string;

    constructor(private translate: TranslateService) {
        this.translate = translate;
    }

    getRegisterPayload(formData) {
        this.language = this.translate.getBrowserLang();
        return {
            "emailId": formData.emailId,
            "password": formData.password,
            "firstName": formData.firstName,
            "lastName": formData.lastName,
            "locale": this.language
        };
    }
}