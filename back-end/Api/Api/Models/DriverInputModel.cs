using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class DriverInputModel
    {
        public int DriverId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string DriverName { get; set; }
        public Nullable<int> Gender { get; set; }
        public string ContactNo { get; set; }
        public string DrivingLicence { get; set; }
        public Nullable<int> Rating { get; set; }
    }
}