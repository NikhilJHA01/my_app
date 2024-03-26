// Configurable column []object
// Can be made more configurable and can be created dynamic from data coming from backend
export const columns = [
  {
    name: "Name",
    key: "name",
    sortable: false,
  },
  {
    name: "Device",
    key: "device",
    sortable: false,
  },
  {
    name: "Path",
    key: "path",
    sortable: false,
    cellStyle: {
      maxWidth: "300px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  {
    name: "Status",
    key: "status",
    sortable: true,
    condition: (row) => row.status === "available",
    cellStyle: {
      textTransform: "capitalize",
    },
    customStyles: {
      display: "inline-block",
      backgroundColor: "green",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      marginRight: "5px",
    },
  },
];

export const rows = [
  {
    id: 1, // Added as static for now ( Should come from backend or Can be added on each object on client side by using uuid)
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },

  {
    id: 2,
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },

  {
    id: 3,
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },

  {
    id: 4,
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },
  {
    id: 5,
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
];
