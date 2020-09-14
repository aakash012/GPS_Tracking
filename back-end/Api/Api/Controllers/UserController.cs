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
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {

        #region Login Opereation
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login(Users userInputList)
        {

            Users user = new Users();
            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {

                user = obj.Users.ToList().Where(it => it.UserName == userInputList.UserName && it.UserPassword == userInputList.UserPassword).SingleOrDefault();

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
                //var userList = (from d in obj.Driver
                //                join u in obj.Users
                //                on d.UserId equals u.UserId
                //                select new
                //                {
                //                    UserId = u.UserId,
                //                    UserType = u.UserType,
                //                    DriverName = d.DriverName,
                //                    Username = u.UserName,
                //                    UserPassword = u.UserPassword
                //                }).ToList();


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
            Users user = new Users();

            using (TaxiMasterEntities obj = new TaxiMasterEntities())
            {
                user = obj.Users.ToList().Where(it => it.UserId == Id).SingleOrDefault();

                if (User != null)
                {
                    obj.Users.Remove(user);
                    RowAffected = obj.SaveChanges();
                }
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
