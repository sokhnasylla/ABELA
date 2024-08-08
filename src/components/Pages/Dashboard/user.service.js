import httpClient from "../../../config/interceptor.config";


const usermanagementUrl = 'abela-usermanagement/api/v1';

function getUsersService() {
    return httpClient.get(usermanagementUrl + '/users').then(response => response ? response.data : null);
}


function deleteUsersService(id) {
  return httpClient.delete(usermanagementUrl + '/users/' + id).then(response => response ? response.data : null);
}

function activerOrDesactiverUsersService(id) {
  return httpClient.post(usermanagementUrl + '/users/desactiver/' + id).then(response => response ? response.data : null);
}

function cloturerUsersService(id) {
  return httpClient.post(usermanagementUrl + '/users/cloturer/' + id).then(response => response ? response.data : null);
}


function editUsersService(id, data) {
  return httpClient.post(usermanagementUrl + '/users/' + id, data).then(response => response ? response.data : null);
}

function addUser(data) {
  return httpClient.post(usermanagementUrl + '/auth/register', data).then(response => response ? response.data : null);
}

function login(data) {
  return httpClient.post(usermanagementUrl + '/auth/authenticate', data).then(response => response ? response.data : null);
}


// ------------------ ROLE ----------------------

function getRolesService() {
  return httpClient.get(usermanagementUrl + '/users/roles').then(response => response ? response.data : null);
}


function deleteRolesService(id) {
return httpClient.delete(usermanagementUrl + '/users/roles/' + id).then(response => response ? response.data : null);
}

function editRolesService(id, data) {
return httpClient.post(usermanagementUrl + '/users/roles/' + id, data).then(response => response ? response.data : null);
}

function addRole(data) {
  return httpClient.post(usermanagementUrl + '/users/roles', data).then(response => response ? response.data : null);
}

// ------------------ PROFILES ----------------------

function getProfilesService() {
  return httpClient.get(usermanagementUrl + '/users/profils').then(response => response ? response.data : null);
}

function getProfilesByRolesService(roles) {
  return httpClient.post(usermanagementUrl + '/users/profils_by_roles', roles).then(response => response ? response.data : null);
}


function deleteProfilesService(id) {
return httpClient.delete(usermanagementUrl + '/users/profils/' + id).then(response => response ? response.data : null);
}

function editProfilesService(id, data) {
return httpClient.post(usermanagementUrl + '/users/profils/' + id, data).then(response => response ? response.data : null);
}

function addProfiles(data) {
  return httpClient.post(usermanagementUrl + '/users/profils', data).then(response => response ? response.data : null);
}






export {
  getUsersService, deleteUsersService, editUsersService, getRolesService, 
  deleteRolesService, editRolesService, addUser, addRole, login, activerOrDesactiverUsersService, 
  cloturerUsersService, getProfilesService, deleteProfilesService, editProfilesService,
  addProfiles, getProfilesByRolesService
}