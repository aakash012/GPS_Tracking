using Api.DBContextLayer;
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
    [RoutePrefix("api/Salary")]
    public class SalaryController : ApiController
    {
        #region Get Operation
        [HttpGet]
        [Route("GetAllDriversSalary/{SalaryMonth}/{FinancialYear}")]

        public IHttpActionResult Get(String SalaryMonth,String FinancialYear)
        {
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var driverSalaryList = (from d in obj.Driver
                                        join s in obj.Salary
                                        on d.DriverId equals s.DriverId
                                        where (s.SalaryMonth == SalaryMonth && s.FinancialYear == FinancialYear)
                                  select new
                                  {
                                      DriverId = d.DriverId,
                                      DriverName = d.DriverName,
                                      SalaryMonth = s.SalaryMonth,
                                      FinancialYear = s.FinancialYear,
                                      NumberOfRides = s.NumberOfRides,
                                      BasicSalary = d.BasicSalary,
                                      WagePerRide = d.WagePerRide,
                                      FinalSalary = s.FinalSalary,
                                      RideBonus = s.RideBonus
                                      
                                  }).ToList();

                return Ok(driverSalaryList);

            }

        }
        #endregion

        #region Calculate Salary
        [HttpPut]
        [Route("CalculateSalary")]

        public IHttpActionResult CalculateSalary(Salary salaryInputList)
        {
            int RowAffected = 0;

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                
                var SalaryList = obj.Salary.ToList().Where(it => it.SalaryMonth == salaryInputList.SalaryMonth && it.FinancialYear == salaryInputList.FinancialYear);

                if (SalaryList!=null)
                {
                    foreach(var salaryList in SalaryList)
                    {
                        Driver driver = new Driver();
                        driver = obj.Driver.ToList().Where(it => it.DriverId == salaryList.DriverId).SingleOrDefault();
                        float RideBonus = (float)(salaryList.NumberOfRides * driver.WagePerRide);
                        float FinalSalary = (float)(driver.BasicSalary + RideBonus);

                        Salary salary = new Salary();
                        salary = obj.Salary.ToList().Where(it => it.DriverId == salaryList.DriverId).SingleOrDefault();
                        salary.RideBonus = RideBonus;
                        salary.FinalSalary = FinalSalary;
                        RowAffected = obj.SaveChanges();

                    }
                    
                }

            }

            return Ok(RowAffected);
        }


        #endregion
    }
}
