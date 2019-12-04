using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularDrazExample.Classes;
using Microsoft.AspNetCore.Mvc;

namespace AngularDrazExample.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        
        [HttpGet("[action]"), ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public JsonResult FontsListGet()
        {
            DBListResult<ComboItem> result = new DBListResult<ComboItem>();

            result.Error = 0;

            result.Data = new List<ComboItem>();
            result.Data.Add(new ComboItem { id = 1, text = "Arial" });
            result.Data.Add(new ComboItem { id = 2, text = "Courier New" });
            result.Data.Add(new ComboItem { id = 3, text = "Times New Roman" });                     

            return new JsonResult(result);
        }

        [HttpPost("[action]"), ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public JsonResult SaveProject([FromBody]AppProject data)
        {
            //TODO add security tokens

            RequestResult result = new RequestResult();

            //TODO check if data is valid
            HttpContext.Session.Set("AppProjectData", data);

            result.Error = 0;

            return new JsonResult(result);
        }

        [HttpGet("[action]"), ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public JsonResult GetProject()
        {
            RequestResult result = new RequestResult();

            AppProject projectdata = HttpContext.Session.Get<AppProject>("AppProjectData");

            result.Error = 0;
            if (projectdata != null)
            {
                //result.Error = 0;
                result.Data = projectdata;
            } else
            {
                result.Data = new AppProject { title = "", description = "",  fontColor = "rgba(195, 0, 47, 1)", fontSize10Em = 10  };
                //result.Error = 1;
                //result.ErrorMessage = "No data found.";
            }

            return new JsonResult(result);
        }
    }
}
