'use client';
import { Breadcrumb, Card, Col, Collapse, List, Progress, Row, Skeleton, Tag } from "antd";
import { AliwangwangOutlined, HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { pokemon } from "./interfaces";
import Meta from "antd/es/card/Meta";
import Link from "next/link";

async function getPokemon(Id: string) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${Id}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}

function tidyText(text: string) {
    let final_text = text;
    let first_letter = final_text[0].toUpperCase();
    final_text = final_text.replace(text[0], first_letter);
    final_text = final_text.replaceAll('-', ' ');
    return final_text;
}
const pkInftDv: pokemon = {
    id: 0,
    is_default: true,
    name: '',
    height: 0,
    weight: 0,
    order: 0,
    base_experience: 0,

    abilities: [],
    forms: [],
    game_indices: [],
    held_items: [],
    moves: [],
    stats: [],
    types: [],

    species: { name: '', url: '' },
    sprites: {
        front_default: '',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: '',
    },

    location_area_encounters: '',
}

let type_tags = (type: string) => {
    if (type == 'normal') return <Tag color="#aab09f">Normal</Tag>;
    if (type == 'fighting') return <Tag color="#cb5f48">Fighting</Tag>;
    if (type == 'flying') return <Tag color="#7da6de">Flying</Tag>;
    if (type == 'poison') return <Tag color="#b468b7">Poison</Tag>;
    if (type == 'ground') return <Tag color="#cc9f4f">Ground</Tag>;
    if (type == 'rock') return <Tag color="#b2a061">Rock</Tag>;
    if (type == 'bug') return <Tag color="#94bc4a">Bug</Tag>;
    if (type == 'ghost') return <Tag color="#846ab6">Ghost</Tag>;
    if (type == 'steel') return <Tag color="#89a1b0">Steel</Tag>;
    if (type == 'fire') return <Tag color="#ea7a3c">Fire</Tag>;
    if (type == 'water') return <Tag color="#539ae2">Water</Tag>;
    if (type == 'grass') return <Tag color="#71c558">Grass</Tag>;
    if (type == 'electric') return <Tag color="#e5c531">Electric</Tag>;
    if (type == 'psychic') return <Tag color="#e5709b">Psychic</Tag>;
    if (type == 'ice') return <Tag color="#70cbd4">Ice</Tag>;
    if (type == 'dragon') return <Tag color="#6a7baf">Dragon</Tag>;
    if (type == 'dark') return <Tag color="#736c75">Dark</Tag>;
    if (type == 'fairy') return <Tag color="#e397d1">Fairy</Tag>;
    if (type == 'unknown') return <Tag>Unknown</Tag>;
    if (type == 'shadow') return <Tag>Shadow</Tag>;
};

const { Panel } = Collapse;

export default function PokemonPage({ params }: any) {
    const [pokemon, setPokemon] = useState<pokemon>(pkInftDv);
    const [load, setLoad] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPokemon(params.id);
                setPokemon(data);
                setLoad(1)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    let DATA_INFO_COMPONENT = (pokemon: pokemon) => {
        return <>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <List
                        size="small"
                        header={<div><b>#{pokemon.order}. {pokemon.name.toUpperCase()}</b></div>}
                        footer={<div>Return</div>}
                        bordered
                    >
                        <List.Item>Species: <strong>{tidyText(pokemon.species.name)}</strong></List.Item>
                        <List.Item>Types: {pokemon.types.map((item, index) => type_tags(item.type.name))} </List.Item>

                        <List.Item>Height: <strong>{pokemon.height} hg</strong></List.Item>
                        <List.Item>Weight: <strong>{pokemon.weight} dm</strong></List.Item>
                        <List.Item>Base experience: <strong>{pokemon.base_experience}</strong></List.Item>

                        {pokemon.abilities.map((item, index) => <>
                            <List.Item>Ability {index + 1}: <strong>{tidyText(item.ability.name)}</strong> <i style={{ color: '#8c8c8c' }}>| Slot: {item.slot} | Hidden: {item.is_hidden ? 'YES' : 'NO'} |</i></List.Item>
                        </>)}
                        {pokemon.held_items.map((item, index) => <>
                            <List.Item>Held Item {index + 1}: <strong>{tidyText(item.item.name)}</strong></List.Item>
                        </>)}
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header={<strong>Moves ({pokemon.moves.length})</strong>} key="0">
                                {pokemon.moves.map((item, index) => <>
                                    <List.Item>Move {index + 1}: <strong>{tidyText(item.move.name)}</strong></List.Item>
                                </>)}
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey={['1']}>
                            <Panel header={<><strong>Stats</strong> <i style={{ color: '#8c8c8c' }}>| Total: {pokemon.stats.reduce((prev, next) =>{ return prev += next.base_stat}, 0)} | Average: {(pokemon.stats.reduce((prev, next) =>{ return prev += next.base_stat}, 0) / 6).toFixed(2)} |</i></>} key="0">
                                {pokemon.stats.map((item, index) => <>
                                    <List.Item><strong>{tidyText(item.stat.name)}: {item.base_stat}</strong> <i style={{ color: '#8c8c8c' }}> | Effort: {item.effort} |</i>
                                    <Progress percent={item.base_stat / 255 * 100} showInfo={false} strokeColor={{ '0%': '#108ee9', '100%': '#87d068'}} />
                                    </List.Item>
                                    
                                </>)}
                            </Panel>
                        </Collapse>

                    </List>
                </Col>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Link href={pokemon.sprites.front_default} target="_blank">
                                <Card hoverable cover={<img alt="Front" src={pokemon.sprites.front_default} />} >
                                    <Meta title="Front View (1)" />
                                </Card>
                            </Link>

                        </Col>
                        <Col span={6}>
                            <Link href={pokemon.sprites.back_default} target="_blank">
                                <Card hoverable cover={<img alt="Back" src={pokemon.sprites.back_default} />} >
                                    <Meta title="Back View (1)" />
                                </Card>
                            </Link>
                        </Col>
                        <Col span={6}>
                            {pokemon.sprites.front_female ?
                                <Link href={pokemon.sprites.front_female} target="_blank">
                                    <Card hoverable cover={<img alt="Front" src={pokemon.sprites.front_female} />} >
                                        <Meta title="Front View (2)" />
                                    </Card>
                                </Link>
                                : null}

                        </Col>
                        <Col span={6}>
                            {pokemon.sprites.back_female ?
                                <Link href={pokemon.sprites.back_female} target="_blank">
                                    <Card hoverable cover={<img alt="Back" src={pokemon.sprites.back_female} />} >
                                        <Meta title="Back View (2)" />
                                    </Card>
                                </Link>
                                : null}

                        </Col>
                    </Row>
                    <br />
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Link href={pokemon.sprites.front_shiny} target="_blank">
                                <Card hoverable cover={<img alt="Front" src={pokemon.sprites.front_shiny} />} >
                                    <Meta title="Front Shiny View (1)" />
                                </Card>
                            </Link>

                        </Col>
                        <Col span={6}>
                            <Link href={pokemon.sprites.back_shiny} target="_blank">
                                <Card hoverable cover={<img alt="Back" src={pokemon.sprites.back_shiny} />} >
                                    <Meta title="Back Shiny View (1)" />
                                </Card>
                            </Link>
                        </Col>
                        <Col span={6}>
                            {pokemon.sprites.front_shiny_female ?
                                <Link href={pokemon.sprites.front_shiny_female} target="_blank">
                                    <Card hoverable cover={<img alt="Front" src={pokemon.sprites.front_shiny_female} />} >
                                        <Meta title="Front Shiny View (2)" />
                                    </Card>
                                </Link>
                                : null}

                        </Col>
                        <Col span={6}>
                            {pokemon.sprites.back_shiny_female ?
                                <Link href={pokemon.sprites.back_shiny_female} target="_blank">
                                    <Card hoverable cover={<img alt="Back" src={pokemon.sprites.back_shiny_female} />} >
                                        <Meta title="Back Shiny View (2)" />
                                    </Card>
                                </Link>
                                : null}

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>

    }

    return <div>
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/" className="breadcrums">
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/pokemon" className="breadcrums">
                    <span><AppstoreOutlined /> Pokemon List</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="#" className="breadcrums">
                    <span><AliwangwangOutlined /> {pokemon.name.toUpperCase()}</span>
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>

        {load == 0 ? <Skeleton active /> : null}
        {load == 1 ? DATA_INFO_COMPONENT(pokemon) : null}
    </div>
}