import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, FormControlLabel, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { getProfilesByRolesService } from '../../Dashboard/user.service';

class FormProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      isChecked: {},
      data: [],
    };
  }

  componentDidMount() {
    console.log("---------::: CONSTRUCT :::---------", this.props.formData.roles);
    this.fetchProfilesData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formData.profils !== this.props.formData.profils) {
      this.updateCheckedProfiles();
    }
  }

  fetchProfilesData = async () => {
    try {
      const response = await getProfilesByRolesService(this.props.formData.roles);
      console.log("---------RESPONSE profils::: ---------", response);
      if (response && response.success) {
        const profils = response.data;
        const isChecked = this.initializeCheckedProfiles(profils);
        this.setState({ data: profils, isChecked });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  initializeCheckedProfiles = (profils) => {
    const isChecked = {};
    if (Array.isArray(this.props.formData.profils)) {
      this.props.formData.profils.forEach(role => {
        isChecked[role.id] = true;
      });
    }
    return isChecked;
  };

  updateCheckedProfiles = () => {
    const isChecked = this.initializeCheckedProfiles(this.state.data);
    this.setState({ isChecked });
  };

  handleChange = (itemId) => (event) => {
    console.log("-----------STATE FORM-PROFILE::: ", this.state);
    console.log("-----------EVENT FORM-PROFILE::: ", event);

    this.setState((prevState) => {
      const isChecked = { ...prevState.isChecked, [itemId]: event.target.checked };
      const checked = event.target.checked
        ? [...prevState.checked, { id: itemId }]
        : prevState.checked.filter((item) => item.id !== itemId);

      this.props.onProfilesChange(checked);  // Appel de la fonction de rappel pour mettre à jour le parent

      return { isChecked, checked };
    });
  };

  render() {
    const { data, isChecked } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography align='center' sx={{ backgroundColor: "#148C8A", color: "white" }}>
            Profils
          </Typography>
        </Grid>
        {data.map((item) => (
          <Grid item xs={6} key={item.id}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={!!isChecked[item.id]} onChange={this.handleChange(item.id)} />}
                label={item.name}
              />
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default FormProfiles;
