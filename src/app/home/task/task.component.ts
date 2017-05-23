import { Component, OnInit, Input, DoCheck, EventEmitter, Output } from '@angular/core';

import { TasksService } from '../../shared';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, DoCheck {
	
    @Input() title: string;
    totalEstimate: number = null;

    @Input() tasks = [];
    @Output() notifyDelete: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _tasksService: TasksService) { }

	ngOnInit() {
	}

    // will call total time function after component initialization
    ngDoCheck() {
        this.totalTime();
        this.tasks;
    }

    // Calculate the total estimate time
    totalTime() {

        // Set the initial value to 0
        this.totalEstimate = 0;

        // If planned Tasks is not empty will calculate the total estimate time
        if (this.tasks) {

            // Will loop through all the task and add the estimate to total
            this.tasks.forEach(data => {
                this.totalEstimate += parseFloat(data.estimate)
            })
        }

    }

    // Will delete the task and trigger an on change event
    deleteTask(data) {

        let id = data.id;
        let path = `/${data.state}`

        // display a confirmation message
        let conf = confirm("Are you sure you want to delete this task.");

        //if conf is true then delete the task else do nothing
        if(conf){
            // Call the delete ask method from task services
            this._tasksService.deleteTaskById(path, id).subscribe(res => {
                // trigger on change event
                this.notifyDelete.emit();
            })
        }
    }

}
