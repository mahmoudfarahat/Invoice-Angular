import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 public  selectedEmployee:any = null;
 public listOfEmployee:any[] = [];

 public form:FormGroup = new FormGroup({
    Id:new FormControl(''),
    Name:new FormControl('',[Validators.required])
 });

  constructor(private http:HttpClient) { }

  getEmployees(){
    this.http.get<any[]>(`${environment.apiUrl}/Employees`).pipe(map(a=>
      this.listOfEmployee =a)).subscribe();
  }
  getSelectedEmployee(id:any){
      this.http.get<any>(`${environment.apiUrl}/Employees/${id}`).pipe(map(a=>{
        this.selectedEmployee =a;
        this.form.patchValue(a);
      })).subscribe();
  }





}
