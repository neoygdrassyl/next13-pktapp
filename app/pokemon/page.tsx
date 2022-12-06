'use client';

import React, { useState, useEffect } from "react"
import { RightOutlined, LeftOutlined, HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { AutoComplete, Breadcrumb, Button, Card, Input, List, Select, SelectProps, Skeleton, Space } from "antd";

async function getPokemons(url: string, limit: number, offset: number) {
    const res = await fetch(`${url}?offset=${offset}&limit=${limit}`, { cache: 'no-store' });
    const data = await res.json();
    return data;
}



export default function ListPage() {
    const [pokemons, setPokemons] = useState({ results: [], next: null, previous: null, count: 0 });
    const [list, setList] = useState([]);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const [limit, setLimit] = useState(20);
    const [offset, setOfsset] = useState(0);
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const [load, setLoad] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getPokemons(url, limit, offset);
                setPokemons(data);
                const data_list = await getPokemons(url, 1154, 20);
                setList(data_list.results.map((r: any) => r.name));
                setLoad(1);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [limit, offset]);

    interface DataType {
        key: string;
        name: string;
        url: string;
        i: number;
    };

    let converted = pokemons.results.map((r: any, i: number) => {
        return {
            key: r.name,
            name: r.name,
            url: r.url,
            i: i
        }
    })

    const data: DataType[] = converted;

    const searchResult = (query: string) =>
        list.filter((f: string) => (f).toUpperCase().includes(query.toUpperCase()))
            .map((name: string, idx: number) => {
                const category = `${name.toUpperCase()}`;
                return {
                    value: category,
                    label: (
                        <div style={{ display: 'flex', justifyContent: 'space-between', }} >
                            <span>
                                <Link href={`/pokemon/${name}`}>
                                    {(name).toUpperCase()}
                                </Link>
                            </span>
                        </div>
                    ),
                };
            });

    let BTNS_COMPONENT = () => {
        return <Space direction="horizontal">
            <Button type="primary" icon={<LeftOutlined />} onClick={() => setOfsset(offset - limit)} disabled={offset < limit}>Prev</Button>
            <Select
                defaultValue={20}
                style={{ width: 150 }}
                onChange={setLimit}
                options={[
                    { value: 20, label: 'Limit 20', },
                    { value: 48, label: 'Limit 48', },
                    { value: 96, label: 'Limit 96', },
                    { value: 512, label: 'Limit 512', },
                    { value: pokemons.count, label: `Limit All (${pokemons.count})`, },
                ]}
            />
            <Button type="primary" icon={false} onClick={() => setOfsset(offset + limit)} disabled={offset + limit >= pokemons.count}>Next <RightOutlined /></Button>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 300 }}
                options={options}
                onSearch={Search}
                placeholder="Search pokemon..."
            >
            </AutoComplete>

        </Space>
    }

    function Search(value: string) {
        setOptions(value ? searchResult(value) : [])
    }

    return <div>
        <Breadcrumb>
            <Breadcrumb.Item href="/" className="breadcrums">
                <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/pokemon" className="breadcrums">
                <span><AppstoreOutlined /> Pokemon List</span>
            </Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ marginBlock: '20px' }}>
            {BTNS_COMPONENT()}
        </div>

        {load == 0 ? <Skeleton active /> : null}
        {load == 1 ?
            <Card title={<div><h3>LIST OF POKEMON</h3></div>}>
                {data.map(d => {
                    return <Card.Grid style={{ width: '25%', textAlign: 'center', }} ><Link href={`/pokemon/${d.name}`}>{(d.name).toUpperCase()}</Link></Card.Grid>
                })}
            </Card>
            : null}
    </div>
}