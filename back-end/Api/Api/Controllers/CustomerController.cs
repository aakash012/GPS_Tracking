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
    [RoutePrefix("api/Customer")]
    public class CustomerController : ApiController
    {

        #region Get Operation

        [HttpGet]
        [Route("GetAllCustomer")]

        public IHttpActionResult Get()
        {
            List<Customer> userList = new List<Customer>();
            using (CustomerMasterEntities obj = new CustomerMasterEntities())
            {
                userList = obj.Customer.ToList();
            }

            return Ok(userList);
        }
        [HttpGet]
        [Route("GetCustomerById/{Id}")]

        public IHttpActionResult GetCustomerById(int Id)
        {
            Customer customer = new Customer();
            using (CustomerMasterEntities obj = new CustomerMasterEntities())
            {
                customer = obj.Customer.ToList().Where(it => it.CustomerId == Id).SingleOrDefault();
            }

            return Ok(customer);
        }

        #endregion

        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveCustomerData(List<CustomerInputModel> customerInputList)
        {
            int RowAffected = 0;

            DateTime date = DateTime.Now;


            using (CustomerMasterEntities obj = new CustomerMasterEntities())
            {
                foreach (var item in customerInputList)
                {
                    Customer customer = new Customer();
                    customer.CustomerName = item.CustomerName;
                    customer.Gender = item.Gender.ToString();
                    customer.ContactNo = item.ContactNo.ToString();
                    customer.CustomerPassword = item.CustomerPassword;
                    // customer.DateOfRegistration = item.DateOfRegistration();
                    customer.DateOfRegistration = date;

                    obj.Customer.Add(customer);
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
            Customer customer = new Customer();

            using (CustomerMasterEntities obj = new CustomerMasterEntities())
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

        [HttpPost]
        [Route("Update")]

        public IHttpActionResult Update(List<CustomerInputModel> customerInputList)
        {
            int RowAffected = 0;

            using (CustomerMasterEntities obj = new CustomerMasterEntities())
            {

                foreach (var item in customerInputList)
                {
                    Customer customer = new Customer();
                    customer = obj.Customer.ToList().Where(it => it.CustomerId == item.CustomerId).SingleOrDefault();

                    if (customer != null)
                    {
                        customer.CustomerName = item.CustomerName;
                        customer.Gender = item.Gender.ToString();
                        customer.ContactNo = item.ContactNo.ToString();
                        customer.CustomerPassword = item.CustomerPassword;
                        RowAffected = obj.SaveChanges();
                    }
                }
            }

            return Ok(RowAffected);
        }


        #endregion
    }
}
