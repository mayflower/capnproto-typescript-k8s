import styled, { css } from "styled-components";
import FilteredPropsInputField from "./FilteredPropsInputField";

export const PageWrapper = styled.section`
  &,
  & * {
    box-sizing: border-box;
    display: block;
  }

  hr {
    display: block;
    border: none;
    border-top: 1px solid lightgrey;

    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  font-family: Brush Script MT;
  font-style: oblique;
  font-variant: small-caps
  font-size: 2rem;
  line-height: 1.5rem;
  max-width: 35em;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.5rem;
  padding: 1rem 0.75rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

export const CodeWrapper = styled.pre`
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.25rem;
  background-color: hsl(210, 4%, 96%);
  overflow: auto;
  padding: 0.75rem;
  margin: 0;
  border-radius: 4px;

  & strong {
    margin-top: 1.5rem;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export const Title = styled.h1`
  line-height: 1.25rem;
  margin-top: 0;
  padding: 60px;
  text-align: center;
  background: #1abc9c;
  color: white;
  font-size: 30px;

  &:hover {
    color: rgb(232, 243, 255);
  }
`;

export const Label = styled.label`
  margin-top: 1.5rem;
  width: 100%;
`;

export const Field = styled.input.attrs({ type: "checkbox-group" })`
align-items: center;
display: flex;
gap: 8px;
margin-bottom: 8px;
`;

export const Input = styled(FilteredPropsInputField)`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem 0.75rem;

  &:focus,
  &:active {
    box-shadow: rgb(210, 213, 217) 0px 0px 2px 1px,
      rgb(227, 230, 232) 0px 0px 0px 3px;
    border: 1px solid rgb(26, 33, 43);
    outline: none;
  }

  /* Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }

  ${({ valid }) =>
    valid &&
    css`
      border: 1px solid rgb(0, 156, 38);

      &:focus,
      &:active {
        border: 1px solid rgb(0, 156, 38);
        box-shadow: rgb(106, 237, 97) 0px 0px 2px 1px,
          rgb(177, 247, 160) 0px 0px 0px 3px;
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(0, 156, 38);
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border: 1px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
          rgb(251, 178, 174) 0px 0px 0px 3px;
        border: 1px solid rgb(191, 49, 12);
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(191, 49, 12);
      }
    `}
`;

export const StyledInlineErrorMessage = styled.div`
  background-color: rgb(255, 245, 245);
  color: rgb(120, 27, 0);
  display: block;

  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
  white-space: pre-line;
`;

export const Submit = styled.button`
  width: 100%;
  margin-top: 1.5rem;

  background-color: rgb(24, 81, 187);
  display: block;
  text-align: center;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 700;
  height: 3rem;
  white-space: nowrap;
  color: rgb(232, 243, 255) !important;
  padding: 0.5rem 1rem;

  &:active,
  &:focus,
  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: pointer;
    background-color: rgb(163, 168, 173);
    box-shadow: none;
    color: rgb(255, 255, 255) !important;

    &:hover,
    &:focus {
      cursor: not-allowed;
    }
  }
`;
