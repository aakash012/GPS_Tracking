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
    
    public partial class Driver
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Driver()
        {
            this.Attendance = new HashSet<Attendance>();
            this.Salary = new HashSet<Salary>();
            this.TaxiDriver = new HashSet<TaxiDriver>();
        }
    
        public int DriverId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string DriverName { get; set; }
        public int Gender { get; set; }
        public string ContactNo { get; set; }
        public string DrivingLicence { get; set; }
        public string UserPassword { get; set; }
        public Nullable<int> Rating { get; set; }
        public Nullable<int> AssignedStatus { get; set; }
        public Nullable<double> BasicSalary { get; set; }
        public Nullable<int> WagePerRide { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Attendance> Attendance { get; set; }
        public virtual Gender Gender1 { get; set; }
        public virtual Users Users { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Salary> Salary { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TaxiDriver> TaxiDriver { get; set; }
    }
}
