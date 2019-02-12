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

            if (_context.Users.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.Users.Add(new User { FirstName = "test" });
                _context.SaveChanges();
            }
        }
    }
}