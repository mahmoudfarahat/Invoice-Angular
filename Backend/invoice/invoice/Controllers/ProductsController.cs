using invoice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace invoice.Controllers
{
    public class ProductsController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        [HttpGet]
        public IHttpActionResult Index()
        {
            return Ok(db.Products.Select(p => new {  id = p.Id, name = p.Name, price = p.Price }).ToList());
        }
                [HttpGet]
        public IHttpActionResult Get(int id)
        {
            var product = db.Products.Find(id).Price;
            return Ok(product);
        }


    }
}
