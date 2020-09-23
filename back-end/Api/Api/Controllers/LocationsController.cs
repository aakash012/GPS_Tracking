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

        [HttpGet]
        [Route("GetRideLocationsForDirection/{Id}")]

        public IHttpActionResult getRideLocationsForDirection(int Id)
        {
            try
            {
                using (TaxiMasterEntities obj = new TaxiMasterEntities())
                {
                    var customerList = (from cr in obj.CustomerRide
                                        join dl in obj.Locations
                                        on cr.DropLocationId equals dl.LocationId
                                        join pl in obj.Locations
                                        on cr.PickupLocationId equals pl.LocationId
                                        orderby cr.CustomerRideId descending
                                        where (cr.CustomerRideId != null && cr.CustomerId == Id)
                                        select new
                                        {
                                            PickupLocationId = pl.LocationId,
                                            PickupLocation = pl.LocationName,
                                            PickupLatitude = pl.Latitude,
                                            PickupLongitude = pl.Longitude,
                                            DropLocationId = dl.LocationId,
                                            DropLocation = dl.LocationName,
                                            DropLatitude = dl.Latitude,
                                            DropLongitude = dl.Longitude

                                        }).ToList().FirstOrDefault();


                    return Ok(customerList);
                }

            }
            catch (Exception e)
            {
                return Ok(0);
            }

        }

        #endregion
    }
}
