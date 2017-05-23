import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/map"
import "rxjs/add/operator/filter"

@Injectable()
export class TasksService {

	Url = "http://localhost:3000"
	db_path = "/db"

	constructor(private _http: Http) { }

	// Get the list of tasks from the server
	getTasks(): Observable<any> {
		return this._http.get(`${this.Url}${this.db_path}`)
			.map(res => res.json())
	}

	// Get a single task by id
	getTask(path, id): Observable<any> {
		return this._http.get(`${this.Url}/${path}/${id}`)
			.map(res => res.json())
	}

	// Add the new task to server
	addTasks(body): Observable<any> {
		let path = body.state;
		return this._http.post(`${this.Url}/${path}`, body)
			.map(res => res.json())
	}

	// Delete the task by id from server
	deleteTaskById(path: string, id): Observable<any> {
		return this._http.delete(`${this.Url}${path}/${id}`)
			.map(res => res.json())
	}

	// Update the task to the server
	updateTaskById(path: string, id, data): Observable<any> {
		console.log(`${this.Url}/${path}/${id}`);
		return this._http.put(`${this.Url}/${path}/${id}`, data)
	}
}
