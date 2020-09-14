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
    
    public partial class Customer
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Customer()
        {
            this.CustomerRide = new HashSet<CustomerRide>();
        }
    
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public Nullable<int> Gender { get; set; }
        public string ContactNo { get; set; }
        public string CustomerPassword { get; set; }
        public Nullable<System.DateTime> DateOfRegistration { get; set; }
        public Nullable<int> UserId { get; set; }
    
        public virtual Gender Gender1 { get; set; }
        public virtual Users Users { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CustomerRide> CustomerRide { get; set; }
    }
}