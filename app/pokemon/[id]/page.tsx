async function getPokemon(Id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${Id}`, { next: { revalidate: 1000 } });
    const data = await res.json();
    return data;
}

export default async function PokemonPage({ params }: any) {
    const pokemon = await getPokemon(params.id)
    return <div>
        <h1>POKEMON // {pokemon.name}</h1>
        <div>
            <ul>
                <li>Height: {pokemon.height}</li>
                <li>Height: {pokemon.weight}</li>
            </ul>
        </div>
    </div>
}