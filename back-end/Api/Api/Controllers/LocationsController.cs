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
    [RoutePrefix("api/Locations")]
    public class LocationsController : ApiController
    {
        #region Get Operation
        [HttpGet]
        [Route("GetAllLocations")]

        public IHttpActionResult GetAllLocations()
        {
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                 return Ok(obj.Locations.ToList());
            }

        }

        [HttpGet]
        [Route("GetLocationById/{Id}")]

        public IHttpActionResult GetLocationById(int Id)
        {
            Locations locations = new Locations();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                locations = obj.Locations.ToList().Where(it => it.LocationId == Id).SingleOrDefault();
            }

            return Ok(locations);

        }
        #endregion
    }
}
