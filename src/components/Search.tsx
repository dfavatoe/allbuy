import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
} from "react-bootstrap";
import { ProductT } from "../types/type";

type SearchProps = {
  products: ProductT[];
};

function Search({ products }: SearchProps) {
  const [uniqueCategoriesList, setUniqueCategoriesList] = useState<
    string[] | null
  >(null);
  console.log("uniqueCategoriesList :>> ", uniqueCategoriesList);

  function getCategories() {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    console.log("uniqueCategories :>> ", uniqueCategories);
    setUniqueCategoriesList(uniqueCategories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <InputGroup className="mb-3">
      <DropdownButton
        variant="outline-secondary"
        title="Dropdown"
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
        placeholder="Recipient's username"
        aria-label="Recipient's username"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-addon2">
        Button
      </Button>
    </InputGroup>
  );
}

export default Search;
