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
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {

        #region Login Opereation
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login(List<UserInputModel> userInputList){

            int RowAffected =0;

            using (UserMasterEntities obj = new UserMasterEntities())
            {

                foreach (var item in userInputList)
                {
                    Users user = new Users();
                    user = obj.Users.ToList().Where(it => it.UserName== item.UserName && it.UserPassword == item.UserPassword ).SingleOrDefault();

                    if (user != null)
                    {
                        /*  user.UserName = item.UserName;
                          user.UserPassword = item.UserPassword;
                          user.UserType = item.UserType;
                          RowAffected = obj.SaveChanges();*/
                        RowAffected = 1;
                    }
                }
            }

            return Ok(RowAffected);




        }

        #endregion

        #region Get Operation

        [HttpGet]
        [Route("GetAllUser")]

        public IHttpActionResult Get()
        {
            List<Users> userList = new List<Users>();
            using (UserMasterEntities obj = new UserMasterEntities())
            {
                userList = obj.Users.ToList();
            }

            return Ok(userList);
        }
        [HttpGet]
        [Route("GetUserById/{Id}")]

        public IHttpActionResult GetUserById(int Id)
        {
            Users user = new Users();
            using (UserMasterEntities obj = new UserMasterEntities())
            {
                user = obj.Users.ToList().Where(it => it.UserId == Id).SingleOrDefault();
            }

            return Ok(user);
        }

        #endregion

        #region Save Operation
        [HttpPost]
        [Route("Save")]

        public IHttpActionResult SaveUserData(List<UserInputModel> userInputList)
        {
            int RowAffected = 0;
            using (UserMasterEntities obj = new UserMasterEntities())
            {
                foreach (var item in userInputList)
                {
                    Users user = new Users();
                    user.UserName = item.UserName;
                    user.UserPassword = item.UserPassword;
                    user.UserType = item.UserType;

                    obj.Users.Add(user);
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
            Users user = new Users();

            using (UserMasterEntities obj = new UserMasterEntities())
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

        [HttpPost]
        [Route("Update")]

        public IHttpActionResult Update(List<UserInputModel> userInputList)
        {
            int RowAffected = 0;

            using (UserMasterEntities obj = new UserMasterEntities())
            {

                foreach (var item in userInputList)
                {
                    Users user = new Users();
                    user = obj.Users.ToList().Where(it => it.UserId == item.UserId).SingleOrDefault();

                    if (user != null)
                    {
                        user.UserName = item.UserName;
                        user.UserPassword = item.UserPassword;
                        user.UserType = item.UserType;
                        RowAffected = obj.SaveChanges();
                    }
                }
            }

            return Ok(RowAffected);
        }


        #endregion
    }
}
