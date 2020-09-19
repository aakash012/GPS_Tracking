﻿using Api.DBContextLayer;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/CustomerRide")]
    public class CustomerRideController : ApiController
    {

        #region Get Operation
        [HttpGet]
        [Route("GetAllCustomerRide")]

        public IHttpActionResult Get()
        {
            DateTime date = DateTime.Now;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var customerList = (from c in obj.Customer
                                    join cr in obj.CustomerRide
                                    on c.CustomerId equals cr.CustomerId into custRide
                                    from cr in custRide.DefaultIfEmpty()
                                    join td in obj.TaxiDriver
                                    on cr.TaxiDriverId equals td.TaxiDriverId into taxiDri
                                    from td in taxiDri.DefaultIfEmpty()
                                    join d in obj.Driver
                                    on td.DriverId equals d.DriverId into Driv
                                    from d in Driv.DefaultIfEmpty()
                                    join t in obj.Taxi
                                    on td.TaxiId equals t.TaxiId into taxi
                                    from t in taxi.DefaultIfEmpty()
                                    where (cr.CustomerRideId != null)
                                    select new
                                    {
                                        CustomerRideId = cr == null ? 0 : cr.CustomerRideId,
                                        CustomerName = cr == null ? "" : c.CustomerName,
                                        PickupLocation = cr == null ? "" : cr.PickupLocation,
                                        DropLocation = cr == null ? "" : cr.DropLocation,
                                        RideStatus = cr == null ? 0 : cr.RideStatus,
                                        TaxiDriverId = cr == null ? 0 : cr.TaxiDriverId,
                                        DriverName = d == null ? "" : d.DriverName,
                                        TaxiNo = t == null ? "" : t.TaxiNo,
                                        RideDate = cr == null ? date : cr.DateOfRide

                                    }).ToList();

                return Ok(customerList);
            }
            
        }

        [HttpGet]
        [Route("GetCustomerRideById/{Id}")]

        public IHttpActionResult GetCustomerRideById(int Id)
        {
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var customerRide = (from cr in obj.CustomerRide
                                join c in obj.Customer
                                on cr.CustomerId equals c.CustomerId
                                where (cr.CustomerRideId == Id)
                                select new
                                {
                                    CustomerRideId = cr.CustomerRideId,
                                    CustomerId = cr.CustomerId,
                                    CustomerName = c.CustomerName,
                                    PickupLocation = cr.PickupLocation,
                                    DropLocation = cr.DropLocation

                                }).ToList().SingleOrDefault();
                return Ok(customerRide);
            }
                
            
        }


        [HttpGet]
        [Route("GetAllAttendance")]

        public IHttpActionResult GetAttendance()
        {

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var attendanceList = (from a in obj.Attendance
                                    join d in obj.Driver
                                    on a.DriverId equals d.DriverId
                                    select new
                                    {
                                        DriverName = d.DriverName,
                                        FinancialYear = a.FinancialYear,
                                        AttendanceMonth = a.AttendanceMonth,
                                        NumberOfDays = a.NumberOfDays

                                    }).ToList();

                return Ok(attendanceList);
            }

        }
        #endregion


        #region Save Operation
        [HttpPost]
        [Route("Save")]
        public IHttpActionResult SaveCustomerRideData(CustomerRide customerRideList)
        {
            DateTime date = DateTime.Now;
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                CustomerRide customerRide = new CustomerRide();
                customerRide.CustomerId = customerRideList.CustomerId;
                customerRide.PickupLocation = customerRideList.PickupLocation;
                customerRide.DropLocation = customerRideList.DropLocation;
                customerRide.DateOfRide = date;

                obj.CustomerRide.Add(customerRide);
                RowAffected = obj.SaveChanges();

            }
            return Ok(RowAffected);
        }
        #endregion

        #region Update Operation
        [HttpPut]
        [Route("Update")]

        public IHttpActionResult Update(CustomerRide customerRideList)
        {
            int RowAffected = 0;
            int flag = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                CustomerRide customerRide = new CustomerRide();
                customerRide = obj.CustomerRide.ToList().Where(it => it.CustomerRideId == customerRideList.CustomerRideId).SingleOrDefault();

                if (customerRide != null)
                {
                    customerRide.TaxiDriverId = customerRideList.TaxiDriverId;
                    customerRide.RideStatus = 1;
                    RowAffected = obj.SaveChanges();

                    if (RowAffected == 1)
                    {
                        var driverIdData = (from td in obj.TaxiDriver
                                            join d in obj.Driver
                                  on td.DriverId equals d.DriverId
                                            where td.TaxiDriverId == customerRideList.TaxiDriverId
                                            select new
                                            {
                                                DriverId = d.DriverId
                                            }).ToList();
                        

                        Attendance attendance = new Attendance();
                        attendance = obj.Attendance.ToList().Where(it => it.DriverId == driverIdData[0].DriverId).SingleOrDefault();
                        if (attendance != null)
                        {
                            attendance.NumberOfDays = attendance.NumberOfDays + 1;
                            flag = obj.SaveChanges();

                        }
                    }
                    
                }

            }

            return Ok(flag);
        }
        #endregion



    }
}
