import React from 'react';
import Button from '@mui/material/Button';

const MyComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Hello, Material-UI and TailwindCSS!</h1>
      <Button variant="contained" color="primary">
        Material-UI Button
      </Button>
    </div>
  );
};

export default MyComponent;
