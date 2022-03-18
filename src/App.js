// import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Entry from './components/Entry';
import EntryForm from './components/EntryForm';
import useSWR from 'swr';
import { useState } from 'react';
import NameForm from './components/NameForm';

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function App() {
  const [user, setUser] = useState('');
  const [active, setActive] = useState(false);
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
      <Grid>
        <h1>Lean Coffee Board</h1>
        {!active && <NameForm onSubmit={handleNewUser} />}
        {active && (
          <EntryList role="list">
            {entries
              ? entries.map(({ text, author, _id }) => (
                  <li key={_id}>
                    <Entry text={text} author={author} />
                  </li>
                ))
              : '...loading....'}
          </EntryList>
        )}
        {active && <EntryForm onSubmit={handleNewEntry} />}
      </Grid>
    </>
  );

  function handleNewUser(name) {
    setUser(name);
    setActive(!active);
  }

  async function handleNewEntry(text) {
    const newEntry = {
      text,
      author: user,
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 100px;
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const Grid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;
