import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { ResourceType } from '../types/constants';
import { createResourceToServer, deleteResourceToServer, getAllResourcesFromServer, updateResourceToServer } from '../services/apiService';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { create } from '@mui/material/styles/createTransitions';

const ResourceManagementPage = () => {
  const [resources, setResources] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    filePath: '',
    resourceType: '',
  });

  // Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch all resources from the server
  const getAllResources = () => {
    getAllResourcesFromServer().then((response) => {
      console.log('Resources: ', response);
      setResources(response.data.data);
    }).catch((error) => {
      console.error('Error fetching resources: ', error);
    });
  };

  useEffect(() => {
    // Fetch resources from the server
    getAllResources();
  }, []);


  const handleOpenDialog = (type, resource = null) => {
    setDialogType(type);
    setSelectedResource(resource);
    if (resource) {
      setFormValues({
        title: resource.title,
        description: resource.description,
        filePath: resource.filePath,
        resourceType: resource.resourceType,
      });
    } else {
      setFormValues({
        title: '',
        description: '',
        filePath: '',
        resourceType: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dialogType === 'create') {
      const newResource = { ...formValues, id: resources.length + 1 };

      createResourceToServer(formValues).then((res) => {
        console.log('Resource created: ', res);
        getAllResources();
        // setResources([...resources, res.data.data]);
      }).catch((error) => {
        console.error('Error creating resource: ', error);
        // setResources([...resources, newResource]);
      });
    } else if (dialogType === 'update') {
      updateResourceToServer(selectedResource.id, formValues).then((res) => {
        console.log('Resource updated: ', res);
        getAllResources();
        // setResources(resources.map((res) => (res.id === selectedResource.id ? res.data.data : res)));
      }).catch((error) => {
        console.error('Error updating resource: ', error);
        // setResources(resources.map((res) => (res.id === selectedResource.id ? { ...selectedResource, ...formValues } : res)));
      });
    }
    handleCloseDialog();
  };

  const handleDelete = () => {
    deleteResourceToServer(selectedResource.id).then((res) => {
      console.log('Resource deleted: ', res);
      getAllResources();
    }).catch((error) => {
      console.error('Error deleting resource: ', error);
    });
    // setResources(resources.filter((res) => res.id !== selectedResource.id));
    handleCloseDialog();
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Resource Management
      </Typography>
      <div style={{ with: '100%', display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
        <Button startIcon={<AddCircleOutlineOutlinedIcon />} variant="contained" color="primary" onClick={() => handleOpenDialog('create')} sx={{ mb: 2 }}>
          Create Resource
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>File Path</TableCell>
              <TableCell>Type</TableCell>
              <TableCell sx={{width: '30%'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.title}</TableCell>
                <TableCell>{resource.description}</TableCell>
                <TableCell>{resource.filePath}</TableCell>
                <TableCell>{ResourceType[resource.resourceType]}</TableCell>
                <TableCell>
                  <Button startIcon={<VisibilityOutlinedIcon />} variant="contained" color="primary" onClick={() => handleOpenDialog('view', resource)} sx={{ mr: 1 }}>
                    View
                  </Button>
                  <Button startIcon={<EditOutlinedIcon />} variant="contained" color="secondary" onClick={() => handleOpenDialog('update', resource)} sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button startIcon={<DeleteOutlinedIcon />} variant="contained" color="warning" onClick={() => handleOpenDialog('delete', resource)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={resources.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>


      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {dialogType === 'create' ? 'Create Resource' : dialogType === 'update' ? 'Update Resource' : dialogType === 'delete' ? 'Delete Resource' : 'Resource Details'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'view' ? (
            <>
              <DialogContentText> <span style={{fontWeight: 'bold'}}>Title: </span> {selectedResource?.title}</DialogContentText>
              <DialogContentText> <span style={{fontWeight: 'bold'}}>Description: </span>{selectedResource?.description}</DialogContentText>
              <DialogContentText> <span style={{fontWeight: 'bold'}}>File Path: </span>{selectedResource?.filePath}</DialogContentText>
              <DialogContentText> <span style={{fontWeight: 'bold'}}>Type: </span>{ResourceType[selectedResource?.resourceType]}</DialogContentText>
            </>
          ) : dialogType === 'delete' ? (
            <DialogContentText>Are you sure you want to delete the resource "{selectedResource?.title}"?</DialogContentText>
          ) : (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                value={formValues.title}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formValues.description}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="filePath"
                label="File Path"
                name="filePath"
                value={formValues.filePath}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                select
                label="Resource Type"
                name="resourceType"
                value={formValues.resourceType}
                onChange={handleChange}
              >
                {Object.keys(ResourceType).map((key) => (
                  <MenuItem key={key} value={key}>
                    {ResourceType[key]}
                  </MenuItem>
                ))}
              </TextField>
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                {dialogType === 'create' ? 'Create' : 'Update'}
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {dialogType === 'delete' ? (
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          ) : null}
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResourceManagementPage;
