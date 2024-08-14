using ecomm_project.Data;
using ecomm_project.Models;
using ecomm_project.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecomm_project.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SellerController : ControllerBase
  {
    private readonly ApplicationDbContext dbContext;

    public SellerController(ApplicationDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    [HttpGet]
    [Route("{id:guid}")]
    public IActionResult getSellerById(Guid id)
    {
      var seller = dbContext.sellers.Find(id);
      if (seller == null) {
        return NotFound();
      }
      return Ok(seller);
    }

    [HttpGet]
    public IActionResult getAllSellers()
    {
      return Ok(dbContext.sellers.ToList());
    }

    [HttpPost]
    public IActionResult addSeller(AddSellerDTO sellerDTO)
    {
      var seller = new Seller()
      {
        Name = sellerDTO.Name,
        Email = sellerDTO.Email,
        Password = sellerDTO.Password,
      };
      dbContext.sellers.Add(seller);
      dbContext.SaveChanges();
      return Ok(seller);
    }

    [HttpPut]
    [Route("{id:guid}")]
    public IActionResult updateSeller(Guid id, AddSellerDTO sellerDTO) {
      var seller = dbContext.sellers.Find(id);
      if (seller == null) {
        return NotFound();
      }
      seller.Name = sellerDTO.Name;
      seller.Email = sellerDTO.Email;
      seller.Password = sellerDTO.Password;
      dbContext.SaveChanges();
      return Ok(seller);
    }

    [HttpDelete]
    [Route("{id:guid}")]
    public IActionResult deleteSellerById(Guid id)
    {
      var seller = dbContext.sellers.Find(id);
      if (seller == null) {
        return NotFound();
      }
      dbContext.sellers.Remove(seller);
      dbContext.SaveChanges();
      return Ok(seller);
    }

    [HttpGet("[action]")]
    public IActionResult sellerLogin([FromQuery] string email, [FromQuery] string password)
    {

      var seller = dbContext.sellers.Where(x => x.Email == email && x.Password == password).ToList();
      if (seller.Count<=0)
      {
        return NotFound();
      }
      return Ok(seller);
    }

  }
}
