using Api.DBContextLayer;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Api.Controllers
{
    [RoutePrefix("api/Driver")]
    public class DriverController : ApiController
    {
        #region Get Operation
        [HttpGet]
        [Route("GetAllDrivers")]

        public IHttpActionResult Get()
        {
            List<Driver> driverList = new List<Driver>();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                driverList = obj.Driver.ToList();
            }

            return Ok(driverList);
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

        public IHttpActionResult SaveDriverData(List<DriverInputModel> driverInputList)
        {
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                foreach (var item in driverInputList)
                {
                    Driver driver = new Driver();
                    driver.DriverName = item.DriverName;
                    driver.Gender = item.Gender;
                    driver.ContactNo = item.ContactNo;
                    driver.DrivingLicence = item.DrivingLicence;

                    obj.Driver.Add(driver);
                }

                RowAffected = obj.SaveChanges();

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

        public IHttpActionResult Update(List<DriverInputModel> driverInputList)
        {
            int RowAffected = 0;

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                foreach (var item in driverInputList)
                {
                    Driver driver = new Driver();
                    driver = obj.Driver.ToList().Where(it => it.DriverId == item.DriverId).SingleOrDefault();

                    if (driver != null)
                    {
                        driver.DriverName = item.DriverName;
                        driver.Gender = item.Gender;
                        driver.ContactNo = item.ContactNo;
                        driver.DrivingLicence = item.DrivingLicence;
                        RowAffected = obj.SaveChanges();
                    }
                }
            }

            return Ok(RowAffected);
        }
        #endregion
        
    }
}
