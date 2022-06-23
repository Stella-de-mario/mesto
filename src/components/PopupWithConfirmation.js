import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    // constructor(popupSelector) {
    //     super(popupSelector);
       
    // }

      setHandleSubmit(callback) {
        this._handleSubmit = callback;
      }
    
      setEventListeners() {
        super.setEventListeners();
        this._popupConfirmation = this._popup.querySelector('.popup__save-button_disabled');
        this._popupConfirmation.addEventListener('click', () => {
          this._handleSubmit(this._deletedCard); 
        }); 
    }
  }  
