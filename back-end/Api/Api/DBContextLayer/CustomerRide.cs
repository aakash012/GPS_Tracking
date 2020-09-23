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
    
    public partial class CustomerRide
    {
        public int CustomerRideId { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> TaxiDriverId { get; set; }
        public Nullable<int> PickupLocationId { get; set; }
        public Nullable<int> DropLocationId { get; set; }
        public int RideStatus { get; set; }
        public Nullable<System.DateTime> DateOfRide { get; set; }
    
        public virtual Customer Customer { get; set; }
        public virtual TaxiDriver TaxiDriver { get; set; }
        public virtual Locations Locations { get; set; }
        public virtual Locations Locations1 { get; set; }
    }
}
