import React, { Children } from 'react';
import Scrollbars from 'react-scrollbars-custom';

interface Props {
  styles: any;
  children: React.ReactNode | Array<React.ReactNode>;
}

const Scrollbar: React.FC<Props> = ({ styles, children }) => {
  return (
    <Scrollbars
      style={styles as any}
      trackYProps={{
        renderer: props => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className='trackY'
              style={{
                ...style,
                width: 5,
                backgroundColor: 'transparent',
                right: -3,
              }}
            />
          );
        },
      }}
      thumbYProps={{
        renderer: props => {
          const { elementRef, style, ...restProps } = props;
          console.log(props);
          return (
            <div
              {...restProps}
              ref={elementRef}
              className='thumbY'
              style={{ ...style, backgroundColor: `#f2182a` }}
            />
          );
        },
      }}>
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
