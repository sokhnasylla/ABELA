import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { getRolesService } from '../../Dashboard/user.service';
import { getTokenDecode } from '../authUtils';

class FormRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isChecked: {},
      data: [],
      userToken: getTokenDecode()
    };
  }


  // console.log("-----------ACCESS-------- ", roleAdminAll, " --------- ", userToken.profils, userToken.profils.some(profil => roleAdminAll.includes(profil)));


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
        {/* <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}> */}
          {data.map((item) => (
            <Grid item xs={6} key={item.id}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox disabled={!this.state.userToken.roles.includes("SUPER_ADMIN") && !this.state.userToken.roles.includes(item.code)} checked={!!isChecked[item.id]} onChange={this.handleChange(item.id)} />}
                  label={item.name}
                />
              </FormGroup>
            </Grid>  
          ))}
        {/* </List> */}
      </Grid>
    );
  }
}

export default FormRoles;
