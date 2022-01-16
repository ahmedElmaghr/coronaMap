export const columnsSchema = [
    {
      field: "countryInfo",
      headerName: "ID",
      width: 50,
      valueGetter: (params) => `${params.row.countryInfo.iso3}`,
    },
    { field: "country", headerName: "Country name", width: 150 },
    { field: "continent", headerName: "Continent", width: 130 },
    {
      field: "cases",
      headerName: "Total cases",
      width: 150,
      editable: false,
    },
    {
      field: "todayCases",
      headerName: "Today cases",
      width: 120,
      editable: false,
    },
    {
      field: "todayDeaths",
      headerName: "Today deaths",
      description: "",
      width: 120,
    },
    {
      field: "deaths",
      headerName: "Total deaths",
      type: "number",
      width: 120,
    },
    {
      field: "todayRecovered",
      headerName: "Today recovered",
      sortable: true,
      width: 120,
    },
    {
      field: "recovered",
      headerName: "Total recovered",
      sortable: true,
      width: 120,
    },
  ];