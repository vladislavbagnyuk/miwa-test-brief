import Card from "./styledComponents/Card";

const Vehicle = ({
  name,
  maxAtmospheringSpeed,
  cargoCapacity,
  vehicleClass,
}) => (
  <Card>
    <h2>{name}</h2>
    <p>
      <b>Speed: </b>
      {maxAtmospheringSpeed}
    </p>
    <p>
      <b>Cargo capacity: </b>
      {cargoCapacity ? cargoCapacity : "unknown"}
    </p>
    <p>
      <b>Vehicle class: </b>
      {vehicleClass}
    </p>
  </Card>
);

export default Vehicle;
