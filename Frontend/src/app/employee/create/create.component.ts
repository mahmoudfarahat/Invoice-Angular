import { EmployeeService } from './../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private ActivatedRoute:ActivatedRoute, public EmployeeService:EmployeeService) { }

  ngOnInit(): void {
  
    this.ActivatedRoute.params.subscribe(a=>{
      if(a["id"]){
        this.EmployeeService.getSelectedEmployee(a["id"]);
      }
      else{
        this.EmployeeService.selectedEmployee = null;
        this.EmployeeService.form.patchValue({Id:"", Name:""});
      }
    });
  }

}
