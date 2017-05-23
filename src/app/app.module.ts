import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { 
		AppComponent, 
        AboutComponent, 
		AppRoutesModule,
        HomeComponent, 
        TaskComponent, 
		TaskFormModule,
        TasksService 
    } from './index';

@NgModule({
	declarations: [
        AboutComponent,
		AppComponent,
		HomeComponent,
		TaskComponent,
	],
	imports: [
		AppRoutesModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule,
		TaskFormModule
	],
	providers: [TasksService],
	bootstrap: [AppComponent]
})
export class AppModule { }
