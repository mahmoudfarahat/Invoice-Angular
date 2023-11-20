
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private ActivatedRoute:ActivatedRoute,
     public employeeService:EmployeeService,
     private router:Router) { }




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


  createEmployee(){
    this.employeeService.form.markAllAsTouched();
    if(this.employeeService.form.valid){
      this.employeeService.create(this.employeeService.form.value).subscribe(()=>{

        this.router.navigate(['/employee'])
        })
    }

  }

}
