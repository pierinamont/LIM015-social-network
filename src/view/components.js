import { viewLogin } from './login-view.js';
import { viewSignup } from './signup-view.js';
import { viewHeader } from './header-view.js';
import { getPublish, viewMainPage } from './mainPage-view.js';
import { viewProfile } from './view-profile.js';
import { viewNotFound } from './notFound-view.js';

const components = {
  login: viewLogin,
  signup: viewSignup,
  header: viewHeader,
  mainPage: viewMainPage,
  profile: viewProfile,
  notFound: viewNotFound,

};
const metodosPublicos = {
  mGetPublish: getPublish,
};
export { components, metodosPublicos };
