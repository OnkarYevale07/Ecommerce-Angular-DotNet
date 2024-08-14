using ecomm_project.Data;
using ecomm_project.Models;
using ecomm_project.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ecomm_project.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserController : ControllerBase
  {
    private readonly ApplicationDbContext dbContext;

    public UserController(ApplicationDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    [HttpGet]
    [Route("{id:guid}")]
    public IActionResult getUserById(Guid id)
    {
      var user = dbContext.users.Find(id);
      if (user == null) {
        return NotFound();
      }
      return Ok(user);
    }

    [HttpGet]
    public IActionResult getAllUsers() {
      return Ok(dbContext.users.ToList());
    }

    [HttpPost]
    public IActionResult addUser(AddUserDTO userDTO)
    {
      var user = new User()
      {
        Name = userDTO.Name,
        Email = userDTO.Email,
        Password = userDTO.Password,
      };
      dbContext.users.Add(user);
      dbContext.SaveChanges();
      return Ok(user);
    }

    [HttpPut]
    [Route("{id:guid}")]
    public IActionResult updateUser(Guid id,AddUserDTO userDTO)
    {
      var user = dbContext.users.Find(id);
      if (user == null) {
        return NotFound();
      }
      user.Name = userDTO.Name;
      user.Email = userDTO.Email;
      user.Password = userDTO.Password;
      dbContext.SaveChanges();
      return Ok(user);
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public IActionResult deleteUser(Guid id) {
      var user = dbContext.users.Find(id);
      if (user == null) {
        return NotFound();
      }
      dbContext.users.Remove(user);
      dbContext.SaveChanges();
      return Ok(user);
    }

    [HttpGet("[action]")]
    public IActionResult userLogin([FromQuery]string email, [FromQuery]string password)
    {

      var user = dbContext.users.Where(x=>x.Email == email && x.Password==password).ToList();
      if (user.Count <= 0)
      {
        return NotFound();
      }
      return Ok(user);
    }

    }
  }
