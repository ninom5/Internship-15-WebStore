import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const CreateProductForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("aaaaaaaaaaa");
  };
  return (
    <div className="form-background">
      <h2>Create product form</h2>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outline-required" label="Title" required />
        <TextField id="outline-required" label="Price" required />
        <TextField
          id="outlined-select-currency"
          select
          label="Category"
          required
        />
        <TextField id="outline-required" label="Description" required />
        <TextField id="outline-required" label="Image" required />

        <button id="submit-button" type="submit">
          Submit
        </button>
      </Box>
    </div>
  );
};

export default CreateProductForm;

// title:'...',
//                     price:'...',
//                     category:'...',
//                     description:'...',
//                     image:'...'
