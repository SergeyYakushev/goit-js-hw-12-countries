


 
import API from './js/fetchCountries.js';
import contryCardTmpl from "./templates/contry_card.hbs";
import {error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import './styles.css';


const debounce = require('lodash.debounce');

const refs = {
  searchForm: document.querySelector('.js-search-form'),
inputContriesField: document.querySelector('.form-control'),
contriesContainer:document.querySelector('.js-contr'),

};

refs.searchForm.addEventListener('input', debounce(onInput, 500));

function onInput (e){

 
  e.preventDefault();
  API.fetchCountry(refs.inputContriesField.value).then(contriesShow);
  
}

function contriesShow (countries){
 
  
  refs.contriesContainer.innerHTML = '';

  if (countries.status) {
    error('Error 404, try again');
    return;
     }

    if (countries.length >= 10) {
      error('Too many matches found. Please enter a more specific query!');
        
    }
    
  if (countries.length >= 1 && countries.length <= 10) {
      showCountriesList(countries);
          return;
      }

}

function showCountriesList(countries) {
  
  refs.contriesContainer.insertAdjacentHTML('beforeend', contryCardTmpl(countries));
}





