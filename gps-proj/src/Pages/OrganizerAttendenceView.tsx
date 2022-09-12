import { Table } from "@mantine/core";

function OrganizerViewSlotAttendence() {
  const elements = [
    { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
    { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
    { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
    { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
    { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
  ];
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
     

    </tr>
  ));

//   const ths = (
//     <tr>
//       <th>Element position</th>
//       <th>Element name</th>
//       <th>Symbol</th>
//       <th>Atomic mass</th>
//     </tr>
//   );

  return (
    <Table
      fontSize="md"
      highlightOnHover
      horizontalSpacing="xl"
      verticalSpacing="sm"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Classes Attended</th>
          <th>Total Classes</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
      {/* <tfoot>{ths}</tfoot> */}
    </Table>
  );
}

export default OrganizerViewSlotAttendence;
