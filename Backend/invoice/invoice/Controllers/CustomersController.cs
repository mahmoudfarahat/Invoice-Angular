using invoice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace invoice.Controllers
{
    public class CustomersController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        [HttpGet]
        public IHttpActionResult Index()
        {

            return Ok(db.Customers.ToList());
        }

        public IHttpActionResult Create(Customer customer)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
            return Ok(customer);
        }
    }
}
