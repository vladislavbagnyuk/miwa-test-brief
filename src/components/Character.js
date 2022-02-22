import Card from "./styledComponents/Card";

const Character = ({ name, height, birthYear, homeworld }) => (
  <Card>
    <h2>{name}</h2>
    <p>
      <b>Height: </b>
      {height}
    </p>
    <p>
      <b>Birth year: </b>
      {birthYear}
    </p>
    <p>
      <b>Homeworld: </b>
      {homeworld.name}
    </p>
  </Card>
);

export default Character;
