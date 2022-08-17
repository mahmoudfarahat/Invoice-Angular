using invoice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace invoice.Controllers
{
    public class EmployeesController : ApiController
    {

          ApplicationDbContext db = new ApplicationDbContext();
        [HttpGet]
          public IHttpActionResult Index()
          {
             
              return  Ok(db.Employees.ToList()) ;
          }

        public IHttpActionResult Create(Employe employe)
        {
         db.Employees.Add(employe);
         db.SaveChanges();
         return Ok(employe);
        }

    }
}
