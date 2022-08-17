using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace invoice.Models
{
    public class Invoice
    {
        public Invoice()
        {
            this.InvoiceDetails = new HashSet<InvoiceDetails>();
        }

        public int ID { get; set; }

        public int InvoiceNumber { get; set; }

        public DateTime Date { get; set; }
        public int EmployeId { get; set; }

        public Employe Employe { get; set; }

        public int CustomerId { get; set; }

        public Customer Customer { get; set; }

        public decimal  Total { get; set; }

        public ICollection<InvoiceDetails> InvoiceDetails { get; set; }

    }

    public class InvoiceDetails
    {
        public int ID { get; set; }

        [ForeignKey(nameof(Invoice))]
        public int InvoiceID { get; set; }
  
        public Invoice Invoice { get; set; }

        [ForeignKey(nameof(Product))]
        public int ProductID { get; set; }

        public Product Product { get; set; }


        public decimal Quantity { get; set; }

        public decimal Price { get; set; }


        public decimal Total { get => Quantity * Price; }



    }
}