import { ChangeEvent, FormEvent } from "react";
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
  handleDropdownChange: (eventKey: string | null) => void;
  selectedCategory: string | null;
};

function Search({
  inputText,
  handleInputChange,
  uniqueCategoriesList,
  handleDropdownChange,
  selectedCategory,
}: SearchProps) {
  return (
    <InputGroup className="justify-content-center mb-3">
      <DropdownButton
        variant="outline-secondary"
        title={selectedCategory}
        id="input-group-dropdown-1"
        onSelect={handleDropdownChange}
      >
        <Dropdown.Item eventKey="All">All</Dropdown.Item>
        {uniqueCategoriesList &&
          uniqueCategoriesList.map((category, i) => {
            return (
              <Dropdown.Item key={i} eventKey={category}>
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
