namespace ecomm_project.Models.Entities
{
  public class Order
  {
    public Guid Id { get; set; }
    public required string Email {  get; set; }
    public required string Address {  get; set; }
    public required string Contact {  get; set; }
    public required double TotalPrice {  get; set; }
    public required string UserId { get; set; }
  }
}
