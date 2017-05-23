import { Component, OnInit } from '@angular/core';

import { TasksService } from '../shared';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    titles = ["Planned Task", "Inprogress Task", "Completed Task"];
    tasksList: any[] = [];

    constructor(private _tasksService: TasksService) { }

	ngOnInit() {
        this.getTasks();
	}

    // Get the list of all the tasks
    getTasks() {

        // call gettasks function of taskservices and store them in taskslist
        this._tasksService.getTasks()
            .subscribe(res => {
                this.tasksList = res;
            })
    }

    onDelete() {
        // Will get the updates task from server when on change event occoured
        this.getTasks();
    }

}
