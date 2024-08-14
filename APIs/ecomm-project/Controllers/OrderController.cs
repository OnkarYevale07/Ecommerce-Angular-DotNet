using ecomm_project.Data;
using ecomm_project.Models;
using ecomm_project.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecomm_project.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class OrderController : ControllerBase
  {
    private readonly ApplicationDbContext dbContext;

    public OrderController(ApplicationDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult getAllOrders()
    {
      return Ok(dbContext.orders.ToList());
    }

    [HttpGet("id")]
    public IActionResult getOrderById(Guid id) {

      var order = dbContext.orders.Find(id);
      if (order == null) {
        return NotFound();
      }
      return Ok(order);
    }

    [HttpDelete("[action]")]
    public IActionResult deleteOrder([FromQuery]Guid id)
    {
      var order = dbContext.orders.Find(id);
      if (order == null) {
        return NotFound();
      }
      dbContext.orders.Remove(order);
      dbContext.SaveChanges();
      return Ok(order);
    }

    [HttpPost]
    public IActionResult addOrder(AddOrderDTO orderDTO)
    {
      var order = new Order()
      {
        Email = orderDTO.Email,
        Address = orderDTO.Address,
        Contact = orderDTO.Contact,
        TotalPrice = orderDTO.TotalPrice,
        UserId = orderDTO.UserId,
      };

      dbContext.orders.Add(order);
      dbContext.SaveChanges();
      return Ok(order);
    }

    [HttpPut("id")]
    public IActionResult updateOrder(Guid id, AddOrderDTO orderDTO) {
      var order = dbContext.orders.Find(id);
      if (order == null) {
        return NotFound();
      }
      order.Email = orderDTO.Email;
      order.Address = orderDTO.Address;
      order.Contact = orderDTO.Contact;
      order.TotalPrice = orderDTO.TotalPrice;
      order.UserId = orderDTO.UserId;
      dbContext.SaveChanges();
      return Ok(order);
    }

    [HttpGet("[action]")]
    public IActionResult getOrderByUserId([FromQuery]string userId) {
      var order = dbContext.orders.Where(x => x.UserId == userId).ToList();
      if (order == null)
      {
        return NotFound();
      }
      return Ok(order);
    }
  }
}
