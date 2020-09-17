using Api.DBContextLayer;
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

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var customerList = (from c in obj.Customer
                                    join cr in obj.CustomerRide
                                    on c.CustomerId equals cr.CustomerId
                                    select new
                                    {
                                        CustomerRideId = cr.CustomerRideId,
                                        CustomerName = c.CustomerName,
                                        PickupLocation = cr.PickupLocation,
                                        DropLocation = cr.DropLocation,
                                        RideStatus = cr.RideStatus

                                    }).ToList();

                return Ok(customerList);
            }
            
        }

        [HttpGet]
        [Route("GetCustomerRideById/{Id}")]

        public IHttpActionResult GetCustomerRideById(int Id)
        {
            CustomerRide customerRide = new CustomerRide();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                customerRide = obj.CustomerRide.ToList().Where(it => it.CustomerRideId == Id).SingleOrDefault();
            }

            return Ok(customerRide);
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
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                CustomerRide customerRide = new CustomerRide();
                customerRide.CustomerId = customerRideList.CustomerId;
                customerRide.PickupLocation = customerRideList.PickupLocation;
                customerRide.DropLocation = customerRideList.DropLocation;

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
                            attendance.NumberOfDays = 1;
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
