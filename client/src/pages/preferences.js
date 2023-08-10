import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Preferences() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    city: "",
    state: "",
    areaType: "",
    lifeStyle: "",
    favoriteColors: [],
    favoriteStyles: [],
    accessories: [],
    patterns: [],
    bodyType: "",
    culturalInfluences: "",
    budgetRange: "",
    patternsPrints: "",
    accessories: "",
    festiveStyle: "",
    inspiration: "",
    additionalInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckBoxChange = (e) => {
    const { name, value } = e.target;
    let filtered = [];
    if (formData[name].includes(value)) {
      filtered = formData[name].filter((e) => e != value);
    } else {
      filtered = formData[name];
      filtered.push(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: filtered,
    }));
  };

  // const handleStyleChange = (e) => {
  //   const { name, value } = e.target;
  //   let filtered = [];
  //   if (formData.favoriteStyles.includes(value)) {
  //     filtered = formData.favoriteStyles.filter((style) => style != value);
  //   } else {
  //     filtered = formData.favoriteStyles;
  //     filtered.push(value);
  //   }
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     favoriteStyles: filtered,
  //   }));
  // };

  const availablePatterns = [
    "Stripes",
    "Checks",
    "Dots/Polka Dots",
    "Florals",
    "Geometric",
    "Animal Prints",
    "Abstract",
    "Paisley",
    "Tie-Dye",
    "Ikat",
    "Herringbone",
    "Camouflage",
    "Toile",
    "Abstract Art",
    "Patchwork",
  ];

  const availableColors = [
    "Blue",
    "Black",
    "Brown",
    "Red",
    "Green",
    "Purple",
    "Other",
  ];

  const availableStyles = [
    "Classic",
    "Casual",
    "Bohemion",
    "Minimalist",
    "Preppy",
    "Streetwear",
    "Retro",
    "Formal",
    "Sporty",
    "Mixed Style",
  ];

  const availableAccesories = ["belt", "wristwatch", "jwellery"];

  return (
    <Form className="form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Age</Form.Label>
        <Form.Control
          name="age"
          type="number"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your City</Form.Label>
        <Form.Control
          name="city"
          type="text"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your State</Form.Label>
        <Form.Control
          name="state"
          type="text"
          placeholder="Enter your state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Area Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="areaType"
          onChange={handleInputChange}
        >
          <option>select</option>
          <option value="rural">Rural</option>
          <option value="urban">Urban</option>
          {/* <option value="3">Three</option> */}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Body Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="areaType"
          onChange={handleInputChange}
        >
          <option>select</option>
          <option value="slim">Slim</option>
          <option value="fit">Fit</option>
          <option value="3"></option>
          {/* <option value="3">Three</option> */}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Gender</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="gender"
          onChange={handleInputChange}
        >
          <option>select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          {/* <option value="3">Three</option> */}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Favorite Colors</Form.Label>
        <div className="mb-3">
          {availableColors.map((color) => (
            <Form.Check
              inline
              label={color}
              value={color}
              name="favoriteColors"
              id={color}
              checked={formData.favoriteColors.includes(color)}
              onChange={handleCheckBoxChange}
            />
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Favorite Styles</Form.Label>
        <div className="mb-3">
          {availableStyles.map((style) => (
            <Form.Check
              inline
              label={style}
              value={style}
              name="favoriteStyles"
              id={style}
              checked={formData.favoriteStyles.includes(style)}
              onChange={handleCheckBoxChange}
            />
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Which accessories do you generally use?</Form.Label>
        <div className="mb-3">
          {availableAccesories.map((style) => (
            <Form.Check
              inline
              label={style}
              value={style}
              name="accessories"
              id={style}
              checked={formData.accessories.includes(style)}
              onChange={handleCheckBoxChange}
            />
          ))}
        </div>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Lifestyle</Form.Label>
        <Form.Select
          aria-label="Default select example"
          name="lifeStyle"
          onChange={handleInputChange}
        >
          <option>select</option>
          <option value="Corporate Professional">Corporate Professional
</option>
          <option value="Creative Artist"Creative Artist
></option>
          <option value="">Three</option>
        </Form.Select>
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Favorite Patterns</Form.Label>
        <div className="mb-3">
          {availablePatterns.map((color) => (
            <Form.Check
              inline
              label={color}
              value={color}
              name="patterns"
              id={color}
              checked={formData.patterns.includes(color)}
              onChange={handleCheckBoxChange}
            />
          ))}
        </div>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Preferences;
