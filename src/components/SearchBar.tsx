import { ChangeEvent, useEffect, useState } from "react";
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

function SearchBar() {
  const [inputText, setInputText] = useState<string>("");

  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);

  const url = "https://dummyjson.com/products/";
  const categorySlug = "category-list";

  // Search Functions
  const getCategoriesList = async () => {
    const response = await fetch(url + categorySlug);
    console.log("response :>> ", response);
    const result = await response.json();
    console.log("result :>> ", result);
    const categoryArray = result as string[];

    setUniqueCategoriesList(categoryArray);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e :>> ", e.target.value);
    console.log("working");
    setInputText(e.target.value);
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

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

export default SearchBar;
