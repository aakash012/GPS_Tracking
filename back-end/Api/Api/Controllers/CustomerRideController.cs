using Api.DBContextLayer;
using System;
using System.Globalization;
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
                                    join pl in obj.Locations
                                    on cr.PickupLocationId equals pl.LocationId into pLocation
                                    from pl in pLocation.DefaultIfEmpty()
                                    join dl in obj.Locations
                                    on cr.DropLocationId equals dl.LocationId into dLocation
                                    from dl in dLocation.DefaultIfEmpty()
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
                                        PickupLocation = pl == null ? "" : pl.LocationName,
                                        DropLocation = dl == null ? "" : dl.LocationName,
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
            DateTime date = DateTime.Now;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var customerList = (from c in obj.Customer
                                    join cr in obj.CustomerRide
                                    on c.CustomerId equals cr.CustomerId into custRide
                                    from cr in custRide.DefaultIfEmpty()
                                    join pl in obj.Locations
                                    on cr.PickupLocationId equals pl.LocationId into pLocation
                                    from pl in pLocation.DefaultIfEmpty()
                                    join dl in obj.Locations
                                    on cr.DropLocationId equals dl.LocationId into dLocation
                                    from dl in dLocation.DefaultIfEmpty()
                                    join td in obj.TaxiDriver
                                    on cr.TaxiDriverId equals td.TaxiDriverId into taxiDri
                                    from td in taxiDri.DefaultIfEmpty()
                                    join d in obj.Driver
                                    on td.DriverId equals d.DriverId into Driv
                                    from d in Driv.DefaultIfEmpty()
                                    join t in obj.Taxi
                                    on td.TaxiId equals t.TaxiId into taxi
                                    from t in taxi.DefaultIfEmpty()
                                    where (cr.CustomerRideId == Id)
                                    select new
                                    {
                                        CustomerRideId = cr == null ? 0 : cr.CustomerRideId,
                                        CustomerName = cr == null ? "" : c.CustomerName,
                                        PickupLocation = pl == null ? "" : pl.LocationName,
                                        DropLocation = dl == null ? "" : dl.LocationName,
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
        [Route("GetCustomerRideByCustomerId/{Id}")]

        public IHttpActionResult GetCustomerRideByCustomerId(int Id)
        {
            DateTime date = DateTime.Now;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var customerList = (from c in obj.Customer
                                    join cr in obj.CustomerRide
                                    on c.CustomerId equals cr.CustomerId into custRide
                                    from cr in custRide.DefaultIfEmpty()
                                    join pl in obj.Locations
                                    on cr.PickupLocationId equals pl.LocationId into pLocation
                                    from pl in pLocation.DefaultIfEmpty()
                                    join dl in obj.Locations
                                    on cr.DropLocationId equals dl.LocationId into dLocation
                                    from dl in dLocation.DefaultIfEmpty()
                                    join td in obj.TaxiDriver
                                    on cr.TaxiDriverId equals td.TaxiDriverId into taxiDri
                                    from td in taxiDri.DefaultIfEmpty()
                                    join d in obj.Driver
                                    on td.DriverId equals d.DriverId into Driv
                                    from d in Driv.DefaultIfEmpty()
                                    join t in obj.Taxi
                                    on td.TaxiId equals t.TaxiId into taxi
                                    from t in taxi.DefaultIfEmpty()
                                    where (cr.CustomerRideId != null && c.CustomerId == Id)
                                    select new
                                    {
                                        CustomerRideId = cr == null ? 0 : cr.CustomerRideId,
                                        CustomerName = cr == null ? "" : c.CustomerName,
                                        PickupLocation = pl == null ? "" : pl.LocationName,
                                        DropLocation = dl == null ? "" : dl.LocationName,
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
        [Route("CheckRideCompletionByCustomerId/{Id}")]

        public IHttpActionResult CheckRideCompletionByCustomerId(int Id)
        {
            try
            {
                using (TaxiMasterEntities obj = new TaxiMasterEntities())
                {
                    var customerList = (from c in obj.Customer
                                        join cr in obj.CustomerRide
                                        on c.CustomerId equals cr.CustomerId
                                        orderby cr.CustomerRideId descending
                                        where (cr.CustomerRideId != null && cr.CustomerId==Id)
                                        select new
                                        {
                                            CustomerRideId = cr.CustomerRideId,
                                            RideStatus = cr.RideStatus
                                        }).ToList().FirstOrDefault();

                    if(customerList == null)
                    {
                        return Ok(-1);
                    }

                    return Ok(customerList.RideStatus);
                }

            }
            catch(Exception e)
            {
                return Ok(0);
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
                                        NumberOfDays = a.NumberOfDays,
                                        AttendanceDate =a.AttendanceDate
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
                customerRide.PickupLocationId = customerRideList.PickupLocationId;
                customerRide.DropLocationId = customerRideList.DropLocationId;
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
            DateTime date = DateTime.Now;
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
                            DateTime adate = date;
                            if (attendance.AttendanceDate != null)
                            {
                                adate = (DateTime)attendance.AttendanceDate;

                            }
                            
                            if (attendance.AttendanceDate == null || adate.Date != date.Date)
                            {
                                attendance.AttendanceDate = date;
                                attendance.NumberOfDays = attendance.NumberOfDays + 1;
                            }

                            flag = obj.SaveChanges();

                        }

                        Salary salary = new Salary();
                        salary = obj.Salary.ToList().Where(it => it.DriverId == driverIdData[0].DriverId).SingleOrDefault();
                        if (salary != null)
                        {
                            salary.NumberOfRides = salary.NumberOfRides + 1;
                            flag = obj.SaveChanges();

                        }

                        TaxiDriver taxiDriver = new TaxiDriver();
                        taxiDriver = obj.TaxiDriver.ToList().Where(it => it.TaxiDriverId == customerRideList.TaxiDriverId).SingleOrDefault();
                        if (taxiDriver != null)
                        {
                            taxiDriver.DriverAssignedStatus = 1;
                            obj.SaveChanges();

                        }
                    }
                    
                }

            }

            return Ok(flag);
        }

        [HttpPut]
        [Route("CompleteRide")]

        public IHttpActionResult CompleteRide(CustomerRide customerRideList)
        {
            int RowAffected = 0;
            int flag = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                CustomerRide customerRide = new CustomerRide();
                customerRide = obj.CustomerRide.ToList().Where(it => it.CustomerRideId == customerRideList.CustomerRideId).SingleOrDefault();

                if (customerRide != null)
                {
                    int TaxiDriverId = (int)customerRide.TaxiDriverId;
                    customerRide.RideStatus = 2;
                    RowAffected = obj.SaveChanges();

                    TaxiDriver taxiDriver = new TaxiDriver();
                    taxiDriver = obj.TaxiDriver.ToList().Where(it => it.TaxiDriverId == TaxiDriverId).SingleOrDefault();
                    if (taxiDriver != null)
                    {
                        taxiDriver.DriverAssignedStatus = 0;
                        obj.SaveChanges();

                    }

                }

            }

            return Ok(flag);
        }
        #endregion



    }
}
