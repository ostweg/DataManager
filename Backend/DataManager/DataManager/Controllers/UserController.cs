using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
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
            if (_context.Persons.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Persons.Add(new Person { FirstName = "test" });
                _context.SaveChanges();
            }
        
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
            if (id != user.PersonId)
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
            _context.Persons.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = user.PersonId }, user);
        }
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]Person personParam){
            var person = _context.Persons.SingleOrDefault(x=>x.Username == personParam.Username && x.Password == personParam.Password);

            if(person == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[] {
                    new Claim(ClaimTypes.Name, person.PersonId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            person.Token = tokenHandler.WriteToken(token);

            person.Password = null;

            return person;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Person>> DeleteUser(long id)
        {
            var user = await _context.Persons.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Persons.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

    }
}