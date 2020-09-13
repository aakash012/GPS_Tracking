using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class CustomerInputModel
    {

        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int ContactNo { get; set; }
        public string CustomerPassword { get; set; }
        public string DateOfRegistration { get; set; }
        public int Gender { get; set; }
    }
}