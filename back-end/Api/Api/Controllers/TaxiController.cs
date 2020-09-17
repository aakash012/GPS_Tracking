using Api.DBContextLayer;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/Taxi")]
    public class TaxiController : ApiController
    {
        #region Get Operation
        [HttpGet]
        [Route("GetAllTaxi")]

        public IHttpActionResult Get()
        {
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                return Ok(obj.Taxi.ToList());
            }

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

        public IHttpActionResult SaveTaxiData(Taxi taxiInputList)
        {
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
             
                    Taxi taxi = new Taxi();
                    taxi.TaxiNo = taxiInputList.TaxiNo;
                    taxi.Company = taxiInputList.Company;

                    obj.Taxi.Add(taxi);
              

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
        [HttpPut]
        [Route("Update")]

        public IHttpActionResult Update(Taxi taxiInputList)
        {
            int RowAffected = 0;
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                
                
                    Taxi taxi = new Taxi();
                    taxi = obj.Taxi.ToList().Where(it => it.TaxiId == taxiInputList.TaxiId).SingleOrDefault();

                    if (taxi != null)
                    {
                        taxi.TaxiNo = taxiInputList.TaxiNo;
                        taxi.Company = taxiInputList.Company;
                        RowAffected = obj.SaveChanges();
                    }
                
            }
            
            return Ok(RowAffected);
        }
        #endregion


    }
}
