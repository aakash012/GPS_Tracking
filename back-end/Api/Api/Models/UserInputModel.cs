using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Api.Models
{
    public class UserInputModel
    {     
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string UserPassword { get; set; }

        public int UserType { get; set; }
    }
}