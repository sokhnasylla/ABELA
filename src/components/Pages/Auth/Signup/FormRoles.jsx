import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, FormControlLabel, FormGroup } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import { getRolesService } from '../../Dashboard/user.service';

class FormRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isChecked: {},
      data: [],
    };
  }

  componentDidMount() {
    this.fetchRolesData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formData.roles !== this.props.formData.roles) {
      this.updateCheckedRoles();
    }
  }

  fetchRolesData = async () => {
    try {
      const response = await getRolesService();
      if (response && response.success) {
        const roles = response.data;
        const isChecked = this.initializeCheckedRoles(roles);
        this.setState({ data: roles, isChecked });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  initializeCheckedRoles = (roles) => {
    const isChecked = {};
    if (Array.isArray(this.props.formData.roles)) {
      this.props.formData.roles.forEach(role => {
        isChecked[role.id] = true;
      });
    }
    return isChecked;
  };

  updateCheckedRoles = () => {
    const isChecked = this.initializeCheckedRoles(this.state.data);
    this.setState({ isChecked });
  };

  handleChange = (itemId) => (event) => {
    console.log("-----------STATE FORM-ROLE::: ", this.state);
    console.log("-----------EVENT FORM-ROLE::: ", event);

    this.setState((prevState) => {
      const isChecked = { ...prevState.isChecked, [itemId]: event.target.checked };
      const checked = event.target.checked
        ? [...prevState.checked, { id: itemId }]
        : prevState.checked.filter((item) => item.id !== itemId);

      this.props.onRolesChange(checked);  // Appel de la fonction de rappel pour mettre à jour le parent

      return { isChecked, checked };
    });
  };

  render() {
    const { data, isChecked } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid container direction="column" justifyContent="center" alignSelf="center" width="70">
          <Typography align='center' sx={{ backgroundColor: "#148C8A", color: "white", width: "104%" }}>
            Roles
          </Typography>
        </Grid>
        <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
          {data.map((item) => (
            <ListItem key={item.id} >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={!!isChecked[item.id]} onChange={this.handleChange(item.id)} />}
                  label={item.name}
                />
              </FormGroup>
            </ListItem>
          ))}
        </List>
      </Grid>
    );
  }
}

export default FormRoles;
