using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Serialization;

namespace Solidinfo.DisplayBoard.Web.Controllers
{
    public class DataController : Controller
    {
        // GET: DataImport
        public ActionResult Index()
        {
            return View();
        }
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult FlushAll(string data)
        {
            //var file = System.IO.File.OpenRead(HttpContext.Server.MapPath("~/Example.xml"));


            //XmlDocument doc = new XmlDocument();
            //doc.LoadXml(data);

            XmlSerializer s = new XmlSerializer(typeof(ProductionData));
#if DEBUG
            StringWriter write = new StringWriter();
            ProductionData temp = GlobalDataManager.GetRandomData();
            s.Serialize(write, temp);
            var tempStr = write.ToString();
            TextReader reader = new StringReader(tempStr);
#else
            TextReader reader = new StringReader(data);
#endif
            var result = s.Deserialize(reader) as ProductionData;
            if (result != null)
            {
                GlobalDataManager.SetData(result);
                return Content("true");
            }
            else
            {
                return Content("false");
            }
        }

    }
    public enum DeviceRunningStatus
    {
        Status1,
        Status2,
        Status3,
        Status4,
        Status5,
        Status6,
    }
    public class ProductionStatistics
    {
        [XmlElement(ElementName = "Real")]
        public StatisticsCount Real { get; set; }
        [XmlElement(ElementName = "Standard")]
        public StatisticsCount Standard { get; set; }
        [XmlElement(ElementName = "JHSL")]
        public StatisticsCount JHSL { get; set; }
          [XmlElement(ElementName = "ChangeLine")]
        public StatisticsCount ChangeLine { get; set; }
    

        
    }
    public class EfficiencyStatistics
    {
        [XmlElement(ElementName = "Effciency")]
        public StatisticsCount Effciency { get; set; }
        [XmlElement(ElementName = "PPH")]
        public StatisticsCount PPH { get; set; }
        [XmlElement(ElementName = "JHDCL")]
        public StatisticsCount JHDCL { get; set; }
    }
    public class StatisticsCount
    {
        public int InDay { get; set; }
        public int InLastHour { get; set; }
    
    }
    public class WarningCount
    {
        public int InDay { get; set; }
        public int InLastHour { get; set; }
        public int QuantityWarning { get; set; }
        public int MaterialWarning { get; set; }
        public int BeatWarning { get; set; }
      
    }
    public class DeviceStatus
    {
        public int U1 { get; set; }  public string U1R { get; set; }
        public int U2 { get; set; }   public string U2R { get; set; }
        public int U3 { get; set; }   public string U3R { get; set; }
        public int U4 { get; set; } public string U4R { get; set; }
        public int U5 { get; set; } public string U5R { get; set; }
        public int U6 { get; set; } public string U6R { get; set; }
        public int U7 { get; set; } public string U7R { get; set; }
        public int U8 { get; set; } public string U8R { get; set; }
        public int Z1 { get; set; } public string Z1R { get; set; }
        public int Z2 { get; set; } public string Z2R { get; set; }
        public int Z3 { get; set; } public string Z3R { get; set; } 
        [XmlIgnore]
        public DeviceRunningStatus U1Status
        {
            get
            {
                return (DeviceRunningStatus)U1;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U2Status
        {
            get
            {
                return (DeviceRunningStatus)U2;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U3Status
        {
            get
            {
                return (DeviceRunningStatus)U3;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U4Status
        {
            get
            {
                return (DeviceRunningStatus)U4;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U5Status
        {
            get
            {
                return (DeviceRunningStatus)U5;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U6Status
        {
            get
            {
                return (DeviceRunningStatus)U6;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U7Status
        {
            get
            {
                return (DeviceRunningStatus)U7;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus U8Status
        {
            get
            {
                return (DeviceRunningStatus)U8;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus Z1Status
        {
            get
            {
                return (DeviceRunningStatus)Z1;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus Z2Status
        {
            get
            {
                return (DeviceRunningStatus)Z2;
            }
        }
        [XmlIgnore]
        public DeviceRunningStatus Z3Status
        {
            get
            {
                return (DeviceRunningStatus)Z3;
            }
        }
    }
    [XmlRoot(ElementName = "ProductionData")]
    public class ProductionData
    {
        [XmlElement(ElementName = "GroupName")]
        public string GroupName { get; set; }
        [XmlElement(ElementName = "ProductionStatistics")]
        public ProductionStatistics ProductionStatistics { get; set; }
        [XmlElement(ElementName = "EfficiencyStatistics")]
        public EfficiencyStatistics EfficiencyStatistics { get; set; }
        [XmlElement(ElementName = "WarningCount")]
        public WarningCount WarningCount { get; set; }
        [XmlElement(ElementName = "DeviceStatus")]
        public DeviceStatus DeviceStatus { get; set; }
        [XmlElement(ElementName = "LastNews")]
        public string LastNews { get; set; }
        [XmlElement(ElementName = "DeviceModel")]
        public string DeviceModel { get; set; }
    }

    public static class GlobalDataManager
    {
        private static Dictionary<string, ProductionData> __dict = new Dictionary<string, ProductionData>();

        public const string DefaultGroupName = "Group1";
        static GlobalDataManager()
        {
#if DEBUG
            var data = new ProductionData()
            {
                GroupName = DefaultGroupName,
                DeviceModel = "C5500-DAYDREAM BLACK -17 UKFR",
                DeviceStatus = new DeviceStatus() { 
                U1=2,U1R="1,2,3"
                },
                EfficiencyStatistics = new EfficiencyStatistics()
                {
                    Effciency = new StatisticsCount()
                    {
                        InDay = 10,
                        InLastHour = 11
                    },
                    PPH = new StatisticsCount()
                    {
                        InDay = 8,
                        InLastHour = 81
                    },
                    JHDCL = new StatisticsCount()
                    {
                        InDay = 8,
                        InLastHour = 81
                    }

                },
                ProductionStatistics = new ProductionStatistics()
                {
                    Real = new StatisticsCount()
                    {
                        InDay = 10,
                        InLastHour = 112
                    },

                    Standard = new StatisticsCount()
                    {
                        InDay = 21,
                        InLastHour = 218
                    },
                    JHSL = new StatisticsCount()
                    {
                        InDay = 8,
                        InLastHour = 81
                    },
                    ChangeLine = new StatisticsCount()
                    {
                        InDay = 8,
                        InLastHour = 81
                    }

                },
                LastNews = "最新消息",

                WarningCount = new WarningCount()
                {
                    BeatWarning = 2,
                    InLastHour = 3,
                    InDay = 4,
                    QuantityWarning = 43,
                    MaterialWarning = 76
                }
            };
            SetData(data);
#endif
        }

        private static Random _random = new System.Random();

        public static void SetData(ProductionData data)
        {
            if (data == null)
            {
                return;
            }
            string groupName = data.GroupName;
            if (string.IsNullOrEmpty(groupName))
            {
                groupName = DefaultGroupName;
            }
            groupName = groupName.Trim().ToLower();
            ProductionData temp;
            if (__dict.TryGetValue(groupName, out temp))
            {
                __dict[groupName] = data;
            }
            else
            {
                lock (__dict)
                {
                    if (__dict.TryGetValue(groupName, out temp))
                    {
                        __dict[groupName] = data;
                    }
                    else
                    {
                        __dict.Add(groupName, data);
                    }
                }
            }
        }

        public static ProductionData GetData(string groupName)
        {
            if (string.IsNullOrEmpty(groupName))
            {
                groupName = DefaultGroupName;
            }
            groupName = groupName.Trim().ToLower();
            ProductionData temp;
            if (__dict.TryGetValue(groupName, out temp))
            {
                return temp;
            }
            else
            {
                return null;
            }
        }

        public static ProductionData GetRandomData()
        {
            ProductionData data = new ProductionData()
            {
                DeviceModel = "DAFDAADFAW" + _random.Next(1000),
                DeviceStatus = new DeviceStatus()
                {
                    U1 = _random.Next(6),
                    U2 = _random.Next(6),
                    U3 = _random.Next(6),
                    U4 = _random.Next(6),
                    U5 = _random.Next(6),
                    U6 = _random.Next(6),
                    U7 = _random.Next(6),
                    U8 = _random.Next(6),
                    Z1 = _random.Next(6),
                    Z2 = _random.Next(6),
                    Z3 = _random.Next(6),
                },
                EfficiencyStatistics = new EfficiencyStatistics()
                {
                    Effciency = new StatisticsCount()
                    {
                        InDay = _random.Next(100),
                        InLastHour = _random.Next(100),
                    },
                    PPH = new StatisticsCount()
                    {
                        InDay = _random.Next(100),
                        InLastHour = _random.Next(100),
                    },
                },
                ProductionStatistics = new ProductionStatistics()
                {
                    Real = new StatisticsCount()
                    {
                        InDay = _random.Next(200),
                        InLastHour = _random.Next(100),
                    },
                    Standard = new StatisticsCount()
                    {
                        InDay = _random.Next(200),
                        InLastHour = _random.Next(100),
                    },
                },
                WarningCount = new WarningCount()
                {
                    BeatWarning = _random.Next(999),
                    InDay = _random.Next(999),
                    InLastHour = _random.Next(999),
                    MaterialWarning = _random.Next(999),
                    QuantityWarning = _random.Next(999),
                },
                LastNews = "萘wll拉到覅哇打发  ioadoklad  哦阿迪王看此鳄 iaodiadq 啊迪佛脾气【看此add 埃达德阿道夫成为劳而无功dfadf"
            };
            return data;
        }
    }
}