//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Api.DBContextLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class Salary
    {
        public int SalaryId { get; set; }
        public Nullable<int> DriverId { get; set; }
        public string FinancialYear { get; set; }
        public string SalaryMonth { get; set; }
        public int NumberOfRides { get; set; }
        public double RideBonus { get; set; }
        public double FinalSalary { get; set; }
    
        public virtual Driver Driver { get; set; }
    }
}
