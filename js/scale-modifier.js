import {ImageScale,NUMERAL_SYSTEM} from './scale-modifier-data';

const imageUploadPreviewContainerElement = document.querySelector('.img-upload__preview-container');
const imageScaleSmallerElement = imageUploadPreviewContainerElement.querySelector('.scale__control--smaller');
const imageScaleBiggerElement = imageUploadPreviewContainerElement.querySelector('.scale__control--bigger');
const imagePreviewElement = imageUploadPreviewContainerElement.querySelector('.img-upload__preview img');
const scaleValueElement = imageUploadPreviewContainerElement.querySelector('.scale__control--value');
let changingScaleValue = scaleValueElement.value;

const changeScaleValue = () => {
  const updatedScaleValue = changingScaleValue / ImageScale.MAX;
  imagePreviewElement.style.transform = `scale(${updatedScaleValue})`;
  scaleValueElement.setAttribute('value', `${changingScaleValue}%`);
};

const onImageZoomOut = () => {
  changingScaleValue = parseInt(changingScaleValue, NUMERAL_SYSTEM) - ImageScale.MIN;
  changingScaleValue = Math.max(changingScaleValue, ImageScale.MIN);
  changeScaleValue();
};

const onImageZoomIn = () => {
  changingScaleValue = parseInt(changingScaleValue, NUMERAL_SYSTEM) + ImageScale.MIN;
  changingScaleValue = Math.min(changingScaleValue, ImageScale.MAX);
  changeScaleValue();
};

const resetScaleValue = () => {
  changingScaleValue = ImageScale.MAX;
  changeScaleValue();
  scaleValueElement.setAttribute('value', `${ImageScale.MAX}%`);
};

const handleScaleListeners = () => {
  imageScaleSmallerElement.addEventListener('click', onImageZoomOut);
  imageScaleBiggerElement.addEventListener('click', onImageZoomIn);
};

const removeScaleListeners = () => {
  imageScaleSmallerElement.removeEventListener('click', onImageZoomOut);
  imageScaleBiggerElement.removeEventListener('click', onImageZoomIn);
};

export {handleScaleListeners,removeScaleListeners,resetScaleValue};
