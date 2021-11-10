import React, {useEffect, useRef, useState} from 'react';
import {trapFocus} from '../../utils';

const MODAL_MESSAGE_CLASS_NAME = 'modal-authorization';
const KEY_ESCAPE_CODE = 27;

function ModalAuthorization({onModalAuthorizationStateSet}) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [typeInput, setTypeInput] = useState('password');
  const modalAuthorization = useRef(null);

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KEY_ESCAPE_CODE) {
      evt.preventDefault();
      onModalAuthorizationStateSet();
    }
  };

  const onOverlayModalClick = (evt) => {
    if (evt.target.className === MODAL_MESSAGE_CLASS_NAME) {
      onModalAuthorizationStateSet();
    }
  };

  useEffect(() => {
    trapFocus(modalAuthorization.current);
    document.addEventListener('keydown', onEscKeyDown);
    return () => document.removeEventListener('keydown', onEscKeyDown);
  });

  const handleButtonFormAuthorizationClick = (evt) => {
    evt.preventDefault();

    if (login && password) {
      localStorage.setItem(login, JSON.stringify({login: login, password: password}));
      onModalAuthorizationStateSet();
      setLogin('');
      setPassword('');
    }
  };

  const handleInputLoginChange = (evt) => {
    const storageLogin = localStorage.getItem(evt.target.value);
    if (!storageLogin) {
      setLogin(evt.target.value);
      return;
    }

    const userAuthorizationData = JSON.parse(storageLogin);

    setLogin(userAuthorizationData.login);
    setPassword(userAuthorizationData.password);
  };

  const handleInputPasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleButtonShowPasswordMouseDown = () => {
    setTypeInput('text');
  };

  const handleButtonShowPasswordMouseUp = () => {
    setTypeInput('password');
  };

  return (
    <div className="modal-authorization" onClick={onOverlayModalClick} ref={modalAuthorization}>
      <div className="modal-authorization__wrapper">
        <div className="modal-authorization__logo-wrapper">
          <img className="modal-authorization__logo" src={'img/logo-popup.svg'} width="150" height="27" alt="Лига Банк"/>
        </div>
        <form className="modal-authorization__form">
          <ul className="modal-authorization__list">
            <li className="modal-authorization__item">
              <span className="modal-authorization__input-tittle">Логин</span>
              <label className="modal-authorization__input-description" htmlFor="popup-login">
                <input className="modal-authorization__input" type="text" value={login} onChange={handleInputLoginChange} id="popup-login"/>
              </label>
            </li>
            <li className="modal-authorization__item">
              <span className="modal-authorization__input-tittle">Пароль</span>
              <div className="modal-authorization__input-wrapper">
                <label className="modal-authorization__input-description" htmlFor="popup-password">
                  <input className="modal-authorization__input" type={typeInput} value={password} onChange={handleInputPasswordChange} id="popup-password"/>
                </label>
                <button className="modal-authorization__icon-password-button" type="button" onMouseDown={handleButtonShowPasswordMouseDown} onMouseUp={handleButtonShowPasswordMouseUp}>
                  <span className="visually-hidden">Показать пароль</span>
                  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29878 12L6.33638 11.4893L7.13618 8.59185C5.93899 8.16352 4.82634 7.5393 3.84654 6.7463L1.65854 8.86987L0.220528 7.47486L2.40955 5.35228C1.17386 3.91662 0.343585 2.19431 0 0.353927L2 0C2.77134 4.14262 6.50711 7.28557 11 7.28557C15.4919 7.28557 19.2287 4.14262 20 0L22 0.352941C21.6569 2.19358 20.827 3.91624 19.5915 5.35228L21.7795 7.47486L20.3415 8.86987L18.1535 6.7463C17.1737 7.5393 16.061 8.16352 14.8638 8.59185L15.6636 11.4903L13.7012 12L12.9004 9.10155C11.6426 9.31063 10.3574 9.31063 9.0996 9.10155L8.29878 12Z" fill="#1F1E25"/>
                  </svg>
                </button>
              </div>
              <a className="modal-authorization__link" href="#">Забыли пароль?</a>
            </li>
          </ul>
          <button className="modal-authorization__form-button" type="submit" onClick={handleButtonFormAuthorizationClick}>Войти</button>
        </form>
        <button className="modal-authorization__modal-close-button" type="button" aria-label="Закрыть" onClick={onModalAuthorizationStateSet} tabIndex="0">
        </button>
        <a className="modal-authorization__link-duplicate" href="#">Забыли пароль?</a>
      </div>
    </div>
  );
}

export default ModalAuthorization;