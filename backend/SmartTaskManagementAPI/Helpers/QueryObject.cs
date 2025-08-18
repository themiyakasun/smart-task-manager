namespace SmartTaskManagementAPI.Helpers
{
    public class QueryObject
    {
        public string? Search { get; set; } = null;
        public string? Status { get; set; } = null;
        public string SortBy { get; set; } = "CreatedAt";
        public bool isDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 2;
    }
}
