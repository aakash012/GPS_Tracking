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
    [RoutePrefix("api/Taxix")]
    public class TaxiController : ApiController
    {
        #region Get Operation
        [HttpGet]
        [Route("GetAllTaxi")]

        public IHttpActionResult Get()
        {
            List<Taxi> taxiList = new List<Taxi>();
            using(TaxiMasterEntities obj=new TaxiMasterEntities())
            {
                taxiList = obj.Taxi.ToList();
            }

            return Ok(taxiList);
        }

        [HttpGet]
        [Route("GetTaxiById/{Id}")]

        public IHttpActionResult GetTaxiById(int Id)
        {
            Taxi taxi = new Taxi();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                taxi = obj.Taxi.ToList().Where(it => it.TaxiId == Id).SingleOrDefault();
            }

            return Ok(taxi);
        }
        #endregion

        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveTaxiData(List<TaxiInputModel> taxiInputList)
        {
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                foreach(var item in taxiInputList)
                {
                    Taxi taxi = new Taxi();
                    taxi.TaxiNo = item.TaxiNo;
                    taxi.Company = item.Company;

                    obj.Taxi.Add(taxi);
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
            Taxi taxi = new Taxi();

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                taxi = obj.Taxi.ToList().Where(it => it.TaxiId == Id).SingleOrDefault();

                if(taxi != null)
                {
                    obj.Taxi.Remove(taxi);
                    RowAffected = obj.SaveChanges();
                }
            }

            return Ok(RowAffected);
        }
        #endregion

        #region Update Operation
        [HttpPost]
        [Route("Update")]

        public IHttpActionResult Update(List<TaxiInputModel> taxiInputList)
        {
            int RowAffected = 0;
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                
                foreach (var item in taxiInputList)
                {
                    Taxi taxi = new Taxi();
                    taxi = obj.Taxi.ToList().Where(it => it.TaxiId == item.TaxiId).SingleOrDefault();

                    if (taxi != null)
                    {
                        taxi.TaxiNo = item.TaxiNo;
                        taxi.Company = item.Company;
                        RowAffected = obj.SaveChanges();
                    }
                }
            }
            
            return Ok(RowAffected);
        }
        #endregion


    }
}
