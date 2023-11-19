using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace invoice.Models
{
    public class Employe
    {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Code { get; set; }
            public string Phone { get; set; }
            public DateTime Birthdate { get; set; }


    }
}