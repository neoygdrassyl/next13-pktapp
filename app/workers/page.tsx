import Link from "next/link";
import CreateWorker from "./[id]/createWorker";

async function getNotes() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/workers/records', { cache: 'no-store' });
    const data = await res.json();
    return data?.items as any[];
}

export default async function WorkersPage() {
    const notes = await getNotes();

    return <div>
        <h1>WORKERS</h1>
        <div>
            {notes?.map(note => {
                return <Note key={note.id} note={note} />;
            })}
            < CreateWorker />
        </div>
    </div>
}

function Note({ note }: any) {
    const { id, name, surname, role, email, created } = note || {};
    return <>
        <Link href={`/workers/${id}`}>
            <div>
                <h2>{name} {surname}</h2>
                <h5>{role} - {email}</h5>
            </div>
        </Link>
    </>
}