const Swal = require('sweetalert2');
const { appName } = require('../config/global.constant');

/**
 * Enumerations for AlertService types.
 */
const AlertType = {
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
};

/**
 * Alert service to display notifications.
 */
class AlertService {
  constructor() {}

  /**
   * Show a confirmation alert.
   *
   * @param {string} title - The message to display.
   * @param {string} [confirmButtonText='OK'] - The text of the confirm button.
   * @param {number} [type=AlertType.success] - The alert type.
   * @returns {Promise<any>} - A promise resolving to the SweetAlertResult.
   */
  showConfirmAlert({ title, confirmButtonText = 'OK', type = AlertType.success }) {
    return Swal.fire({
      title,
      confirmButtonColor: '#FF6600',
      confirmButtonText,
    });
  }

  /**
   * Show a deletion confirmation alert.
   * @returns {Promise<any>} - A promise resolving to the SweetAlertResult.
   */
  showConfirmDeletionAlert() {
    return this.showPromptAlert({
      title: 'Etes-vous sûre de vouloir supprimer?',
    });
  }

  /**
   * Show a notification alert.
   *
   * @param {Object} options - Options for the notification alert.
   * @param {string} [options.title=appName] - The title.
   * @param {string} [options.position='top-end'] - The position.
   * @param {string} [options.icon='success'] - The icon.
   * @param {string} [options.background='white'] - The background color.
   * @param {boolean} [options.showConfirmButton=false] - Whether to show the confirm button or not.
   * @param {number} [options.timer=3000] - The notification's duration.
   * @returns {Promise<any>} - A promise resolving to the SweetAlertResult.
   */
  showNotificationAlert({
    title = appName,
    position = 'top-end',
    icon = 'success',
    background = 'white',
    showConfirmButton = false,
    timer = 3000,
  }) {
    return Swal.fire({
      title,
      position,
      icon,
      background,
      showConfirmButton,
      timer,
    });
  }

  /**
   * Show an error notification alert.
   *
   * @param {string} title - The title.
   * @returns {Promise<any>} - A promise resolving to the SweetAlertResult.
   */
  showNotificationAlertError(title) {
    return Swal.fire({
      title,
      position: 'top-end',
      icon: 'error',
      background: 'white',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  /**
   * Show a success notification alert.
   *
   * @param {string} title - The title.
   * @returns {Promise<any>} - A promise resolving to the SweetAlertResult.
   */
  showNotificationAlertSuccess(title) {
    return Swal.fire({
      title,
      position: 'top-end',
      icon: 'success',
      background: 'white',
      showConfirmButton: false,
      timer: 3000,
    });
  }

  /**
   * Show a prompt alert.
   *
   * @param {Object} options - Options for the prompt alert.
   * @param {string} [options.title=appName] - The title.
   * @param {boolean} [options.showCancelButton=true] - Whether to show the cancel button or not.
   * @param {string} [options.cancelButtonColor='black'] - The cancel button color.
   * @param {string} [options.confirmButtonColor='#ff7900'] - The confirm button color.
   * @param {string} [options.confirmButtonText='Valider'] - The confirm button text.
   * @param {string} [options.cancelButtonText='Annuler'] - The cancel button text.
   * @returns {Promise<any>} - A promise resolving to the SweetAlertResult.
   */
  showPromptAlert({
    title = appName,
    showCancelButton = true,
    cancelButtonColor = 'black',
    confirmButtonColor = '#FF6600',
    confirmButtonText = 'Valider',
    cancelButtonText = 'Annuler',
  }) {
    return Swal.fire({
      title,
      showCancelButton,
      cancelButtonColor,
      confirmButtonColor,
      confirmButtonText,
      cancelButtonText,
    });
  }
}

module.exports = { AlertService, AlertType };
