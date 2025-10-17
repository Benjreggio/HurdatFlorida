namespace CSharpBackend
{

    public class Storm
    {
        public required string StormID { get; set; }
        public required string StormName { get; set; }
        public int Year { get; set; }
        public int Duration { get; set; }
        public required int MaxWindSpeed { get; set; }
        public required int WindSpeedAtLandfall { get; set; }
        public required int StrictWindSpeedAtLandfall { get; set; }
        public required string LandfallDate { get; set; }
        public required string StrictLandfallDate { get; set; }
        public required int IsHurricane { get; set; }
        public required int HasLiberalLandfall { get; set; }
        public required int HasStrictLandfall { get; set; }
        public int HasAnyLandfall { get; set; }
    }

    public class MetaData
    {
        public required int totalPages { get; set; }
        public required int currentPage { get; set; }
        public required int pageSize { get; set; }
        public required int totalRecords { get; set; }
    }

    public class APIResponse
    {
        public required List<Storm> data { get; set; }
        public required MetaData metaData { get; set; }
    }
}