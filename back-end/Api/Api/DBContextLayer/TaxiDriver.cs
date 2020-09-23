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
    
    public partial class TaxiDriver
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TaxiDriver()
        {
            this.CustomerRide = new HashSet<CustomerRide>();
        }
    
        public int TaxiDriverId { get; set; }
        public Nullable<int> DriverId { get; set; }
        public Nullable<int> TaxiId { get; set; }
        public Nullable<int> DriverAssignedStatus { get; set; }
    
        public virtual Driver Driver { get; set; }
        public virtual Taxi Taxi { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CustomerRide> CustomerRide { get; set; }
    }
}
