'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateWorker() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');

    const router = useRouter();

    const create = async (e: any) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8090/api/collections/workers/records', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, role, email }),
        });
        setName('');
        setSurname('');
        setRole('');
        setEmail('');

        router.refresh();
    }

    return <form onSubmit={create}>
        <h3>CREATE A NEW WORKER</h3>
        <input type={'text'} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type={'text'} placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
        <input type={'text'} placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
        <input type={'text'} placeholder="Emai" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">CREATE</button>
    </form>

}