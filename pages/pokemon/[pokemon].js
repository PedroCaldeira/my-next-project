import Head from 'next/head'
import styles from './pokemon.module.css'


function Pokemon({ pokemon }) {
    return (<>
        <Head>
            <title>Pokemon: {pokemon?.name}</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
        </Head>
        <div className={styles.container}>Welcome, {pokemon?.name}
            <img src={pokemon?.sprites.front_default} /></div></>);
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
    const pokemon = await res.json()

    return {
        props: {
            pokemon
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const pokemons = await res.json()

    let paths = pokemons.results.map(p => `/pokemon/${p.name}`)
    return {
        paths,
        fallback: false,
    }
}

export default Pokemon;