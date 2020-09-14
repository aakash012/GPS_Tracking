using Api.DBContextLayer;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
                                      Rating = d.Rating
                                  }).ToList();

                return Ok(driverList);
                //Attendance attendance = new Attendance();
                //attendance = obj.Attendance.ToList().Where(it => it.DriverId == 11).SingleOrDefault();
                //if (attendance != null)
                //{
                //    attendance.NumberOfDays = 0;
                //    return Ok(attendance);
                //}
                //return Ok(12);
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
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                Users user = new Users();
                user.UserName = driverInputList.ContactNo;
                user.UserPassword = driverInputList.UserPassword;
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
                    driver.UserId = userId;

                    obj.Driver.Add(driver);

                    RowAffected = obj.SaveChanges();

                    int driverId = driver.DriverId;
                    Attendance attendance = new Attendance();
                    attendance.DriverId = driverId;
                    attendance.FinancialYear = "2020";
                    attendance.AttendanceMonth = "September";
                    obj.Attendance.Add(attendance);
                    RowAffected = obj.SaveChanges();
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

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                driver = obj.Driver.ToList().Where(it => it.DriverId == Id).SingleOrDefault();

                if (driver != null)
                {
                    obj.Driver.Remove(driver);
                    RowAffected = obj.SaveChanges();
                }
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
                        RowAffected = obj.SaveChanges();
                    }
                
            }

            return Ok(RowAffected);
        }
        #endregion
        
    }
}
