import { ChangeEvent } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";

type SearchProps = {
  uniqueCategoriesList: string[] | null;
  inputText: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Search({
  inputText,
  handleInputChange,
  uniqueCategoriesList,
}: SearchProps) {
  return (
    <InputGroup className="mb-3">
      <DropdownButton
        variant="outline-secondary"
        title="Categories"
        id="input-group-dropdown-1"
      >
        {uniqueCategoriesList &&
          uniqueCategoriesList.map((category, i) => {
            return (
              <Dropdown.Item key={i} href="#">
                {category}
              </Dropdown.Item>
            );
          })}
      </DropdownButton>
      <Form.Control
        type="text"
        value={inputText}
        placeholder="Search product..."
        aria-label="Search product"
        aria-describedby="basic-addon2"
        onChange={handleInputChange}
      />
      <Button variant="outline-secondary" id="button-addon2">
        Search
      </Button>
    </InputGroup>
  );
}

export default Search;
