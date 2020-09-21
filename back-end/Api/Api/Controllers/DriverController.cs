using Api.DBContextLayer;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/Driver")]
    public class DriverController : ApiController
    {
        #region Get Operation
        [HttpGet]
        [Route("GetAllDrivers")]

        public IHttpActionResult Get()
        {
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var driverList = (from d in obj.Driver
                                  join g in obj.Gender
                        on d.Gender equals g.GenderId
                                  select new
                                  {
                                      DriverId = d.DriverId,
                                      DriverName = d.DriverName,
                                      GenderType = g.GenderType,
                                      ContactNo = d.ContactNo,
                                      DrivingLicence = d.DrivingLicence,
                                      BasicSalary = d.BasicSalary,
                                      WagePerRide = d.WagePerRide,
                                      Rating = d.Rating
                                  }).ToList();

                return Ok(driverList);
                
            }

        }

        [HttpGet]
        [Route("GetAllDriversForDropDown")]

        public IHttpActionResult GetAllDriversForDropDown()
        {
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
         
                return Ok(obj.Driver.ToList().Where(it => it.AssignedStatus == 0));

            }

        }

        [HttpGet]   
        [Route("GetDriverById/{Id}")]

        public IHttpActionResult GetDriverById(int Id)
        {
            Driver driver = new Driver();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                driver = obj.Driver.ToList().Where(it => it.DriverId == Id).SingleOrDefault();
            }

            return Ok(driver);
        }
        #endregion

        
        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveDriverData(Driver driverInputList)
        {
            int RowAffected = 0;
            int flag = 0;
            int flag1 = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                Users user = new Users();
                user.UserName = driverInputList.ContactNo;
                user.UserPassword = driverInputList.UserPassword;
                user.UserType = 2;
                obj.Users.Add(user);
                flag = obj.SaveChanges();

                if (flag == 1)
                {
                    int userId = user.UserId;
                    Driver driver = new Driver();
                    driver.DriverName = driverInputList.DriverName;
                    driver.Gender = driverInputList.Gender;
                    driver.ContactNo = driverInputList.ContactNo;
                    driver.DrivingLicence = driverInputList.DrivingLicence;
                    driver.BasicSalary = driverInputList.BasicSalary;
                    driver.WagePerRide = driverInputList.WagePerRide;
                    driver.AssignedStatus = 0;
                    driver.UserId = userId;

                    obj.Driver.Add(driver);
                    RowAffected = obj.SaveChanges();

                    if (RowAffected == 1)
                    {
                        int driverId = driver.DriverId;
                        Attendance attendance = new Attendance();
                        attendance.DriverId = driverId;
                        attendance.FinancialYear = "2020";
                        attendance.AttendanceMonth = "September";
                        attendance.NumberOfDays = 0;
                        obj.Attendance.Add(attendance);
                        flag1 = obj.SaveChanges();

                        Salary salary = new Salary();
                        salary.DriverId = driverId;
                        salary.FinancialYear = "2020";
                        salary.SalaryMonth = "September";
                        salary.NumberOfRides = 0;
                        obj.Salary.Add(salary);
                        flag1 = obj.SaveChanges();

                    }

                }

            }
            return Ok(RowAffected);
        }
        #endregion
      
        #region Delete Operation
        [HttpDelete]
        [Route("DeleteById/{Id}")]

        public IHttpActionResult DeleteById(int Id)
        {
            int RowAffected = 0;
            Driver driver = new Driver();
            Users users = new Users();
            Attendance attendance = new Attendance();

            try
            {
                using (TaxiMasterEntities obj = new TaxiMasterEntities())
                {
                    driver = obj.Driver.ToList().Where(it => it.DriverId == Id).SingleOrDefault();

                    if (driver != null)
                    {

                        Nullable<int> userID = driver.UserId;
                        attendance = obj.Attendance.ToList().Where(it => it.DriverId == Id).SingleOrDefault();
                        if (attendance != null)
                        {
                            obj.Attendance.Remove(attendance);
                        }

                        obj.Driver.Remove(driver);

                        
                        users = obj.Users.ToList().Where(it => it.UserId == userID).SingleOrDefault();
                        if (users != null)
                        {
                            obj.Users.Remove(users);
                        }

                        RowAffected = obj.SaveChanges();
                    }
                }
            }
            catch(Exception e)
            {
                return Ok(RowAffected);
            }
                

            return Ok(RowAffected);
        }
        #endregion
        
        #region Update Operation
        [HttpPut]
        [Route("Update")]

        public IHttpActionResult Update(Driver driverInputList)
        {
            int RowAffected = 0;

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                    Driver driver = new Driver();
                    driver = obj.Driver.ToList().Where(it => it.DriverId == driverInputList.DriverId).SingleOrDefault();

                    if (driver != null)
                    {
                        driver.DriverName = driverInputList.DriverName;
                        driver.Gender = driverInputList.Gender;
                        driver.ContactNo = driverInputList.ContactNo;
                        driver.DrivingLicence = driverInputList.DrivingLicence;
                        driver.BasicSalary = driverInputList.BasicSalary;
                        driver.WagePerRide = driverInputList.WagePerRide;
                        RowAffected = obj.SaveChanges();
                    }
                
            }

            return Ok(RowAffected);
        }
        #endregion
        
    }
}
