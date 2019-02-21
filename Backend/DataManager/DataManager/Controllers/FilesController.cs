using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataManager.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using DataManager.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.Extensions.Primitives;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly  DataContext _context;
        public FileStream fs;
        DataManager.Models.File UserFile = new DataManager.Models.File();
        public FileController(DataContext context)
        {
            _context = context;
        
        }
        
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult> PostFile()
        {
            var file = Request.Form.Files[0];
            
            if(file == null || file.Length == 0)
                return Content("file not selected");
            var path = Path.Combine(Directory.GetCurrentDirectory() + "/wwwroot");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            if(file.Length > 0)
            {
                string filename = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var path2 = Path.Combine(path +"/"+ file.FileName); //To make directory remove the +/+
                using (var stream = new FileStream(path2,FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                StringValues id;
                Request.Form.TryGetValue("currentId", out id);
                var PersonId = Request.Form.Keys;
                UserFile.FilePath = path2;
                UserFile.PersonId = id;
              
               
            }
            
            _context.Files.Add(UserFile);
            await _context.SaveChangesAsync();
            return new JsonResult("upload successful");
         
        }
        

    }
}