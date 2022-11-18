async function getNote(Id: string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/workers/records/${Id}`, {next: {revalidate: 10}});
    const data = await res.json();
    return data;
}

export default async function NotePage({params} : any) {
    const note = await getNote(params.id)
    return <div>
        <h1>WORKER // {note.id}</h1>
        <div>
            <h3>Name: {note.name} {note.surname}</h3>
            <h5>Role: {note.role}</h5>
            <h5>Role: {note.email}</h5>
            <p>Created: {note.created}</p>
        </div>
    </div>
}