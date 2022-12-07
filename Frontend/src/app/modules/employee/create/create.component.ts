
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private ActivatedRoute:ActivatedRoute, public employeeService:EmployeeService) { }

  ngOnInit(): void {

    this.ActivatedRoute.params.subscribe(a=>{
      if(a["id"]){
        this.employeeService.getSelectedEmployee(a["id"]);
      }
      else{
        this.employeeService.selectedEmployee = null;
        this.employeeService.form.patchValue({Id:"", Name:""});
      }
    });
  }

}
