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
}