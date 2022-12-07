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
        [HttpGet()]
        public IHttpActionResult GetByID(int ID)
        {
          var employee =  db.Employees.Find(ID);
            return Ok(employee);

        }

        public IHttpActionResult Create(Employe employe)
        {
         db.Employees.Add(employe);
         db.SaveChanges();
         return Ok(employe);
        }
        [HttpPut]
        public IHttpActionResult Edit(int ID, Employe employe)
        {
          var employee =   db.Employees.FirstOrDefault(a => a.Id == ID);
            employee.Name = employe.Name;
            db.SaveChanges();
            return Ok(employe);


        }

        

    }
}
