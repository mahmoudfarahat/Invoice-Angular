using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Hosting;
using System.Web.Http;

namespace invoice.Controllers
{

   
    public class ImageController : ApiController
    {

        [HttpGet]
        public IHttpActionResult getImage(string name)
        {
            System.Drawing.Image bitmap = (System.Drawing.Image)Bitmap.FromFile(HostingEnvironment.MapPath("~/hello.jpg")); // set image    
                                                                                                                            //draw the image object using a Graphics object   
            Graphics graphicsImage = Graphics.FromImage(bitmap);

            //Set the alignment based on the coordinates      
            StringFormat stringformat = new StringFormat();
            stringformat.Alignment = StringAlignment.Far;
            stringformat.LineAlignment = StringAlignment.Far;



            //Set the font color/format/size etc..     
            Color StringColor = System.Drawing.ColorTranslator.FromHtml("#000000");//direct color adding   
            string Str_TextOnImage = name;//Your Text On Image   



            graphicsImage.DrawString(Str_TextOnImage, new Font("Edwardian Script ITC", 40,
            FontStyle.Regular), new SolidBrush(StringColor), new Point(700, 400),
            stringformat);


            //Response.ContentType = "image/jpeg";
            //bitmap.Save(Response.OutputStream, ImageFormat.Jpeg);
            MemoryStream memoryStream = new MemoryStream();
            bitmap.Save(memoryStream, ImageFormat.Jpeg);

            var stringBase64 = Convert.ToBase64String(memoryStream.ToArray());

            //return Content("data:image/jpeg;base64," + stringBase64);
            return Ok("data:image/jpeg;base64," + stringBase64);
        }
    }
}
