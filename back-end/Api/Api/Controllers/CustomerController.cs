using Api.DBContextLayer;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/Customer")]
    public class CustomerController : ApiController
    {
       
        #region Get Operation

        [HttpGet]
        [Route("GetAllCustomer")]

        public IHttpActionResult Get()
        {
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                var customerList = (from c in obj.Customer
                                  join g in obj.Gender
                        on c.Gender equals g.GenderId
                                  select new
                                  {
                                      CustomerId = c.CustomerId,
                                      CustomerName = c.CustomerName,
                                      GenderType = g.GenderType,
                                      ContactNo = c.ContactNo,
                                      DateOfRegistration = c.DateOfRegistration,
                                      
                                  }).ToList();

                return Ok(customerList);
            }

            
        }
        [HttpGet]
        [Route("GetCustomerById/{Id}")]

        public IHttpActionResult GetCustomerById(int Id)
        {
            Customer customer = new Customer();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                customer = obj.Customer.ToList().Where(it => it.CustomerId == Id).SingleOrDefault();
            }

            return Ok(customer);
        }

        #endregion

        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveCustomerData(Customer customerInputList)
        {
            int RowAffected = 0;
            int flag = 0;
            DateTime date = DateTime.Now;


            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                    Users user = new Users();
                    user.UserName = customerInputList.ContactNo;
                    user.UserPassword = customerInputList.CustomerPassword;
                    user.UserType = 3;
                    obj.Users.Add(user);
                    flag = obj.SaveChanges();

                    if(flag == 1)
                    {
                    int UserId = user.UserId;

                    Customer customer = new Customer();
                    customer.CustomerName = customerInputList.CustomerName;
                    customer.Gender = customerInputList.Gender;
                    customer.ContactNo = customerInputList.ContactNo;
                    customer.CustomerPassword = customerInputList.CustomerPassword;
                    customer.DateOfRegistration = date;
                    customer.UserId = UserId;
                    obj.Customer.Add(customer);

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
            Customer customer = new Customer();

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                customer = obj.Customer.ToList().Where(it => it.CustomerId == Id).SingleOrDefault();

                if (customer != null)
                {
                    obj.Customer.Remove(customer);
                    RowAffected = obj.SaveChanges();
                }
            }

            return Ok(RowAffected);
        }
        #endregion

        #region Update Operation

        [HttpPut]
        [Route("Update")]

        public IHttpActionResult Update(Customer customerInputList)
        {
            int RowAffected = 0;

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                
                    Customer customer = new Customer();
                    customer = obj.Customer.ToList().Where(it => it.CustomerId == customerInputList.CustomerId).SingleOrDefault();

                    if (customer != null)
                    {
                        customer.CustomerName = customerInputList.CustomerName;
                        customer.Gender = customerInputList.Gender;
                        customer.ContactNo = customerInputList.ContactNo;
                        customer.CustomerPassword = customerInputList.CustomerPassword;
                        RowAffected = obj.SaveChanges();
                    }
                
            }

            return Ok(RowAffected);
        }


        #endregion
    }
}
