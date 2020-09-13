using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class TaxiDriverInputModel
    {
        public int TaxiDriverId { get; set; }
        public Nullable<int> DriverId { get; set; }
        public Nullable<int> TaxiId { get; set; }
    }
}