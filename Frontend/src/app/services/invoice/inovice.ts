export interface Product {
  ProductName: string;
  Price: string;
  Quantity: string;
  Total: string;
}

export interface Invoice {

  InvoiceNumber: string;
  Date: string;
  EmployeId:string;
  CustomerId:string
  CustomerName: string;
  EmployeeName: string;
  Products: Product[];
}
