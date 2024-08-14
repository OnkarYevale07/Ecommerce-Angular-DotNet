namespace ecomm_project.Models
{
  public class AddCartDTO
  {
    public required string Name { get; set; }
    public required double Price { get; set; }
    public required string Category { get; set; }
    public required string Color { get; set; }
    public required string Description { get; set; }
    public required string Image { get; set; }
    public required int Quantity { get; set; }
    public required string UserId { get; set; }
    public required string ProductId { get; set; }
  }
}
