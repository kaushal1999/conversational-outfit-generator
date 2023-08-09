import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Preferences() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    city:"",
    state:"",
    areaType:"",
    email: "",
    phone: "",
    favoriteColors: [],
    favoriteStyles: [],
    favoriteBrands: "",
    occasions: [],
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

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    let filtered = [];
    if (formData.favoriteColors.includes(value)) {
      filtered = formData.favoriteColors.filter((color) => color != value);
    } else {
      filtered = formData.favoriteColors;
      filtered.push(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      favoriteColors: filtered,
    }));
  };


  const handleStyleChange = (e) => {
    const { name, value } = e.target;
    let filtered = [];
    if (formData.favoriteStyles.includes(value)) {
      filtered = formData.favoriteStyles.filter((style) => style != value);
    } else {
      filtered = formData.favoriteStyles;
      filtered.push(value);
    }
    setFormData((prevData) => ({
      ...prevData,
      favoriteStyles: filtered,
    }));
  };




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
     "Mixed Style"

  ];

  return (
    <Form>
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
          <option value="1">Rural</option>
          <option value="2">Urban</option>
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
          <option value="1">Slim</option>
          <option value="2">Fit</option>
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
          <option value="1">Male</option>
          <option value="2">Female</option>
          {/* <option value="3">Three</option> */}
        </Form.Select>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Favorite Colors</Form.Label>
      {availableColors.map((color) => (
        <div key={color} className="mb-3">
          <Form.Check
            inline
            label={color}
            value={color}
            name="group1"
            id={color}
            checked={formData.favoriteColors.includes(color)}
            onChange={handleColorChange}
          />
        </div>
      ))}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Favorite Styles</Form.Label>
      {availableStyles.map((style) => (
        <div key={style} className="mb-3">
          <Form.Check
            inline
            label={style}
            value={style}
            name="group1"
            id={style}
            checked={formData.favoriteStyles.includes(style)}
            onChange={handleStyleChange}
          />
        </div>
      ))}
      </Form.Group>





      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Preferences;
