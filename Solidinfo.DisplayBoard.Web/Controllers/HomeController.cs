using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Xml.Serialization;

namespace Solidinfo.DisplayBoard.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index(string id)
        {
            //var data = GlobalDataManager.GetData(id);
            ViewBag.GroupName = id;
            return View();
            //data = null;
            //if (data != null)
            //{
            //    ViewBag.LastNews = data.LastNews;


            //}
            //else
            //{
            //    ViewBag.LastNews = string.Empty;
            //    return View();
            //}
            //return View(data);
            //using (var file = System.IO.File.OpenRead(HttpContext.Server.MapPath("~/Example.xml")))
            //{
            //    XmlSerializer s = new XmlSerializer(typeof(ProductionData));
            //    var result = s.Deserialize(file);
            //    return View(result);
            //}
        }

        public ActionResult GetData(string id)
        {
#if DEBUG1
            var data = GlobalDataManager.GetRandomData();
#else
            var data = GlobalDataManager.GetData(id);
#endif
            if (data == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.NoContent);
            }
            else
            {
                return Json(data, JsonRequestBehavior.AllowGet);
            }

        }
    }
}