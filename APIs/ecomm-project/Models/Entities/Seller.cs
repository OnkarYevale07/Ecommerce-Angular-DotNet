namespace ecomm_project.Models.Entities
{
  public class Seller
  {
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Email {  get; set; }
    public required string Password {  get; set; }
  }
}
