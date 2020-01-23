import { NgModule } from '@angular/core';

import { LoginModule } from 'app/main/pages/authentication/login/login.module';
import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';
import { RegisterModule } from 'app/main/pages/authentication/register/register.module';
import { Register2Module } from 'app/main/pages/authentication/register-2/register-2.module';
import { ForgotPasswordModule } from 'app/main/pages/authentication/forgot-password/forgot-password.module';
import { ResetPasswordModule } from 'app/main/pages/authentication/reset-password/reset-password.module';
import { ResetPassword2Module } from 'app/main/pages/authentication/reset-password-2/reset-password-2.module';
import { MailConfirmModule } from 'app/main/pages/authentication/mail-confirm/mail-confirm.module';
import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { InvoiceModernModule } from 'app/main/pages/invoices/modern/modern.module';
import { InvoiceCompactModule } from 'app/main/pages/invoices/compact/compact.module';
import { ProfileModule } from 'app/main/pages/profile/profile.module';


@NgModule({
    imports: [
        // Authentication
        LoginModule,
        Login2Module,
        RegisterModule,
        Register2Module,
        ForgotPasswordModule,
        ResetPasswordModule,
        ResetPassword2Module,
        MailConfirmModule,


        // Errors
        Error404Module,
        Error500Module,

        // Invoices
        InvoiceModernModule,
        InvoiceCompactModule,


        // Profile
        ProfileModule,

        // Search
    ]
})
export class PagesModule {

}
