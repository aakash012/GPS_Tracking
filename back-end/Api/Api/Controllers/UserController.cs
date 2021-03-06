﻿using Api.DBContextLayer;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {

        #region Login Opereation
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login(Users userInputList)
        {

            Users user = new Users();
            Customer customer = new Customer();
            Driver driver = new Driver();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                user = obj.Users.ToList().Where(it => it.UserName == userInputList.UserName && it.UserPassword == userInputList.UserPassword).SingleOrDefault();

                if(user !=null)
                {
                    int userType = user.UserType;
                    int userId = user.UserId;

                    if (userType == 3)
                    {
                        customer = obj.Customer.ToList().Where(it => it.UserId == userId).SingleOrDefault();
                        return Ok(customer);
                    }
                    else if (userType == 2)
                    {
                        driver = obj.Driver.ToList().Where(it => it.UserId == userId).SingleOrDefault();
                        return Ok(driver);
                    }
                    else
                    {
                        return Ok(user);
                    }
                }
                
            }
            return Ok(user);

        }

        #endregion

        #region Forget Password

        [HttpPost]
        [Route("CheckUserName")]
        public IHttpActionResult CheckUserName(Users userInputList)
        {

            Users user = new Users();
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                user = obj.Users.ToList().Where(it => it.UserName == userInputList.UserName).SingleOrDefault();

            }
            return Ok(user);

        }

        [HttpPut]
        [Route("UpdatePassword")]
        public IHttpActionResult UpdatePassword(Users userInputList)
        {
            int RowAffected = 0;
            Users user = new Users();

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                user = obj.Users.ToList().Where(it => it.UserId == userInputList.UserId).SingleOrDefault();

                if (user != null)
                {
                    user.UserPassword = userInputList.UserPassword;   
                    RowAffected = obj.SaveChanges();
                }

            }
            return Ok(user);

        }

        #endregion

        #region Get Operation

        [HttpGet]
        [Route("GetAllUser")]

        public IHttpActionResult Get()
        {
            
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
               
                return Ok(obj.Users.ToList());
            }

        }
        [HttpGet]
        [Route("GetUserById/{Id}")]

        public IHttpActionResult GetUserById(int Id)
        {
            Users user = new Users();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                user = obj.Users.ToList().Where(it => it.UserId == Id).SingleOrDefault();
            }

            return Ok(user);
        }

        #endregion

        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveUserData(Users userInputList)
        {
            int RowAffected = 0;
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                
                    Users user = new Users();
                    user.UserName = userInputList.UserName;
                    user.UserPassword = userInputList.UserPassword;
                    user.UserType = userInputList.UserType;

                    obj.Users.Add(user);
                

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
            int UserType = 0;
            Users user = new Users();

            try
            {
                using (TaxiMasterEntities obj = new TaxiMasterEntities())
                {
                    user = obj.Users.ToList().Where(it => it.UserId == Id).SingleOrDefault();

                    if (User != null)
                    {
                        UserType = user.UserType;
                        obj.Users.Remove(user);
                        RowAffected = obj.SaveChanges();
                    }
                }
            }
            catch(Exception e)
            {
                return Ok(UserType);
            }
              

            return Ok(RowAffected);
        }


        #endregion

        #region Update Operation

        [HttpPut]
        [Route("Update")]

        public IHttpActionResult Update(Users userInputList)
        {
            int RowAffected = 0;

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                    Users user = new Users();
                    user = obj.Users.ToList().Where(it => it.UserId == userInputList.UserId).SingleOrDefault();

                    if (user != null)
                    {
                        user.UserName = userInputList.UserName;
                        user.UserPassword = userInputList.UserPassword;
                    user.UserType = userInputList.UserType;
                        RowAffected = obj.SaveChanges();
                    }
               
            }

            return Ok(RowAffected);
        }


        #endregion
    }
}
