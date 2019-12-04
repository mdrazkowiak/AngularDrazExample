using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDrazExample.Classes
{
    public class ComboItem
    {
        public string text { get; set; }
        public int id { get; set; }
    }

    public class Marker
    {
        public float lat { get; set; }
        public float lng { get; set; }
        public string title { get; set; }
        public bool draggable { get; set; }
    }


    public class AppProject
    {

        public string title { get; set; }
        public string description { get; set; }
        public int fontID { get; set; }
        public string fontColor { get; set; }
        public int fontSize10Em { get; set; }
        public Marker mapItem { get; set; }

        public int clicksCounter { get; set; }
        public int keysCounter { get; set; }
    }

    public class RequestResult
    {
        public Object Data { get; set; }
        public string ErrorMessage { get; set; }
        public int Error { get; set; }
    }

    public class DBListResult<T>
    {
        public List<T> Data { get; set; }
        public int Error { get; set; }
        public string ErrorMessage { get; set; }
    }
}
