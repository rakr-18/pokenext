import Image from "next/image";

import styles from '../../styles/Pokemon.module.css';

export async function getStaticPaths() {
  const maxPokemons = 251;
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  
  const response = await fetch(`${url}/?limit=${maxPokemons}`);
  const data = await response.json();

  const paths = data.results.map((item, index) => {
    return {
      params: { pokemonId: (index + 1).toString() }
    }
  });

  return {
    paths, 
    fallback: false,
  };
};

export async function getStaticProps(context) {
  const id = context.params.pokemonId;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  return {
    props: { pokemon: data }
  };
};

function Pokemon({pokemon}) {
  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        src={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      
      <div>
        <h3>Número:</h3>
        <p>#{pokemon.id}</p>
      </div>

      <div>
        <h3>Tipo:</h3>
        <div className={styles.types_container}>
          {pokemon.types.map((item, index) => (
            <span
              key={index}
              className={`${styles.type} ${styles['type_' + item.type.name]}`}
            >
              {item.type.name}
            </span>
          ))}  
        </div>
      </div>

      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
