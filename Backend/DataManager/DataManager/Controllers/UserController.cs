using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataManager.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly  DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;

        
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetUsers()
        {
            return await _context.Persons.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetUserById(long id)
        {
            var todoItem = await _context.Persons.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, Person user)
        {
            if (id != Persons.PersonId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<Person>> PostUser(Person user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = user.PersonId }, user);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Person>> DeleteUser(long id)
        {
            var user = await _context.Persons.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Person.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

    }
}