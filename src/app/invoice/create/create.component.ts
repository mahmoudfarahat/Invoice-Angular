import { InvoiceService } from './../../services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { setTheme } from 'ngx-bootstrap/utils';
import { invoiceNumberValidator } from 'src/app/async.valdiator';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

 public get invoiceNumber() {
    // console.log(this.productForm.get("inovoiceNumber"));
    return this.productForm.get("inovoiceNumber");
  }
  ngOnInit(): void {
  }

  employees:any = []
  customers:any = []
  productList:any = []


  value: any ='';



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
getProduct(id:any){
    this.service.getProduct(id).subscribe(response =>{
      console.log(response)
this.value = response


    })
}
onPriceChange(event:any,id :any)
{
console.log(event)
const price =this.productList.find((a:any) => a.Id === +event.target.value ).Price
id.value = price


}
  productForm: FormGroup;

  constructor(private fb:FormBuilder , private service :InvoiceService) {
    this.getEmployees();
    this.getcustomers();
    this.getProducts();

    this.productForm = this.fb.group({
      inovoiceNumber:['', Validators.required ],
      products: this.fb.array([]) ,

    });

    this.productForm.get("inovoiceNumber")?.addAsyncValidators(invoiceNumberValidator())



  }

  products() : FormArray {
    return this.productForm.get("products") as FormArray
  }

  newProduct(): FormGroup {
    return this.fb.group({
      product:'',
     price: '',
      quantity: '',
      total: '',
      ProductName: ''

    })
  }



  // ( this.form.get("list") as FormArray).push(new FormControl("",[Validators.required]));


  addProduct() {
    this.products().push(this.newProduct());
  }

  removeProduct(i:number) {
    this.products().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value.products);

 let Group = this.productForm.value.products




}
}
