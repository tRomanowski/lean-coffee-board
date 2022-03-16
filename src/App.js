// import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  // const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //   getEntries();

  //   async function getEntries() {
  //     const response = await fetch('/api/entries');
  //     const entries = await response.json();
  //     setEntries(entries);
  //   }
  // }, []);
  const {
    data: entries,
    error: errorEntries,
    mutate: mutateEntries,
  } = useSWR('/api/entries', fetcher);

  if (errorEntries) return <h1>Sorry, could not fetch.</h1>;
  console.log(entries);

  return (
    <>
      <h1>Lean Coffee Board</h1>
      <EntryList role="list">
        {entries
          ? entries.map(({ text, author, _id }) => (
              <li key={_id}>
                <Entry text={text} author={author} />
              </li>
            ))
          : '...loading....'}
      </EntryList>
      <EntryForm onSubmit={handleNewEntry} />
    </>
  );

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: 'Anonymous',
    };
    mutateEntries([...entries, newEntry], false);

    await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEntry),
    });

    mutateEntries();
  }
}

const EntryList = styled.ul`
  display: grid;
  gap: 20px;
  list-style: none;
  padding: 0;
`;
