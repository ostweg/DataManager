using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DataManager.Services;
using DataManager.Models;

namespace DataManager.Controllers {
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PersonsController : ControllerBase
    {
        private IUserService _userService;
    

        public PersonsController(IUserService userService) {
            _userService = userService;
    

        
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]Person personParam){
            var person = _userService.Authenticate(personParam.Username, personParam.Password);
            if(person == null)
                return BadRequest(new {message = "usa"});
            
            return Ok(person);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var persons = _userService.GetAll();
            return Ok(persons);
        }
    }
}
