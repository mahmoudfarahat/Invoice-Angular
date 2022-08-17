using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace invoice.Models
{
    public class Product
    {
        public Product()
        {
            this.InvoiceDetails = new HashSet<InvoiceDetails>();
        }
        public int Id { get; set; }
        public string Name { get; set; }

        public decimal Price { get; set; }

        public ICollection<InvoiceDetails> InvoiceDetails { get; set; }
    }
}