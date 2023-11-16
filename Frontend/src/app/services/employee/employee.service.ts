import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 public  selectedEmployee:any = null;
 public listOfEmployee:any[] = [];

 public form:FormGroup = new FormGroup({
  id:new FormControl('',),
  name:new FormControl('',[Validators.required]),
  code: new FormControl('',[Validators.required]),
  phone: new FormControl('',[Validators.required]),
  birthdate :new FormControl('',[Validators.required]),

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


create(form:Employee){
  return this.http.post(`${environment.apiUrl}/Employees/Create`,form)
}





}
