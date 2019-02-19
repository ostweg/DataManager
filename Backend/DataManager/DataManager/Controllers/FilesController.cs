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
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;


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
        public async Task<ActionResult<IEnumerable<File>>> GetFiles()
        {
            return await _context.Files.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<File>> GetFileById(long id)
        {
            var file = await _context.Files.FindAsync(id);

            if (file == null)
            {
                return NotFound();
            }

            return file;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(long id, File file)
        {
            if (id != file.FileId)
            {
                return BadRequest();
            }

            _context.Entry(file).State = EntityState.Modified;
            await _context.SaveChangesAsync();          

            return NoContent();
        }
        [HttpPost]
       
        public async Task<ActionResult<Person>> PostFile(File file)
        {
            _context.Files.Add(file);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = file.FileId }, file);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<File>> DeleteUser(long id)
        {
            var file = await _context.Files.FindAsync(id);
            if (file == null)
            {
                return NotFound();
            }

            _context.Files.Remove(file);
            await _context.SaveChangesAsync();

            return file;
        }

    }
}