using ecomm_project.Data;
using ecomm_project.Models;
using ecomm_project.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecomm_project.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class CartController : ControllerBase
  {
    private readonly ApplicationDbContext dbContext;

    public CartController(ApplicationDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult GetAllCarts() {
      return Ok(dbContext.cart.ToList());
    }

    [HttpGet("userId")]
    public IActionResult getCartsByUserId(string userId)
    {
      var cart = dbContext.cart.Where(x => x.UserId == userId).ToList();
      return Ok(cart);
    }

    [HttpGet("id")]
    public IActionResult getCartById(Guid id) {
      var cart = dbContext.cart.Find(id);
      if (cart == null) {
        return NotFound();
      }
      return Ok(cart);
    }

    [HttpDelete("[action]")]
    public IActionResult deleteCart([FromQuery]Guid id) {
      var cart = dbContext.cart.Find(id);
      if (cart == null) {
        return NotFound();
      }
      dbContext.cart.Remove(cart);
      dbContext.SaveChanges();
      return Ok(cart);
    }

    [HttpPost]
    public IActionResult addCart(AddCartDTO cartDTO)
    {
      var cart = new Cart()
      {
        Name = cartDTO.Name,
        Price = cartDTO.Price,
        Category = cartDTO.Category,
        Color = cartDTO.Color,
        Description = cartDTO.Description,
        Image = cartDTO.Image,
        Quantity = cartDTO.Quantity,
        UserId = cartDTO.UserId,
        ProductId = cartDTO.ProductId,
      };
      dbContext.cart.Add(cart);
      dbContext.SaveChanges();
      return Ok(cart);
    }

    [HttpPut("id")]
    public IActionResult updateCart(Guid id,AddCartDTO cartDTO)
    {
      var cart = dbContext.cart.Find(id);
      if (cart == null) {
        return NotFound();
      }
      cart.Name = cartDTO.Name;
      cart.Price = cartDTO.Price;
      cart.Category = cartDTO.Category;
      cart.Color = cartDTO.Color;
      cart.Description = cartDTO.Description;
      cart.Image = cartDTO.Image;
      cart.Quantity = cartDTO.Quantity;
      cart.UserId = cartDTO.UserId;
      cart.ProductId = cartDTO.ProductId;
      dbContext.SaveChanges();
      return Ok(cart);
    }
  }
}
