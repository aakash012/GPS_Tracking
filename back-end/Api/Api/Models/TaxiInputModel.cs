using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class TaxiInputModel
    {
        public int TaxiId { get; set; }
        public string TaxiNo { get; set; }
        public string Company { get; set; }
    }
}