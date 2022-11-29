'use client';

import React, { useState, useEffect } from "react"
import type { ColumnsType } from 'antd/es/table'
import Link from 'next/link';
import PKTable from './pktable'
import { List } from "antd";

async function getPokemons() {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}

async function getPokemon(id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}

export default function PokemonPage() {
    const [pokemons, setPokemons] = useState({ results: [], next: null, previous: null, limit: 20});

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPokemons();
                setPokemons(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    interface DataType {
        key: string;
        name: string;
        url: string;
        i: number;
    };

    let converted = pokemons.results.map((r: any, i : number) => {
        return {
            key: r.name,
            name: r.name,
            url: r.url,
            i: i
        }
    })

    const data: DataType[] = converted;

    return <div>
        <h1>POKEMON</h1>
        <div>
            <List
                size="small"
                header={<div>Count: {pokemons.limit}</div>}
                footer={<div>Next: {pokemons.next ?? ''}, Previous: {pokemons.previous ?? ''}</div>}
                bordered
                dataSource={data}
                renderItem={(item: any) => <List.Item><Link href={`/pokemon/${item.name}`}>{item.i+1} {item.name}</Link></List.Item>}
            />
        </div>
    </div>
}