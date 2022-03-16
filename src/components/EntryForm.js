import ScreenReaderOnly from './ScreenReaderOnly';
import styled from 'styled-components';

export default function EntryForm({ onSubmit }) {
  return (
    <Form onSubmit={handleSubmit} aria-labelledby="entry-form-heading">
      <label htmlFor="text">
        <ScreenReaderOnly>Entry Text</ScreenReaderOnly>
      </label>
      <input
        name="text"
        id="text"
        placeholder="just some text..."
        type="text"
      />
      <PlusButton id="entry-form-heading">
        <ScreenReaderOnly>Create new entry</ScreenReaderOnly>
        <div aria-hidden="true">+</div>
      </PlusButton>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputElement = form.elements.text;
    onSubmit(inputElement.value);
    form.reset();
  }
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  input {
    width: 100%;
    margin-right: 20px;
  }
`;

const PlusButton = styled.button`
  border-radius: 50%;
  line-height: 0;
  width: 28px;
  height: 28px;
  border: none;
`;
