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

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly  DataContext _context;
     

        public FileController(DataContext context)
        {
            _context = context;
        
        }
        [HttpGet]
        /* public async Task<ActionResult<IEnumerable<File>>> GetFiles()
        {
            return await _context.Files.ToListAsync();
        }*/
        [HttpPost]
        public async Task<ActionResult> PostFile(IFormFile file)
        {
            if(file == null || file.Length == 0)
                return Content("file not selected");
            var path = Path.Combine(Directory.GetCurrentDirectory() + "/wwwroot",
                                    file.FileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return RedirectToAction("Files");
        }
        

    }
}