import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TasksService } from '../shared';

@Component({
	selector: 'app-task-form',
	templateUrl: './taskForm.component.html',
	styleUrls: ['./taskForm.component.scss']
})
export class TaskFormComponent implements OnInit {
	
    formType: string = "";
    private sub: Subscription;
    taskForm: FormGroup;
    title: string = "";
    id: string = "";
    path: string = "";

    constructor(
            private _fb: FormBuilder, 
            private _route: ActivatedRoute,
            private _tasksService: TasksService,
            private _router: Router
            ) {

        this.taskForm = this._fb.group({
            "name": [null, Validators.compose([Validators.required, Validators.minLength(5)])],
            "description": [null, Validators.compose([Validators.required, Validators.minLength(10)])],
            "estimate": [null, Validators.compose([Validators.required, Validators.pattern(/[0-9]/)])],
            "state": [null, Validators.required]
        })

    }

	ngOnInit() {
        this.sub = this._route.url.subscribe(data => {
            // Get the last piece of the URL (it's either 'login' or 'register')
            this.formType = data[data.length - 1].path;
            // Set a title for the page accordingly
            this.title = (this.formType === 'addTask') ? 'Add Task' : 'Update Task';

            //store task id and path from url
            if(this.formType !== "addTask"){
                this.id = data[2].path;
                this.path = data[1].path;
                
                // Call get task method to retrive task data
                this.getTask(this.path, this.id);
            }
        });
	}

    ngOnDestroy() {
        // When component is removed from view will reset the id and paths
        this.id = "";
        this.path = "";
        this.formType = "";

        // This will unsubscribe from observables when component is not in view
        this.sub.unsubscribe();
    }

    submitForm(){
        if(this.formType === "addTask"){
            this.createTask(this.taskForm.value);
        }else{
            this.updateThisTask(this.taskForm.value);
        }
    }

    createTask(data){
        // On click will make a call to add Task method of Task services
        this._tasksService.addTasks(data).subscribe(res => {

            // once done will revert the user to base href
            this._router.navigateByUrl("/")
        })
    }

    getTask(path, id) {
        // Call the get task method from task service api
        this._tasksService.getTask(path, id)
            .subscribe(res => {
                // will populate the form value with the task values
                this.taskForm.setValue({
                    name: res.name,
                    description: res.description,
                    estimate: res.estimate,
                    state: res.state
                })
            })
    }

    onBack(): void {
        // on click will change the router path to base href
        this._router.navigate(["/"]);
    }

    updateThisTask(data) {

        if (this.path !== data.state) {
            let path = `/${this.path}`
            // If the state is updated will remove the task from previous task list 
            this._tasksService.deleteTaskById(path, this.id)
                .subscribe(res => {
                    console.log(res);
                })

            // This will add the task to new task list
            this._tasksService.addTasks(data).subscribe(res => {
                this._router.navigate(["/"]);
            })

        } else {

            // Will update the changes made to current task
            this._tasksService.updateTaskById(this.path, this.id, data)
                .subscribe(res => {
                    this._router.navigate(["/"]);
                })
        }
    }
}
