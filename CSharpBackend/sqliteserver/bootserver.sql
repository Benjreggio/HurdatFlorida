CREATE TABLE valid_storms (
    id INTEGER PRIMARY KEY,
    StormID VARCHAR(8) not null,
    StormName VARCHAR(32) not null,
    Duration tinyint NOT NULL,
    Year smallint not null,
    LandfallDate varchar(19) not null,
    WindSpeedAtLandfall tinyint not null,
    StrictLandfallDate tinyint not null,
    StrictWindSpeedAtLandfall tinyint not null,
    IsHurricane bit not null,
    MaxWindSpeed tinyint not null,
    HasAnyLandfall bit not null,
    HasStrictLandfall bit not null,
    HasLiberalLandfall bit not null
);