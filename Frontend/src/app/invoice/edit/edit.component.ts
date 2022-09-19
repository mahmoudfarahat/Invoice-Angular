// import { invoice } from './../../models/inovice';
import { invoiceNumberValidator } from 'src/app/async.valdiator';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from './../../services/invoice.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators ,AbstractControl } from '@angular/forms';
import { Invoice } from 'src/app/models/inovice';
import * as pdfMake from "pdfMake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common'

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent implements OnInit {
  docDefinition:any ;
  employees:any= []
  customers:any= []
  productList:any= []
  productForm: FormGroup = new FormGroup({
    InvoiceNumber:new FormControl('', [Validators.required]),
  Date:new FormControl('', [Validators.required ]),
  CustomerName:new FormControl('', [Validators.required ]),
  EmployeeName:new FormControl('', [Validators.required ]),
  Products:new FormArray([],[Validators.required])
});
  invoice:Invoice  | any = {}
  constructor(public datepipe: DatePipe, private service:InvoiceService , private router:Router
    ,private route:ActivatedRoute) {

 }

  ngOnInit( ): void {
    this.getEmployees();
    this.getcustomers();
    this.getProducts();




    this.route.params.subscribe(
      params => {
          const id = +params['id'];
          this.getOneInvocie(id);
      }

  );


  this.productForm.get("InovoiceNumber")?.addAsyncValidators(invoiceNumberValidator())

  }

  get   products() : FormArray {
    return this.productForm.get("Products") as FormArray
  }
  public get InvoiceNumber() {
    // console.log(this.productForm.get("inovoiceNumber"));
    return this.productForm.get("InvoiceNumber");
  }



  addProduct() {
    // this.products.push(this.newProduct());

  (this.productForm.get("Products") as FormArray).push(new FormGroup({
    ProductName:new FormControl('', [Validators.required ]),
    Price:new FormControl('', [Validators.required ]),
    Quantity:new FormControl('', [Validators.required ]),
    Total:new FormControl('', [Validators.required ]),

  }))};
  removeProduct(i:number) {
    this.products.removeAt(i);
  }

  onSubmit()
  {
    this.service.createInvocie(this.productForm.value).subscribe(res => {
     this.router.navigate(["/"]);
    })
  }

  getEmployees()
  {
this.service.getEmployess().subscribe(response =>{
  console.log(response)
  this.employees = response
})
  }
getcustomers()
{this.service.getCustomers().subscribe(response =>{
  console.log(response)
  this.customers = response
})}
getProducts()
{
  this.service.getProducts().subscribe(response =>{
    console.log(response)
    this.productList = response
  })
}

getOneInvocie(id:any)
{
  this.service.getOneInvocie(id).subscribe(res=> {
    // console.log(res)
    this.invoice = res;
    this.productForm = new FormGroup({
      InvoiceNumber:new FormControl(this.invoice.InvoiceNumber, [Validators.required]),
    Date:new FormControl(this.invoice.Date, [Validators.required ]),
    CustomerName:new FormControl(this.invoice.CustomerId, [Validators.required ]),
    EmployeeName:new FormControl(this.invoice.EmployeId, [Validators.required ]),
    Products:new FormArray([  ])
  })

  this.productForm.get("InovoiceNumber")?.addAsyncValidators(invoiceNumberValidator())

   for (const iterator of this.invoice.Products) {
    console.log(iterator);
    ( this.productForm.get("Products") as  FormArray).push(new FormGroup({
      ProductName:new FormControl(iterator.ProductID,[Validators.required]),
      Price:new FormControl(iterator.Price , [Validators.required]),
      Quantity:new FormControl(0),
      Total:new FormControl(0)

    }))
   }


  })
}
onPriceChange(event:any,id :any)
{
console.log(event)
const price =this.productList.find((a:any) => a.Id === +event.target.value ).Price
id.value = price


}

 
getRowTotal(ab :AbstractControl , quantity:any , price:any)
{
  let calculatedRow = quantity * price;
   (ab as FormGroup).get("Total")?.setValue(calculatedRow)

}

generatePDF() {

  let InvoiceNum:any =this.productForm.get("InvoiceNumber")?.value
  let customer:any =this.productForm.get("CustomerName")?.value
  let employee:any =this.productForm.get("EmployeeName")?.value
  let getdate:any =this.productForm.get("Date")?.value
  let date = this.datepipe.transform(getdate, 'yyyy-MM-dd')


this.docDefinition = {
  content: [
    { text:  `Invoice Number: ${InvoiceNum}` , fontSize: 15 },
    { text:  ` ` , fontSize: 15 },
    { text:  `Customer Name: ${this.customers.find((d:any)=> d.Id == customer).Name}` , fontSize: 15 },
    { text:  ` ` , fontSize: 15 },
    { text:  `Employee Name: ${this.employees.find((d:any)=> d.Id == employee).Name}` , fontSize: 15 },
    { text:  ` ` , fontSize: 15 },
    { text:  `Date: ${date}` , fontSize: 15 },
    { text:  ` ` , fontSize: 15 },
    {

      layout: 'lightHorizontalLines', // optional

      table: {

        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ '*', '*', '*', '*' ],

        body: [
          [ 'Product', 'Price', 'Quantity', 'Total' ],

          ...(this.products.value as any[]).map(a=> [this.productList.find((d:any)=> d.Id == a.ProductName).Name , a.Price, a.Quantity, a.Total])

        ]
      }
    }
  ]
};





}

openPdf()
{
  this.generatePDF()
  pdfMake.createPdf(this.docDefinition).open();

}
printPdf()
{
  this.generatePDF()

  pdfMake.createPdf(this.docDefinition).print();
}



}
