import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import {openModalForm,closeUploadForm} from './modal-handler';
import {setUploadFormSubmit} from './form-controller';
import {messagesHandler} from './notification-modal-handler';
import {getData} from './api';
import {renderPosts,registerFilterElementEvent} from './miniature-rendering';
import {fileUploadForm} from './upload-personal-photo';

openModalForm(document.querySelector('.img-upload__input'));
await getData(
  (posts) => {
    renderPosts(document.querySelector('.pictures'), posts);
    registerFilterElementEvent(posts);
  },
  () => messagesHandler('data-error')
);
fileUploadForm();
setUploadFormSubmit(closeUploadForm);
