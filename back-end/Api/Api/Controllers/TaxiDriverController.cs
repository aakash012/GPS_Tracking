using Api.DBContextLayer;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/TaxiDriver")]
    public class TaxiDriverController : ApiController
    {
       
        #region Get Operation 
        [HttpGet]
        [Route("GetAllTaxiDriver")]

        public IHttpActionResult Get()
        {

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                var data = (from td in obj.TaxiDriver
                            join d in obj.Driver
                  on td.DriverId equals d.DriverId
                            join t in obj.Taxi 
                            on td.TaxiId equals t.TaxiId
                            select new
                            {
                                TaxiDriverId = td.TaxiDriverId,
                                TaxiId=t.TaxiId,
                                DriverId=d.DriverId,
                                DriverName = d.DriverName,
                                TaxiNo=t.TaxiNo
                            }).ToList();

                return Ok(data);
            }


        }
        #endregion

        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveTaxiDriverData(TaxiDriver taxiDriverInputList)
        {
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                TaxiDriver taxiDriver = new TaxiDriver();
                taxiDriver.DriverId = taxiDriverInputList.DriverId;
                taxiDriver.TaxiId = taxiDriverInputList.TaxiId;

                obj.TaxiDriver.Add(taxiDriver);
                
                RowAffected = obj.SaveChanges();

            }
            return Ok(RowAffected);
        }
        #endregion

    }
}
