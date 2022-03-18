import styled from 'styled-components';

export default function NameForm({ onSubmit }) {
  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="name">Whats Your Name</label>
        <input id="name" name="name" type="text" required />
        <label htmlFor="color">Pick a color</label>
        <input id="color" name="color" type="color" />
        <button>Remember me</button>
      </StyledForm>
    </div>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputElementName = form.elements.name;
    const inputElementColor = form.elements.color;
    console.log(inputElementColor.value);
    onSubmit(inputElementName.value, inputElementColor.value);
  }
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  padding: 40px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;
