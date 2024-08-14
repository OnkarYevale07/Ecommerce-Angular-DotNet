namespace ecomm_project.Models
{
  public class AddOrderDTO
  {
    public required string Email { get; set; }
    public required string Address { get; set; }
    public required string Contact { get; set; }
    public required double TotalPrice { get; set; }
    public required string UserId { get; set; }
  }
}
