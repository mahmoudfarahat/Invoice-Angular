// import { invoice } from './../../models/inovice';
import { invoiceNumberValidator } from 'src/app/async.valdiator';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Invoice } from 'src/app/models/inovice';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  employees:any= []
  customers:any= []
  productList:any= []
  productForm: FormGroup = new FormGroup({
    InvoiceNumber:new FormControl('', [Validators.required]),
  Date:new FormControl('', [Validators.required ]),
  CustomerName:new FormControl('', [Validators.required ]),
  EmployeeName:new FormControl('', [Validators.required ]),
  Products:new FormArray([  ])
});
  invoice:Invoice  | any = {}
  constructor(private service:InvoiceService , private router:Router
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
    return this.productForm.get("InovoiceNumber");
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
}
