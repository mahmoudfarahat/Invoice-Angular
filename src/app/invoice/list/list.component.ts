import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {



  ngOnInit(): void {
    this.invoice.getInvocie().subscribe(a=>{
      this.rows = a;
    });
  }
rows:any[] = [];
  loadingIndicator = true;
  reorderable = true;

  columns = [
    { prop: 'ID'},
    { name: 'Invoice Number' , prop:"InvoiceNumber"} ,
    { name: 'Date' , prop:"Date"},
    { name: 'Total', prop:"Total" }
  ];

  ColumnMode = ColumnMode;

  constructor(private invoice:InvoiceService) {

  }



}
