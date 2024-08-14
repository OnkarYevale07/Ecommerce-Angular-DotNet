using ecomm_project.Data;
using ecomm_project.Models;
using ecomm_project.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecomm_project.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductController : ControllerBase
  {
    private readonly ApplicationDbContext dbContext;

    public ProductController(ApplicationDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    [HttpGet]
    public IActionResult getAllProducts()
    {
      return Ok(dbContext.products.ToList());
    }

    [HttpGet("{id}")]
    public IActionResult getProductById([FromRoute]Guid id) {
      var product = dbContext.products.Find(id);
      if (product == null) {
        return NotFound();
      }
      return Ok(product);
    }

    [HttpPost]
    public IActionResult addProduct(AddProductDTO productDTO)
    {
      var product = new Product()
      {
        Name = productDTO.Name,
        Price = productDTO.Price,
        Category = productDTO.Category,
        Color = productDTO.Color,
        Description = productDTO.Description,
        Image = productDTO.Image,
      };
      dbContext.products.Add(product);
      dbContext.SaveChanges();
      return Ok(product);
    }

    [HttpPut("{id}")]
    public IActionResult updateProduct([FromRoute]Guid id,AddProductDTO productDTO)
    {
      var product = dbContext.products.Find(id);
      if (product == null) {
        return NotFound();
      }
      product.Name = productDTO.Name;
      product.Price = productDTO.Price;
      product.Category = productDTO.Category;
      product.Color = productDTO.Color;
      product.Description = productDTO.Description;
      product.Image = productDTO.Image;
      dbContext.SaveChanges();
      return Ok(product);
    }

    [HttpDelete("{id}")]
    public IActionResult deleteProduct([FromRoute]Guid id)
    {
      var product = dbContext.products.Find(id);
      if (product == null) {
        return NotFound();
      }
     dbContext.products.Remove(product);
      dbContext.SaveChanges();
      return Ok(product);
    }

    [HttpGet("[action]")]
    public IActionResult getLimitedProducts([FromQuery]int limit)
    {
      var products = dbContext.products.Take(limit).ToList() ;
      return Ok(products);
    }

    [HttpGet("[action]")]
    public IActionResult getProductsByCategory([FromQuery]string category)
    {
      var products = dbContext.products.Where(x=>x.Category==category).Take(4).ToList();
      return Ok(products);
    }

  }
}
