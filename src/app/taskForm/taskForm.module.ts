import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TaskFormComponent } from './taskForm.component';

const formRouting: ModuleWithProviders = RouterModule.forChild([
	{ path: "updateTask/:path/:id", component: TaskFormComponent },
	{ path: "addTask", component: TaskFormComponent },
])

@NgModule({
	imports: [
		CommonModule,
        formRouting,
        ReactiveFormsModule
	],
	declarations: [TaskFormComponent]
})
export class TaskFormModule { }
