import { Invoice } from './../models/inovice';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private  http:HttpClient , ) { }



  getEmployess(){
    return this.http.get(environment.apiUrl + "Employees")
  }

  getCustomers()
  {
    return this.http.get<Product>(environment.apiUrl + "Customers")
  }

  getProducts()
  {
    return this.http.get(environment.apiUrl + "Products")
  }

  getProduct(id :any)
  {
    return this.http.get(environment.apiUrl + "Products/" + id)
  }



  createInvocie(inovice :any)
  {
    return this.http.post(environment.apiUrl + "Inovices/Create" , inovice )
  }
  getInvocie(offset:number, limit:number)
  {
    return this.http.get<any>(environment.apiUrl + `Inovices?start=${(offset * limit)}&length=${limit}`);
  }
  getInvocietop10()
  {
    return this.http.get<any>(environment.apiUrl + `Inovices`);
  }

  getOneInvocie(id:any)
  {
    return this.http.get<Invoice>(environment.apiUrl + `Inovices/${id}`);
  }
deleteInvoice(id:any)
{
  return this.http.delete<Invoice>(environment.apiUrl + `Inovices/${id}`);

}

}
