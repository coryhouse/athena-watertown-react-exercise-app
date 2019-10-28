import React  from 'react';
import PropTypes from 'prop-types';
import { forgeClassHelper } from '@athena/forge/utils/classes.js';
import Male from './svg/male.js';
import Female from './svg/female.js';
import Ungendered from './svg/ungendered.js';

const classes = (forgeClassHelper)({ name: 'patient-image-placeholder' });
const PatientImagePlaceholder = props => {

  const {
    gender,
    size,
    width,
    height,
    className,
    ...rest
  } = props;

  let Placeholder;
  switch (gender) {
    case 'male':
      Placeholder = Male;
      break;
    case 'female':
      Placeholder = Female;
      break;
    default:
      Placeholder = Ungendered;
      break;
  }

  let sizeWidth;
  let sizeHeight;

  if (width) {
    sizeWidth = width;
  }

  if (height) {
    sizeHeight = height;
  }

  if (size) {
    switch (size) {
      case 'small':
        sizeWidth = '35';
        sizeHeight = '40';
        break;
      case 'large':
        sizeWidth = '70';
        sizeHeight = '80';
        break;
      default:
      // medium 
        sizeWidth = '44';
        sizeHeight = '50';
    }
  }

  return (
    <Placeholder
      width={sizeWidth}
      height={sizeHeight}
      {...rest}
      {...classes({
        extra: className,
      })}
    />
  );
};

// popTypes comments are use to generate documentation and *must* be included
PatientImagePlaceholder.propTypes = {
  /** Gender svg to display */
  gender: PropTypes.oneOf([ 'male', 'female', 'ungendered' ]),
  /** Current existing sizes in athenaNet small(35px x 40px), medium(44px, 50px), large(70px x 80px).
      Overrides width and height if set. */
  size: PropTypes.oneOf([ 'small', 'medium', 'large' ]),
  /** Width of image. Image will maintain aspect ratio if this differs from corresponding height */
  width: PropTypes.number,
  /** Height of image. Image will maintain aspect ratio if this differs from corresponding width */
  height: PropTypes.number,
  /** Adds a class to the root element of the component */
  className: PropTypes.string,
};

PatientImagePlaceholder.defaultProps = {
  gender: 'ungendered',
};

export default PatientImagePlaceholder;
