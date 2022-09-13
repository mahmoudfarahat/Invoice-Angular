import { InvoiceService } from './../../services/invoice.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { setTheme } from 'ngx-bootstrap/utils';
import { invoiceNumberValidator } from 'src/app/async.valdiator';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'
import * as pdfMake from "pdfMake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {
x:any ;
  employees:any = []
  customers:any = []
  productList:any = []
  value: any ='';
   productForm = new FormGroup({
    InovoiceNumber:new FormControl('', [Validators.required]),
    Date:new FormControl('', [Validators.required ]),
    CustomerName:new FormControl('', [Validators.required ]),
    EmployeeName:new FormControl('', [Validators.required ]),
    Products:new FormArray([

    ])
  })


 public get InvoiceNumber() {
     return this.productForm.get("InovoiceNumber");
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getcustomers();
    this.getProducts();


    this.productForm.get("InovoiceNumber")?.addAsyncValidators(invoiceNumberValidator())



  }



 


  constructor(public datepipe: DatePipe,private fb:FormBuilder , private service :InvoiceService, private router:Router) {}


 get   products() : FormArray {

    return this.productForm.get("Products") as FormArray
  }







  addProduct() {


  (this.productForm.get("Products") as FormArray).push(new FormGroup({
    ProductName:new FormControl('', [Validators.required ]),
    Price:new FormControl('', [Validators.required ]),
    Quantity:new FormControl(1, [Validators.required ]),
    Total:new FormControl(0, [Validators.required ]),

  }));


  }

  removeProduct(i:number) {
    this.products.removeAt(i);
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

onPriceChange(event:any,ab :AbstractControl)
{
   const price =this.productList.find((a:any) => a.Id === +event.target.value ).Price;
  (ab as FormGroup).get("Price")?.setValue(price);
}


getRowTotal(ab :AbstractControl , quantity:any , price:any)
{
  let calculatedRow = quantity * price;
   (ab as FormGroup).get("Total")?.setValue(calculatedRow)

}


onSubmit()
{
  this.service.createInvocie(this.productForm.value).subscribe(res => {
   this.router.navigate(["/"]);
  })
}


generatePDF() {

    let InvoiceNum:any =this.productForm.get("InovoiceNumber")?.value
    let customer:any =this.productForm.get("CustomerName")?.value
    let employee:any =this.productForm.get("EmployeeName")?.value
    let getdate:any =this.productForm.get("Date")?.value
    let date = this.datepipe.transform(getdate, 'yyyy-MM-dd')


  var docDefinition = {
    content: [
      { text:  `Invoice Number: ${InvoiceNum}` , fontSize: 15 },
      { text:  `Customer Name: ${customer}` , fontSize: 15 },
      { text:  `Employee Name: ${employee}` , fontSize: 15 },
      { text:  `Date: ${date}` , fontSize: 15 },
      {
          
        layout: 'lightHorizontalLines', // optional
        
        table: {

          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '*', 'auto', 100, '*' ],

          body: [
            [ 'Products', 'Price', 'Quantity', 'Total' ],
            [ InvoiceNum, 'Value 2', 'Value 3', 'Value 4' ],
            [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
          ]
        }
      }
    ]
  };

  pdfMake.createPdf(docDefinition).open();
}



}
