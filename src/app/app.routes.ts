import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { TaskFormComponent } from './taskForm';
import { AboutComponent } from './about';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: HomeComponent },
            { path: "about", component: AboutComponent }
        ])
    ],
    exports: []
})

export class AppRoutesModule { }