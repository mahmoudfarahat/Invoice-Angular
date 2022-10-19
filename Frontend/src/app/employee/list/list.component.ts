import { EmployeeService } from './../../services/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public EmployeeService:EmployeeService) { }

  ngOnInit(): void {
    this.EmployeeService.getEmployees()
  }

}
