using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using DataManager.Models;
using DataManager.Helpers;

namespace DataManager.Services
{
    public interface IUserService
    {
        Person Authenticate(string username, string password);
        IEnumerable<Person> GetAll();
    }
    public class UserService : IUserService {
        private List<Person> _person = new List<Person>{new Person{ Username = "hi", Password="hallomuetter"}};
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings){
            _appSettings = appSettings.Value;
        }
        public Person Authenticate(string username, string password){
            var person = _person.SingleOrDefault(x=>x.Username == username && x.Password == password);

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

        public IEnumerable<Person>GetAll() {
            return _person.Select(x=> {
                x.Password = null;
                return x;
            });
        }

    }
}
