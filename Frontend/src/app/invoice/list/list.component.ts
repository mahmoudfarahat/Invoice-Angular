import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  ana ={
    hello:"hello"
  }
  editMode = false

  change()
  {
    console.log("Fsaff")
    this.editMode = true
  }



//   count = 0;
//   loadingIndicator = true;
//   page = {
//     limit: 10,
//     count: 0,
//     offset: 0,
//     orderBy: 'myColumn1',
//     orderDir: 'desc',
//     pageSize: 10
//    };
//   ngOnInit(): void {
//     this.invoice.getInvocie().subscribe(a=>{
//       this.count = a.recordsFiltered;
//       this.loadingIndicator = false;
//       this.rows = a;
//     });
//   }
// rows:any[] = [];


//   columns = [
//     { prop: 'ID'},
//     { name: 'Invoice Number' , prop:"InvoiceNumber"} ,
//     { name: 'Date' , prop:"Date"},
//     { name: 'Total', prop:"Total" }
//   ];

//   ColumnMode = ColumnMode;

rows:any[] = [];
count = 0;
loadingIndicator = true;
page = {
limit: 10,
count: 0,
offset: 0,
orderBy: 'myColumn1',
orderDir: 'desc',
pageSize: 10
};
columnMode:ColumnMode = ColumnMode.force;
  constructor(private invoice:InvoiceService) {

  }
  ngOnInit(): void {
   this.invoice.getInvocietop10().subscribe(a=>{
    this.count = a.recordsFiltered;
    this.loadingIndicator = false;
    this.rows = [];
    for (const iterator of a.data) {
       this.rows.push(iterator);
    }
   })
  }

  ClickPage(d:any){
  //  this.(environment.BaseURL+`/api/Customers?start=${(d.offset * d.limit)}&length=${d.limit}`).subscribe(a=>{
  //     this.count = a.recordsFiltered;
  //     this.loadingIndicator = false;
  //     this.rows = [];
  //     for (const iterator of a.data) {
  //        this.rows.push(iterator);
  //     }
  //  });
  console.log(d);
  this.invoice.getInvocie(d.offset,d.limit).subscribe(a=>{
    this.count = a.recordsFiltered;
    this.loadingIndicator = false;
    this.rows = [];
    for (const iterator of a.data) {
       this.rows.push(iterator);
    }
  });
  }
  // ClickPage(d:any){
  //   this.invoice.getInvocie(environment.BaseURL+`/api/Customers?start=${(d.offset * d.limit)}&length=${d.limit}`).subscribe(a=>{
  //     this.count = a.recordsFiltered;
  //     this.loadingIndicator = false;
  //     this.rows = [];
  //     for (const iterator of a.data) {
  //        this.rows.push(iterator);
  //     }
  //  });
  // }

  deleteInvoice(id:any){
this.invoice.deleteInvoice(id).subscribe(res=> {
  console.log(res)
  this.invoice.getInvocie(this.page.offset,this.page.limit).subscribe(a=>{
    this.count = a.recordsFiltered;
    this.loadingIndicator = false;
    this.rows = [];
    for (const iterator of a.data) {
       this.rows.push(iterator);
    }
  });

});
  }

}
