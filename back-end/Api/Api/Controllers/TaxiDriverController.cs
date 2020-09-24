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
                            join cl in obj.Locations
                            on td.CurrentLocationId equals cl.LocationId
                            orderby cl.LocationName ascending
                            select new
                            {
                                TaxiDriverId = td.TaxiDriverId,
                                TaxiId=t.TaxiId,
                                DriverId=d.DriverId,
                                DriverName = d.DriverName,
                                TaxiNo=t.TaxiNo,
                                DriverAssignedStatus=td.DriverAssignedStatus,
                                CurrentLocationName = cl.LocationName,
                                TaxiLocationLatitude = cl.Latitude,
                                TaxiLocationLongitude = cl.Longitude

                            }).ToList();

                return Ok(data);
            }


        }

        [HttpGet]
        [Route("GetAllTaxiDriverForDropDown/{id}")]

        public IHttpActionResult GetAllTaxiDriverForDropDown(int Id)
        {

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                var data = (from td in obj.TaxiDriver
                            join d in obj.Driver
                            on td.DriverId equals d.DriverId
                            join t in obj.Taxi
                            on td.TaxiId equals t.TaxiId
                            where (td.CurrentLocationId == Id && td.DriverAssignedStatus == 0)
                            select new
                            {
                                TaxiDriverId = td.TaxiDriverId,
                                DriverName = d.DriverName
                            
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
                taxiDriver.DriverAssignedStatus = 0;
                taxiDriver.CurrentLocationId = taxiDriverInputList.CurrentLocationId;

                obj.TaxiDriver.Add(taxiDriver);
                RowAffected = obj.SaveChanges();

                Driver driver = new Driver();
                driver = obj.Driver.ToList().Where(it => it.DriverId == taxiDriverInputList.DriverId).SingleOrDefault();
                if(driver != null)
                {
                    driver.AssignedStatus = 1;
                    obj.SaveChanges();
                }

                Taxi taxi = new Taxi();
                taxi = obj.Taxi.ToList().Where(it => it.TaxiId == taxiDriverInputList.TaxiId).SingleOrDefault();
                if (taxi != null)
                {
                    taxi.AssignedStatus = 1;
                    obj.SaveChanges();
                }


            }
            return Ok(RowAffected);
        }
        #endregion

    }
}
