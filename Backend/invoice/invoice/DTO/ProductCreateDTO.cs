using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace invoice.DTO
{

    public partial class ProductCreateDTO
    {
  

        public int InovoiceNumber { get; set; }

      
        public DateTime Date { get; set; }


        public int CustomerName { get; set; }

    
    
        public int EmployeeName { get; set; }

    
        public List<Product> Products { get; set; }
    }

    public partial class Product
    {

        public int ProductName { get; set; }


    
        public decimal Price { get; set; }

    

        public decimal Quantity { get; set; }

        public decimal Total { get; set; }

 
        
    }
}