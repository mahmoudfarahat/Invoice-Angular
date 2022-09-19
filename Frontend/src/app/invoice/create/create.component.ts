import { InvoiceService } from './../../services/invoice.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { setTheme } from 'ngx-bootstrap/utils';
import { invoiceNumberValidator } from 'src/app/async.valdiator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  productForm!: FormGroup;
  employees:any = []
  customers:any = []
  productList:any = []
  value: any ='';


 public get InvoiceNumber() {
    // console.log(this.productForm.get("inovoiceNumber"));
    return this.productForm.get("InovoiceNumber");
  }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      InovoiceNumber:new FormControl('', [Validators.required]),
      Date:new FormControl('', [Validators.required ]),
      CustomerName:new FormControl('', [Validators.required ]),
      EmployeeName:new FormControl('', [Validators.required ]),
      Products:new FormArray([  ])
    })

    this.productForm.get("InovoiceNumber")?.addAsyncValidators(invoiceNumberValidator())

  }





  constructor(private fb:FormBuilder , private service :InvoiceService, private router:Router) {
    this.getEmployees();
    this.getcustomers();
    this.getProducts();

    // this.productForm = this.fb.group({

    //   InovoiceNumber:['', Validators.required ],
    //   Date:[''],
    //   CustomerName:['',Validators.required],
    //   EmployeeName:['',Validators.required],
    //   Products: this.fb.array([]) ,

    // });

    // this.productForm.get("InovoiceNumber")?.addAsyncValidators(invoiceNumberValidator())



  }


 get   products() : FormArray {
    return this.productForm.get("Products") as FormArray
  }

  // newProduct(): FormGroup {
  //   return this.fb.group({
  //     ProductName: '',
  //    Price: '',
  //     Quantity: '',
  //     Total: '',


  //   })
  // }



  // ( this.form.get("list") as FormArray).push(new FormControl("",[Validators.required]));


  addProduct() {
    // this.products.push(this.newProduct());

  (this.productForm.get("Products") as FormArray).push(new FormGroup({
    ProductName:new FormControl('', [Validators.required ]),
    Price:new FormControl('', [Validators.required ]),
    Quantity:new FormControl('', [Validators.required ]),
    Total:new FormControl('', [Validators.required ]),

  }));


  }

  removeProduct(i:number) {
    this.products.removeAt(i);

    console.log(this.productForm.get("Products")?.value.length)
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

onPriceChange(event:any,ab :AbstractControl)
{
  console.log(ab);
   const price =this.productList.find((a:any) => a.Id === +event.target.value ).Price;
  (ab as FormGroup).get("Price")?.setValue(price);


// id.setValue(event.target.value)


}

getrowTotal(g: FormArray)
{
  console.log(g)
}

}
