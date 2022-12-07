
import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { InvoiceService } from 'src/app/services/invoice.service';
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

    this.editMode = true
  }



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
