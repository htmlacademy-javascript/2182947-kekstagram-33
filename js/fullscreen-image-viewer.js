import {similarPosts} from './generate-photo-data';
import {clearInnerElements, isEscapeKey} from './utils';

const renderBigPicture = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const bigPictureContainer = document.querySelector('.big-picture');
    const smallPicturesContainerList = document.querySelectorAll('.picture');
    const socialCommentsContainer = document.querySelector('.social__comments');
    const socialCommentElement = document.querySelector('.social__comment');
    const similarCommentFragment = document.createDocumentFragment();
    const bigPictureCloseElement = document.querySelector('#picture-cancel');
    const bigPictureBlock = bigPictureContainer.querySelector('.big-picture__img');
    const bigPictureImage = bigPictureBlock.querySelector('img');
    const likesCount = bigPictureContainer.querySelector('.likes-count');
    const totalComments = bigPictureContainer.querySelector('.social__comment-total-count');
    const photoDescription = bigPictureContainer.querySelector('.social__caption');
    const commentsCount = bigPictureContainer.querySelector('.social__comment-count');
    const commentsLoader = bigPictureContainer.querySelector('.comments-loader');

    const onBigPictureEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        bigPictureContainer.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    };

    const closeBigPicture = (pictureContainer, commentsContainer) => {
      pictureContainer.classList.add('hidden');
      clearInnerElements(commentsContainer);
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onBigPictureEscKeydown);
    };

    bigPictureCloseElement.addEventListener('click', () => {
      closeBigPicture(bigPictureContainer, socialCommentsContainer);
    });

    const renderPostComments = (idPicture) => {
      similarPosts.forEach(({comments}, id) => {
        if (idPicture === id) {
          comments.forEach((comment) => {
            const commentElement = socialCommentElement.cloneNode(true);
            commentElement.querySelector('.social__picture').src = comment.avatar;
            commentElement.querySelector('.social__text').alt = comment.name;
            commentElement.querySelector('.social__text').textContent = comment.message;
            similarCommentFragment.append(commentElement);
          });
        }
      });
    };

    const openBigPicture = (pictureContainer, commentsAmount, commentsLoaderButton) => {
      pictureContainer.classList.remove('hidden');
      commentsAmount.classList.add('hidden');
      commentsLoaderButton.classList.add('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', onBigPictureEscKeydown);
    };

    smallPicturesContainerList.forEach((smallPicture, idPicture) => {
      smallPicture.addEventListener('click', () => {
        openBigPicture(bigPictureContainer, commentsCount, commentsLoader, socialCommentsContainer);
        bigPictureImage.src = smallPicture.querySelector('.picture__img').src;
        likesCount.textContent = smallPicture.querySelector('.picture__likes').textContent;
        totalComments.textContent = smallPicture.querySelector('.picture__comments').textContent;
        photoDescription.textContent = smallPicture.querySelector('.picture__img').alt;
        clearInnerElements(socialCommentsContainer);
        renderPostComments(idPicture);
        socialCommentsContainer.append(similarCommentFragment);
      });
    });
  });
};

export {renderBigPicture};