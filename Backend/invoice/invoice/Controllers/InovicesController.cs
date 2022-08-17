using invoice.DTO;
using invoice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;

namespace invoice.Controllers
{
    public class InovicesController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [HttpGet]
        public IHttpActionResult Index(int start = 0 , int length=10)
        {

            //var query = db.InvoiceDetails.Include(a => a.Invoice).Include(a => a.Product).
            //    OrderBy(a=> a.ID).Skip(start).Take(length).Select(a=> new {a.Price , a.Product.Name , a.Invoice.InvoiceNumber });

           
            var query = db.Invoices.OrderBy(a => a.ID).Skip(start).Take(length)
                .Include(a => a.InvoiceDetails)
                .Select(a => new {ID = a.ID,
                    InvoiceNumber= a.InvoiceNumber,
                           Date =         a.Date,

                      Products =a.InvoiceDetails
                .Select(m => new { m.Price , m.Product.Name }),
                
                });

            //List<InvoiceSelectDTO> list = new List<InvoiceSelectDTO>();

            //foreach (var item in query)
            //{
            //    var singleInvoice = new InvoiceSelectDTO()
            //    {
            //        //ID = item.ID,
              

            //    };

            //    //foreach (var detail in item.InvoiceDetails)
            //    //{
            //    //    singleInvoice.ProductList.Add(new InvoiceDetailSelectDTO()
            //    //    {
            //    //        Price = detail.Price,
            //    //        ProductName = db.Products.FirstOrDefault(a=> a.Id ==  detail.ProductID).Name
            //    //    }); 
            //    //}

            //    list.Add(singleInvoice);
               
            //}


            var counter = db.Invoices.Count();

            return Ok(new { data = query, recordsFiltered  = counter});
        }

        public class InvoiceSelectDTO
        {
            public InvoiceSelectDTO()
            {
                this.ProductList = new List<InvoiceDetailSelectDTO>();
            }
            public int ID { get; set; }
            public List<InvoiceDetailSelectDTO> ProductList { get; set; }



        }
        public class InvoiceDetailSelectDTO
        {
            public string ProductName { get; set; }
            public decimal Price { get; set; }
        }
        
       


        [HttpPost]
        public IHttpActionResult Create(ProductCreateDTO dto)
        {
            var invoice = new Invoice()
            {
                InvoiceNumber = dto.InovoiceNumber,
                CustomerId = dto.CustomerName,
                EmployeId = dto.EmployeeName,
                Date = dto.Date,


            };
            foreach (var item in dto.Products)
            {
                invoice.InvoiceDetails.Add(new InvoiceDetails() { ProductID = item.ProductName ,Price =item.Price,
                Quantity= item.Quantity  
                });

            }

            db.Invoices.Add(invoice);
            db.SaveChanges();
           return Ok(new { invoice.ID, invoice.Total, invoice.EmployeId });
        }

        [HttpGet]

        public IHttpActionResult Edit(int id)
        {
            return Ok(db.Invoices.Include(a => a.InvoiceDetails).Select(a => new {
                ID = a.ID,
                InvoiceNumber = a.InvoiceNumber,
                Date = a.Date,
                EmployeId =  a.EmployeId,
                CustomerId = a.CustomerId,
                Products = a.InvoiceDetails
                .Select(m => new { m.Price, m.Product.Name }),

            }).FirstOrDefault(a => a.ID== id));
        }


    }
}
