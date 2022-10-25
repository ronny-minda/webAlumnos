import styled from "styled-components";

// import XLSX from "xlsx";

import * as XLSX from "xlsx";

const H1 = styled.h1`
  background-color: red;
`;

const App = () => {
  const data = [
    {
      name: "vato1",
      apellido: "vato2",
    },
    {
      name: "vato1",
      apellido: "vato2",
    },
  ];

  const exportar = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "area");

    XLSX.writeFile(wb, "exportar.xlsx");
  };

  const carga = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // console.log(jsonData[0].name);
    console.log(jsonData);
  };

  return (
    <>
      <H1 onClick={() => exportar()}>dale Click descarga</H1>
      <input type="file" onChange={(e) => carga(e)} />
    </>
  );
};

export default App;

// import styled from "styled-components";
// import ExportExcel from "react-export-excel";

// const ExcelFile = ExportExcel.ExcelFile;
// const ExcelSheet = ExportExcel.ExcelSheet;
// const ExcelColumn = ExportExcel.ExcelColumn;

// const H1 = styled.h1`
//   background-color: red;
// `;

// console.log("siii");

// function App() {
//   const data = [
//     {
//       name: "vato1",
//       apellido: "vato2",
//     },
//     {
//       name: "vato1",
//       apellido: "vato2",
//     },
//   ];

//   return (
//     <>
//       <H1>hola</H1>

//       <ExcelFile
//         element={<button> exportar a excel </button>}
//         filename="excelPrueba"
//       >
//         <ExcelSheet data={data} name="name">
//           <ExcelColumn label=" dato1 " name=" dato1 " />
//           <ExcelColumn label=" dato2 " name=" dato2 " />
//         </ExcelSheet>
//       </ExcelFile>
//     </>
//   );
// }

// export default App;
